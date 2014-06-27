#define BUILDING_NODE_EXTENSION

#include "myobject.h"


#define RADIUS 300
#define N_WORDS 10
#define FONT "Alice 17"

using namespace v8;

Persistent<Function> MyObject::constructor;

MyObject::MyObject() {
}

MyObject::~MyObject() {
}

void MyObject::Init(Handle<Object> exports) {
  // Prepare constructor template
  Local<FunctionTemplate> tpl = FunctionTemplate::New(New);
  tpl->SetClassName(String::NewSymbol("MyObject"));
  tpl->InstanceTemplate()->SetInternalFieldCount(1);
  // Function Prototype
  tpl->PrototypeTemplate()->Set(String::NewSymbol("generate"),
      FunctionTemplate::New(Generate)->GetFunction());
  constructor = Persistent<Function>::New(tpl->GetFunction());
  exports->Set(String::NewSymbol("MyObject"), constructor);
}

Handle<Value> MyObject::New(const Arguments& args) {
  HandleScope scope;

  if (args.IsConstructCall()) {
    MyObject* obj = new MyObject();
    obj->Wrap(args.This());
    return args.This();
  } else {
    const int argc = 1;
    Local<Value> argv[argc] = { args[0] };
    return scope.Close(constructor->NewInstance(argc, argv));
  }
}
Handle<Value> MyObject::Generate(const Arguments& args) {
  HandleScope scope;
  MyObject* obj = ObjectWrap::Unwrap<MyObject>(args.This());

  cairo_t *cr;
  cairo_status_t status;
  cairo_surface_t *surface;
  //char *filename;
  //filename = "image.png";

  if(args.Length() != 1) {
    ThrowException(Exception::TypeError(String::New("Wrong number of arguments")));
    return scope.Close(Undefined());
  }
  if(!args[0]->IsString()){
    ThrowException(Exception::TypeError(String::New("Wrong arguments")));
    return scope.Close(Undefined());
  }
  std::string text(*(v8::String::Utf8Value (args[0])));

  surface = cairo_image_surface_create (CAIRO_FORMAT_ARGB32,
                                       2 * RADIUS, 2 * RADIUS);
  cr = cairo_create (surface);

  //cairo_set_source_rgb (cr, 1.0, 1.0, 1.0);
  //cairo_paint (cr);
  draw_text(cr, text);

  cairo_destroy (cr);

  std::vector<unsigned char> png_vector;
  status = cairo_surface_write_to_png_stream ( surface, png_to_vector, &png_vector);
  cairo_surface_destroy (surface);

  int size = png_vector.size();
  
  // Convert the vector into a buffer
  // http://www.samcday.com.au/blog/2011/03/03/creating-a-proper-buffer-in-a-node-c-addon/
  node::Buffer *slowBuffer = node::Buffer::New(size);
  memcpy(node::Buffer::Data(slowBuffer), &png_vector.front(), size);
  v8::Local<v8::Object> globalObj = v8::Context::GetCurrent()->Global();
  v8::Local<v8::Function> bufferConstructor = v8::Local<v8::Function>::Cast(globalObj->Get(v8::String::New("Buffer")));
  v8::Handle<v8::Value> constructorArgs[3] = { slowBuffer->handle_, v8::Integer::New(size), v8::Integer::New(0) };
  v8::Local<v8::Object> actualBuffer = bufferConstructor->NewInstance(3, constructorArgs);

  // This Buffer can now be provided to the calling JS code as easy as this:
  return scope.Close(actualBuffer);
}

cairo_status_t MyObject::png_to_vector(void *in_closure, const unsigned char* data, unsigned int length)
{
  std::vector<unsigned char>* closure = static_cast<std::vector<unsigned char>*>(in_closure);
  closure->insert(closure->end(), data, data + length);
  return CAIRO_STATUS_SUCCESS;
}

void MyObject::draw_text(cairo_t *cr, std::string text){
  PangoLayout *layout;
  PangoFontDescription *desc;
  cairo_translate (cr, RADIUS, RADIUS);

  layout = pango_cairo_create_layout (cr);

  //pango_layout_set_alignment(layout, PANGO_ALIGN_LEFT);
  //pango_layout_set_wrap(layout, PANGO_WRAP_CHAR);


  pango_layout_set_text (layout, text.c_str() , -1);
  desc = pango_font_description_from_string (FONT);
  pango_layout_set_font_description (layout, desc);
  pango_font_description_free (desc);

  int width, height;
  double red;

  cairo_save (cr);

  cairo_set_source_rgb (cr, red, 0, 1.0 - red);


  pango_cairo_update_layout (cr, layout);

  pango_layout_get_size (layout, &width, &height);
  cairo_move_to (cr, - ((double)width / PANGO_SCALE) / 2, - RADIUS);
  pango_cairo_show_layout (cr, layout);
  //pango_cairo_show_layout_line (cr, pango_layout_get_line (layout, 0));


  cairo_restore (cr);
  g_object_unref (layout);
}
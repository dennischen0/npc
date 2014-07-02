//#define BUILDING_NODE_EXTENSION

#include "myobject.h"


#define MAX_SIZE 800
#define FONT "Cookie"

using namespace v8;
using namespace std;

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

  cairo_t *cr;
  //cairo_status_t status;
  cairo_surface_t *surface;
  //char *filename;
  //filename = "image.png";

  if(args.Length() != 1) {
    ThrowException(Exception::TypeError(String::New("Wrong number of arguments")));
    return scope.Close(Undefined());
  }
  Handle<Object> obj = Handle<Object>::Cast(args[0]);


  surface = cairo_image_surface_create (CAIRO_FORMAT_ARGB32, MAX_SIZE, MAX_SIZE);
  cr = cairo_create (surface);

  cairo_set_source_rgb (cr, 0, 0, 0);
  cairo_paint (cr);
  draw_text(cr, obj);

  cairo_destroy (cr);

  std::vector<unsigned char> png_vector;
  //status = cairo_surface_write_to_png_stream ( surface, png_to_vector, &png_vector);
  cairo_surface_write_to_png_stream ( surface, png_to_vector, &png_vector);
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

void MyObject::draw_text(cairo_t *cr, Handle<Object> obj){
  PangoLayout *layout;
  PangoFontDescription *desc;
  //PangoContext * context;
  std::string text(*(v8::String::Utf8Value (obj->Get(String::New("message")))));
  std::string font(*(v8::String::Utf8Value (obj->Get(String::New("font")))));
  std::string font_color(*(v8::String::Utf8Value (obj->Get(String::New("font_color")))));
  int font_size = obj->Get(String::New("font_size"))->NumberValue();//40;//args[2]->NumberValue();
  int text_width = obj->Get(String::New("width"))->NumberValue();
  int text_height = obj->Get(String::New("height"))->NumberValue();
  int text_origin_x = obj->Get(String::New("origin_x"))->NumberValue();
  int text_origin_y = obj->Get(String::New("origin_y"))->NumberValue();

  double r;
  double g;
  double b;

  hex_string_to_rgb(font_color, r, g, b);

  int width, height;
  int cx, cy;
  int count = 0;

  //make pango layout and set info
  layout = pango_cairo_create_layout (cr);
  pango_layout_set_width(layout, text_width * PANGO_SCALE);
  pango_layout_set_height(layout, text_height * PANGO_SCALE);
  pango_layout_set_wrap(layout, PANGO_WRAP_WORD);
  pango_layout_set_text (layout, text.c_str() , -1);

  //dpi
  // context = pango_cairo_create_context(cr);
  // pango_cairo_context_set_resolution(context, 300);

  //make the white box
  cairo_set_source_rgb (cr, 1, 1, 1);
  cairo_rectangle(cr, text_origin_x, text_origin_y, text_width, text_height);
  cairo_fill (cr);

  //set font description to layout
  desc = pango_font_description_from_string (font.c_str());

  do{
    count++;
    pango_font_description_set_size(desc, font_size*PANGO_SCALE);
    pango_layout_set_font_description (layout, desc);

    pango_layout_get_pixel_size(layout, &cx, &cy);
    font_size -= 1;
  }while(cy > text_height || cx > text_width);
  //cout << count << endl;
  pango_font_description_free (desc);

  //set font color
  cairo_set_source_rgb (cr, .5, .5, .5);
  pango_cairo_update_layout (cr, layout);

  //print the text onto the cairo layer.
  cairo_move_to(cr, text_origin_x, text_origin_y);
  pango_layout_get_size (layout, &width, &height);
  pango_cairo_show_layout (cr, layout);

  g_object_unref (layout);
}

void MyObject::hex_string_to_rgb(std::string hex, double &r, double &g, double &b){

  std::stringstream ss("123456");
  int num;
  ss >> hex >> num;
  int ir = num / 0x10000;
  int ig = (num / 0x100) % 0x100;
  int ib = num % 0x100;

  cout << std::hex << ir << endl;
}
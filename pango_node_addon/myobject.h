#ifndef MYOBJECT_H
#define MYOBJECT_H

#include <string.h>
#include <vector>
#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <iostream>
#include <cstdio>
#include <ctime>
#include <pango/pangocairo.h>
#include <node.h>
#include <node_buffer.h>

class MyObject : public node::ObjectWrap {
public:
    static void Init(v8::Handle<v8::Object> exports);
    
private:
    explicit MyObject();
    ~MyObject();
    
    static v8::Handle<v8::Value> New(const v8::Arguments& args);
    static v8::Handle<v8::Value> Generate(const v8::Arguments& args);
    static void draw_text(cairo_t *cr, std::string text);
    static cairo_status_t png_to_vector(void *closure, const unsigned char* data, unsigned int length);
	static v8::Persistent<v8::Function> constructor;
};

#endif
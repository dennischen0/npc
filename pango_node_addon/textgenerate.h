#ifndef TEXTGENERATE_H
#define TEXTGENERATE_H

#include <iomanip>
#include <sstream>
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

class TextGenerate : public node::ObjectWrap {
public:
    static void Init(v8::Handle<v8::Object> exports);
    
private:
    explicit TextGenerate();
    ~TextGenerate();
    
    static v8::Handle<v8::Value> New(const v8::Arguments& args);
    static v8::Handle<v8::Value> Generate(const v8::Arguments& args);
    static void text_to_image(cairo_t *cr, v8::Handle<v8::Object> obj);
    static void draw_text(cairo_t *, std::string, std::string, std::string, int, int, int, int, int, std::string);
    static void hex_string_to_rgb(std::string, double&, double&, double&);
    static cairo_status_t png_to_vector(void *closure, const unsigned char* data, unsigned int length);
	static v8::Persistent<v8::Function> constructor;
};

#endif
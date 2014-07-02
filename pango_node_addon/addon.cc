//#define BUILDING_NODE_EXTENSION
#include <node.h>
#include "textgenerate.h"

using namespace v8;

void InitAll(Handle<Object> exports) {
  TextGenerate::Init(exports);
}

NODE_MODULE(addon, InitAll)
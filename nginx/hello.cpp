#include "fcgi_stdio.h"
#include <stdio.h>
#include <stdlib.h>

int main( int argc, char *argv[] )
{
  while( FCGI_Accept() >= 0 )
  {
    printf("Content-type: text/html; charset=UTF-8\n");
    printf("Status: 200 OK\n");
    printf("\n");
    printf("<br>Hello world in C");

    printf("<br>HTTP_HOST: %s\n", getenv("HTTP_HOST"));
    printf("<br>HTTP_CONNECTION: %s\n", getenv("HTTP_CONNECTION"));
    //printf("<br>HTTP_CACHE_CONTROL: %s\n", getenv("HTTP_CACHE_CONTROL"));
    printf("<br>HTTP_ACCEPT: %s\n", getenv("HTTP_ACCEPT"));
    printf("<br>HTTP_USER_AGENT: %s\n", getenv("HTTP_USER_AGENT"));
    printf("<br>HTTP_ACCEPT_ENCODING: %s\n", getenv("HTTP_ACCEPT_ENCODING"));
    printf("<br>HTTP_ACCEPT_LANGUAGE: %s\n", getenv("HTTP_ACCEPT_LANGUAGE"));
    //printf("<br>PATH: %s\n", getenv("PATH"));
    //printf("<br>SystemRoot: %s\n", getenv("SystemRoot"));
    //printf("<br>COMSPEC: %s\n", getenv("COMSPEC"));
    //printf("<br>PATHEXT: %s\n", getenv("PATHEXT"));
    //printf("<br>WINDIR: %s\n", getenv("WINDIR"));
    //printf("<br>SERVER_SIGNATURE: %s\n", getenv("SERVER_SIGNATURE"));
    //printf("<br>SERVER_SOFTWARE: %s\n", getenv("SERVER_SOFTWARE"));
    printf("<br>SERVER_NAME: %s\n", getenv("SERVER_NAME"));
    printf("<br>SERVER_ADDR: %s\n", getenv("SERVER_ADDR"));
    printf("<br>SERVER_PORT: %s\n", getenv("SERVER_PORT"));
    printf("<br>REMOTE_ADDR: %s\n", getenv("REMOTE_ADDR"));
    printf("<br>DOCUMENT_ROOT: %s\n", getenv("DOCUMENT_ROOT"));
    //printf("<br>SERVER_ADMIN: %s\n", getenv("SERVER_ADMIN"));
    //printf("<br>SCRIPT_FILENAME: %s\n", getenv("SCRIPT_FILENAME"));
    printf("<br>REMOTE_PORT: %s\n", getenv("REMOTE_PORT"));
    printf("<br>GATEWAY_INTERFACE: %s\n", getenv("GATEWAY_INTERFACE"));
    printf("<br>SERVER_PROTOCOL: %s\n", getenv("SERVER_PROTOCOL"));
    printf("<br>REQUEST_METHOD: %s\n", getenv("REQUEST_METHOD"));
    printf("<br>QUERY_STRING: %s\n", getenv("QUERY_STRING"));
    printf("<br>REQUEST_URI: %s\n", getenv("REQUEST_URI"));
    printf("<br>SCRIPT_NAME: %s\n", getenv("SCRIPT_NAME"));
    //printf("<br>REQUEST_TIME_FLOAT: %s\n", getenv("REQUEST_TIME_FLOAT"));
    //printf("<br>REQUEST_TIME: %s\n", getenv("REQUEST_TIME"));
  }

  return 0;
}
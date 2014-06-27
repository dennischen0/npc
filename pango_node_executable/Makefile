CC=g++

CFLAGS=-c -Wall

SOURCES = main.cpp 
OBJECTS = $(SOURCES:.cpp=.o)
EXECUTABLE = main
IMAGE = image.png
TEXT = "This is a test string"

CFLAGS += `pkg-config --cflags gtkmm-3.0 pango cairo`
LDFLAGS += `pkg-config --libs gtkmm-3.0 pango cairo`

all: $(EXECUTABLE)
	./$< $(IMAGE) $(TEXT)

$(EXECUTABLE): $(OBJECTS) 
	$(CC) $(OBJECTS) -o $@ $(LDFLAGS)

$(OBJECTS): $(SOURCES)
	$(CC) $(CFLAGS) $< -o $@

clean:
	rm $(OBJECTS) $(EXECUTABLE) $(IMAGE)

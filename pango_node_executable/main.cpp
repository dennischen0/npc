#include <math.h>
#include <pango/pangocairo.h>
#include <iostream>
#include <cstdio>
#include <ctime>

#define RADIUS 300
#define N_WORDS 10
#define FONT "Alice 107"

static void draw_text(cairo_t *cr, std::string text){
  PangoLayout *layout;
  PangoFontDescription *desc;
  int font_size = 17;
  int width, height;
  int cx, cy;
  int count = 0;

  //make pango layout and set info
  layout = pango_cairo_create_layout (cr);
  pango_layout_set_width(layout, 400 * PANGO_SCALE);
  pango_layout_set_height(layout, 50 * PANGO_SCALE);
  pango_layout_set_wrap(layout, PANGO_WRAP_WORD);
  pango_layout_set_text (layout, text.c_str() , -1);

  //make the white box
  cairo_set_source_rgb (cr, 1, 1, 1);
  cairo_rectangle(cr, 182, 577, 400, 50);
  cairo_fill (cr);

  //set font description to layout
  desc = pango_font_description_from_string (FONT);

  //do{
    count++;
    pango_font_description_set_size(desc, font_size*PANGO_SCALE);
    pango_layout_set_font_description (layout, desc);

    pango_layout_get_pixel_size(layout, &cx, &cy);
    font_size -= 1;
  //}while(cy > 50);
  //cout << count << endl;
  pango_font_description_free (desc);

  //set font color
  cairo_set_source_rgb (cr, .5, .5, .5);
  pango_cairo_update_layout (cr, layout);

  //print the text onto the cairo layer.
  cairo_move_to(cr, 182, 577);
  pango_layout_get_size (layout, &width, &height);
  pango_cairo_show_layout (cr, layout);

  g_object_unref (layout);
}

int main (int argc, char **argv)
{
  cairo_t *cr;
  char *filename;
  cairo_status_t status;
  cairo_surface_t *surface;
  std::clock_t start;
  double duration;
  std::string text = argv[2];

  if (argc != 3)
    {
      g_printerr ("Usage: cairosimple OUTPUT_FILENAME \"text string\" \n");
      return 1;
    }

     filename = argv[1];
  //start timer
  start = std::clock();

  surface = cairo_image_surface_create (CAIRO_FORMAT_ARGB32,
                                        2 * RADIUS, 2 * RADIUS);
  cr = cairo_create (surface);

  cairo_set_source_rgb (cr, 1.0, 1.0, 1.0);
  cairo_paint (cr);
  draw_text (cr, text);

  cairo_destroy (cr);

  status = cairo_surface_write_to_png (surface, filename);
  cairo_surface_destroy (surface);

  //end timer
  duration = (std::clock() - start) / (double) CLOCKS_PER_SEC;
  std::cout << "duration: " << duration << '\n';

  if (status != CAIRO_STATUS_SUCCESS)
    {
      g_printerr ("Could not save png to '%s'\n", filename);
      return 1;
    }

  return 0;
}

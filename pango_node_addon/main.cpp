#include <math.h>
#include <pango/pangocairo.h>
#include <iostream>
#include <cstdio>
#include <ctime>

static void
draw_text (cairo_t *cr, std::string text)
{
#define RADIUS 300
#define N_WORDS 10
#define FONT "Alice 27"

  PangoLayout *layout;
  PangoFontDescription *desc;
  //int i;

  /* Center coordinates on the middle of the region we are drawing
   */
  cairo_translate (cr, RADIUS, RADIUS);

  /* Create a PangoLayout, set the font and text */
  layout = pango_cairo_create_layout (cr);

  pango_layout_set_text (layout, text.c_str(), -1);
  desc = pango_font_description_from_string (FONT);
  pango_layout_set_font_description (layout, desc);
  pango_font_description_free (desc);

  /* Draw the layout N_WORDS times in a circle */
 // for (i = 0; i < N_WORDS; i++)
    {
      int width, height;
      //double angle = (360. * i) / N_WORDS;
      double angle = 0;
      double red;

      cairo_save (cr);

      /* Gradient from red at angle == 60 to blue at angle == 240 */
      red   = (1 + cos ((angle - 60) * G_PI / 180.)) / 2;
      cairo_set_source_rgb (cr, red, 0, 1.0 - red);

      cairo_rotate (cr, angle * G_PI / 180.);

      /* Inform Pango to re-layout the text with the new transformation */
      pango_cairo_update_layout (cr, layout);

      pango_layout_get_size (layout, &width, &height);
      cairo_move_to (cr, - ((double)width / PANGO_SCALE) / 2, - RADIUS);
      pango_cairo_show_layout (cr, layout);

      cairo_restore (cr);
    }

  /* free the layout object */
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

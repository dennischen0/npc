npc
===

Pango Node Addon
----------------
You need to install the following.

1. Ubuntu:
	- libpangomm
	- libcairomm
	- add to .profile

			export PKG_CONFIG_PATH=/usr/lib/pkgconfig:/usr/lib/x86_64-linux-gnu/pkgconfig

	- add fonts to

			/usr/share/fonts

2. OSX:
	- brew
	- cairo
	- pango
	- possibly gtkmm3
	- add to .profile

			export PKG_CONFIG_PATH=/usr/local/Cellar/cairo/1.12.16/lib/pkgconfig:/usr/local/cellar/pango/1.36.3/lib/pkgconfig:/usr/X11/lib/pkgconfig:/usr/local/Cellar/gtkmm3/3.12.0/lib/pkgconfig/

	- add fonts to

			~/Library/Fonts
			
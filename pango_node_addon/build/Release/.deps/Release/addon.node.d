cmd_Release/addon.node := ./gyp-mac-tool flock ./Release/linker.lock c++ -bundle -Wl,-search_paths_first -mmacosx-version-min=10.5 -arch x86_64 -L./Release  -o Release/addon.node Release/obj.target/addon/addon.o Release/obj.target/addon/myobject.o -undefined dynamic_lookup -L/usr/local/Cellar/cairo/1.12.16/lib -lcairo -L/usr/local/Cellar/pango/1.36.3/lib -L/usr/local/Cellar/glib/2.40.0/lib -L/usr/local/opt/gettext/lib -lpango-1.0 -lgobject-2.0 -lglib-2.0 -lintl -lpangocairo-1.0

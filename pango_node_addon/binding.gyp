{
  "targets": [
    {
      "target_name": "addon",
      "sources": [ "addon.cc", "textgenerate.cc" ],
      # 'ldflags': [
      # 	'<!@(pkg-config --libs gtkmm-3.0 pango cairo)'
      # ],
      'include_dirs': [ 
      	'<!@(pkg-config pangocairo --cflags-only-I | sed s/-I//g)',
      	'<!@(pkg-config cairo --cflags-only-I | sed s/-I//g)',
      	'<!@(pkg-config pango --cflags-only-I | sed s/-I//g)',
      ],
      'libraries': [
        '<!@(pkg-config cairo --libs)',
        '<!@(pkg-config pango --libs)',
      	'<!@(pkg-config pangocairo --libs)'
      ]
    }
  ]
}
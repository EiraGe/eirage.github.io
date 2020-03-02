#!/bin/sh

find . -name '*.html' | grep -v "bug" | \
  perl -e 'print "<html>\n<link rel=\"icon\" href=\"./images/icon-192x192.png\">\n<link rel=\"manifest\" href=\"/manifest.json\">\n";
           print "<body><ul>\n"; while(<>) { chop $_; print "<li><a href=\"./$_\">$_</a></li>\n";} print "<li><a href=\"./bug/index.html\">BUG</a></li>\n"; print "</ul></body>\n<script src=\"index.js\"></script>\n</html>"' > index.html

find ./bug/ -name '*.html' | grep -v "index" | \
  perl -e 'print "<html><body><ul>\n"; while(<>) { $name = substr($_, 6, -6); print "<li><a href=\"./$name.html\">$name</a> <a href=\"https://crbug.com/$name\">(crbug)</a></li>\n";} print "</ul></body></html>"' > bug/index.html

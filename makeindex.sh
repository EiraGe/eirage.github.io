#!/bin/sh

find . -name '*.html' | grep -v "bug" | \
  perl -e 'print "<html>\n<body><ul>\n"; while(<>) { chop $_; print "<li><a href=\"./$_\">$_</a></li>\n";} print "<li><a href=\"./bug/index.html\">BUG</a></li>\n"; print "</ul></body>\n</html>"' > index.html


find ./PWA/ -name '*.html' | \
  perl -e 'print "<html><body><ul>\n"; while(<>) { $name = substr($_, 7, -1); print "<li><a href=\"https\://pwa.eirage.com/$name\">$name</a></li>\n"; } print "</ul></body></html>"' > PWA/index.html


find ./bug/ -name '*.html' | grep -v "index" | \
  perl -e 'print "<html><body><ul>\n"; while(<>) { $name = substr($_, 7, -6); print "<li><a href=\"./$name.html\">$name</a> <a href=\"https://crbug.com/$name\">(crbug)</a></li>\n";} print "</ul></body></html>"' > bug/index.html

#!/bin/sh

find . -name '*.html' | grep -v "bug" | grep -v "index" | \
  perl -e 'print "<html><body><ul>\n"; while(<>) { chop $_; print "<li><a href=\"./$_\">$_</a></li>\n";} print "</ul></body></html>"' > index.html

find ./bug/ -name '*.html' | grep -v "index" | \
  perl -e 'print "<html><body><ul>\n"; while(<>) { $name = substr($_, 6, -6); print "<li><a href=\"./$name.html\">$name</a> <a href=\"https://crbug.com/$name\">(crbug)</a></li>\n";} print "</ul></body></html>"' > bug/index.html

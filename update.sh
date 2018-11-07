#!/bin/bash

./makeindex.sh
git add .
git commit -am "update"
git push

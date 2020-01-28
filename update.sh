#!/bin/bash

./makeindex.sh
git add .
read -p "Commit message [update]:" message
message = ${message: -Update}
git commit -am $message
git push

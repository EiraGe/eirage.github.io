#!/bin/bash

./makeindex.sh
git add .
read -p "Commit message [Update]:" message
message=${message:-Update}
echo $message
git commit -am "$message"
git push

cd PWA
git add .
message=${message:-Update}
git commit -am "$message"
git push

#!/bin/bash

./makeindex.sh
read -p "Commit message [Update]:" message
message=${message:-Update}
echo $message

cd script
git add .
git commit -am "$message"
git push
cd ..

cd PWA
git add .
git commit -am "$message"
git push
cd ..

git add .
git commit -am "$message"
git push

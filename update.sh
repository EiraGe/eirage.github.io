#!/bin/bash

./makeindex.sh
read -p "Commit message [Update]:" message
message=${message:-Update}
echo $message

git add .
git commit -am "$message"
git push

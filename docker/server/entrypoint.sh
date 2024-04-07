#!/bin/sh

npm install

if [ $? -eq 0 ]
then
  echo "=== Building NPM - OK ==="
else
  echo "=== Install packages error ==="
  npm audit fix --force
fi

npm run serve
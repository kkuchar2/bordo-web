#!/bin/bash

rm -rf build

reset && npm run build

cd build

http-server --gzip

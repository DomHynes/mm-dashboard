#!/bin/bash
PWD=`pwd`

docker run -p 1337:9090 -v $PWD:/usr/src/app/bundles/mm-dashboard nodecg/nodecg:v0.9.9

#!/bin/bash
echo Starting project

# clean previous deployment
rm -rf deployment/

# build api
cd api/ && npm i && npm run build

# build client
cd client/ && npm i && npm run build

# composing app
mkdir deployment
cp -R api/dist deployment/
mkdir deployment/public
cp -R client/dist deployment/public/
cp app.yaml deployment/
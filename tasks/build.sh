#!/bin/bash
echo Starting project

cd client
npm run build
cd ../
cp client/dist api/dist/client
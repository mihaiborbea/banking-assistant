#!/bin/bash
echo Starting project

docker-compose up -d --build --force-recreate; docker-compose logs -f

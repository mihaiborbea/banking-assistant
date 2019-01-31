#!/bin/bash

#  deploy api
y | gcloud app deploy api/app.yaml
y | gcloud app deploy cliend/app.yaml
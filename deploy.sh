#! /bin/bash
npm run build
cp app.yaml build/
gcloud app deploy --quiet build
#!/bin/bash

swiftservergenerator --app --spec '{ "appType": "crud", "appName":"test"}'

if ["$?" == "1"];then
  exit 1
fi

rm -rf swiftserver

swiftservergenerator --app --spec '{ "appType": "crud", "appName":"test"}'

if ["$?" == "1"];then
  exit 1
fi

rm -rf swiftserver

echo "Testing Suceeded"

#!/bin/bash

TESTDIR="$TMPDIR/swiftservergenerator-test"

echo "Cleaning any prior test directory $TESTDIR"
rm -rf "$TESTDIR"

echo "Creating test directory $TESTDIR"
mkdir -p "$TESTDIR"
export PATH=$TESTDIR/bin:$PATH

echo "Installing swiftservergenerator"
echo "- Creating package"
npm pack
export PKG=`ls swiftservergenerator-*.tgz | tail -1`
echo "- Installing package ($PKG) to test directory as global module"
npm install -g --prefix="$TESTDIR" "$PKG"
if [ "$?" != "0" ];then
  echo "Failed to install"
  rm -rf "$TESTDIR"
  exit 1
fi
echo "Installation complete"

cd "$TESTDIR"

echo "Testing generation of default crud app"
swiftservergenerator --app --spec '{ "appType": "crud", "appName":"test"}'
if [ "$?" != "0" ];then
  echo "Failed"
  rm -rf "$TESTDIR"
  exit 1
fi
echo "Cleaning up generated project"
rm -rf swiftserver

echo "Testing generation of default scaffold app"
swiftservergenerator --app --spec '{ "appType": "scaffold", "appName":"test"}'
if [ "$?" != "0" ];then
  echo "Failed"
  rm -rf "$TESTDIR"
  exit 1
fi
echo "Cleaning up generated project"
rm -rf swiftserver

echo "Cleaning up test directory"
rm -rf $TESTDIR

echo "Testing Suceeded"

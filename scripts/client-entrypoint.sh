#!/bin/sh

SCRIPT_NAME=$(readlink -f "$0")
SCRIPT_DIR=$(dirname "$SCRIPT")
UNAME=`uname`

warn () {
    echo "${SCRIPT_NAME:-}: $*"
}

die () {
    echo "${SCRIPT_NAME:-} ERROR $1"
    exit 1
}

# Starts create-react-app
cd ./client && npm start || die "Cannot start create-react-app"
#!/usr/bin/env bash

SCRIPT_NAME=${BASH_SOURCE[0]##*/}
SCRIPT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
UNAME=`uname`
set -u

warn () {
    echo "${SCRIPT_NAME:-}: $*"
}

die () {
    echo "${SCRIPT_NAME:-} ERROR $1"
    exit 1
}

rm -r ./postgres-data
rm -r ./client/node_modules
rm -r ./node_modules
docker rmi postgres
docker rmi node
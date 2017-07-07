#!/usr/bin/env bash
# Docker image cleanup script


SCRIPT_NAME=${BASH_SOURCE[0]##*/}
SCRIPT_DIR=$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )
UNAME=`uname`
set -u


function warn() {
    echo "${SCRIPT_NAME:-}: $*"
}

function die() {
    echo "${SCRIPT_NAME:-} ERROR $1"
    exit 1
}

EXITED=$(docker ps --all -q -f status=exited)
if [ ! -z "${EXITED}" ] ; then
    docker rm ${EXITED} || warn "docker rm failed!"
else
    echo "No exited containers to remove."
fi

UNREF=$(docker images | grep "^<none>" | awk "{print \$3}")
if [ ! -z "${UNREF}" ] ; then
    docker rmi ${UNREF} || warn "docker rmi failed!"
else
    echo "No unreferenced images to remove."
fi
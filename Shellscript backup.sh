#!/usr/bin/env bash

# Sourcepfad bitte hier einfügen; OHNE Anführungszeichen!!
SOURCE=~/Desktop/test1
# Pfad Zielverzeichnis bitte hier einfügen; OHNE Anführungszeichen!!
DEST=~/Desktop/test2

rm $DEST/*

cp $SOURCE/* $DEST/
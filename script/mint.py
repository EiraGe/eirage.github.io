#!/usr/bin/env python

# Lint as: python3

import os
import json

from absl import app

def mint(proto_file):
  cmd = 'stubby call localhost:8087 WebApkService.CreateOrUpdate < %s  > temp' % proto_file
  print ">> Executing " + cmd
  os.system(cmd)

  with open("temp", "r") as fin:
    for line in fin.readlines():
      print line
      if "download_url" in line:
        url = line.split("\"")[1]
  os.system("rm temp")

  if url:
    return url;
  else:
    raise app.UsageError('Mint FAILED')


def download(url, apk_file):
  cmd = "wget -O %s %s" % (apk_file, url)
  print ">> Executing " + cmd
  os.system(cmd);


def install(apk_file):
  if not apk_file:
    apk_file = twitter.proto.apk
  cmd = "adb install -r -d %s" % apk_file
  print ">> Executing " + cmd
  os.system(cmd);

def printphoto(fin, fout):
    cmd = "eg printproto %s %s" % (fin, fout)
    print ">> Executing " + cmd
    os.system(cmd);

def getNames(filename):
  filenames = filename.split('.')
  if filenames[-1] == "proto" or filenames[-1] == "req":
    rawName = ('.').join(filenames[:-1])
  else:
    rawName = filename;

  with open(filename) as f:
    if not "web_apk" in f.readline():
      printphoto(filename, rawName+ ".proto")

  return rawName + '.proto', rawName + '.apk'

def main(argv):
  proto_file = "$HOME/WebAPK/twitter.proto"
  if len(argv) > 1:
    filename = argv[1]

  [proto_file, apk_file] = getNames(filename);

  if len(argv) > 2:
    apk_file = argv[2];

  url = mint(proto_file);
  download(url, apk_file);
  install(apk_file);


if __name__ == '__main__':
  app.run(main)

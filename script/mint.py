#!/usr/bin/env python

# Lint as: python3

import os

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


def main(argv):
  proto_file = "$HOME/WebAPK/twitter.proto"
  if len(argv) > 1:
    proto_file = argv[1];

  apk_file = proto_file + ".apk";
  if len(argv) > 2:
    apk_file = argv[2];

  url = mint(proto_file);
  download(url, apk_file);
  install(apk_file);


if __name__ == '__main__':
  app.run(main)

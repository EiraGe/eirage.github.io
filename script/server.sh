#!/bin/bash
blaze run //googleclient/chrome/webapk:webapk_server -- -alsologtostderr -bigtable=/bigtable/srv-iy/chrome-webapk.webapks-test -minimum_shell_update_version=5 -enable_adaptive_icon_no_dpi=true -enable_enterprise -enable_enterprise_stubby_api


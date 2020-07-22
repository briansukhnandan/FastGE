#!/bin/bash

# Continuously runs update_ge_prices.js which refreshes db with
# updated prices/changes.

while :
do
    timeout 90s node update_ge_prices.js
    sleep 1
done

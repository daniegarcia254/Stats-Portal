#!/bin/bash

output="$(egrep -o 'https:\/\/.*\/production' < $1)"

output_escaped="$(echo "$output" | perl -pe 's/\//\\\//g')"

sed -i "s/API_GATEWAY_URL/$output_escaped/g" app/config/Runtime.js

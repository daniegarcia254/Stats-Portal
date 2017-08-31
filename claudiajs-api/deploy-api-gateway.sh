#!/bin/bash

if [ ! -f /usr/src/app/back/claudia.json ]; then
	npm run deploy
fi

npm run update
npm run release > api-url.json

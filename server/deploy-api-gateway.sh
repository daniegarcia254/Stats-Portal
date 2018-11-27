#!/bin/bash

if [ ! -f claudia.json ]; then
	npm run deploy
fi

npm run update
npm run release
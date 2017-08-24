web: .meteor/heroku_build/bin/node $NODEJS_PARAMS .meteor/heroku_build/app/main.js
worker: DEBUG=* xvfb-run --auto-servernum --server-args="-screen 0 1024x768x24" node --harmony .meteor/heroku_build/app/main.js

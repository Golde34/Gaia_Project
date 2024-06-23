#!/bin/bash

# create a lock file
touch /tmp/gaia_connector_lock

cd ../gaia_connector

python app_router.py

# remove the lock file when done
rm -f /tmp/gaia_connector_lock
```
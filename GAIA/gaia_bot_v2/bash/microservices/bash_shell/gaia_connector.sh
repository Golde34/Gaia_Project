#!/bin/bash

# create a lock file
touch /tmp/gaia_connector_lock

python gaia_connector/app_router.py

# remove the lock file when done
rm -f /tmp/gaia_connector_lock
```
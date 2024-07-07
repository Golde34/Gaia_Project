#!/bin/bash

# create a lock file
touch /tmp/camera_cv_lock

cd ../camera_cv

python app_router.py

# remove the lock file when done
rm -f /tmp/camera_cv_lock
```
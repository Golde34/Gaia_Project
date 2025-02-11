#!/bin/bash

# create a lock file
touch /tmp/contribution_tracker_lock

cd ../person_task_manager/contribution_tracker

# load nvm 
source ~/.nvm/nvm.sh

make run

# remove the lock file when done
rm -f /tmp/contribution_tracker_lock
```
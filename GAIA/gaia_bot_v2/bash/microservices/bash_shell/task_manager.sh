#!/bin/bash

# create a lock file
touch /tmp/task_manager_lock

cd ../person_task_manager/server

# load nvm 
source ~/.nvm/nvm.sh

npm run dev

# remove the lock file when done
rm -f /tmp/task_manager_lock
```
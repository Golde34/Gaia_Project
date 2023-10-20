#!/bin/bash

# create a lock file
touch /tmp/task_manager_lock

cd ../person_task_manager/server

npm run dev

# remove the lock file when done
rm -f /tmp/task_manager_lock
```
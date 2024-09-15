#!/bin/bash

# create a lock file
touch /tmp/schedule_plan_lock

cd ../schedule_plan

npm run dev

# remove the lock file when done
rm -f /tmp/schedule_plan_lock
```
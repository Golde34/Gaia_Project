#!/bin/bash

# create a lock file
touch /tmp/gaia_cron_job_lock

cd ../gaia_cron_jobs

make run

# remove the lock file when done
rm -f /tmp/gaia_cron_job_lock
```
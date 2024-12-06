#!/bin/bash

# create a lock file
touch /tmp/notify_agent_lock

cd ../notify_agent

go run cmd/main.go

# remove the lock file when done
rm -f /tmp/notify_agent_lock
```
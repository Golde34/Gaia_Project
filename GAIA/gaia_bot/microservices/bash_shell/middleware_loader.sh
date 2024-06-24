#!/bin/bash

# create a lock file
touch /tmp/middleware_loader_lock

cd ../middleware_loader

go run cmd/main.go

# remove the lock file when done
rm -f /tmp/middleware_loader_lock
```
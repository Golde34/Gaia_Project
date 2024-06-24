#!/bin/bash

# create a lock file
touch /tmp/kafka_server_lock

cd ../kafka_lib/scripts

# start the kafka server
docker compose up

# remove the lock file when done
rm -f /tmp/kafka_server_lock
```
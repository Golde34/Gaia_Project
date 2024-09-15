#!/bin/bash

# create a lock file
touch /tmp/kafka_server_lock

cd ../gaia_lib/kafka/scripts

# start the kafka server
docker compose up -d

# remove the lock file when done
rm -f /tmp/kafka_server_lock
```
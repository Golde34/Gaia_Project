#!/bin/bash

# create a lock file
touch /tmp/auth_service_lock

cd ../authentication_manager/auth_service

# mvn install
java -jar target/auth_service-0.0.1.jar

# remove the lock file when done
rm -f /tmp/auth_service_lock
```
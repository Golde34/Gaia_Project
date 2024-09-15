#!/bin/bash

# create a lock file
touch /tmp/work_optimization_lock

cd ../work_optimization

java -jar target/work_optimization-0.0.1.jar

# remove the lock file when done
rm -f /tmp/work_optimization_lock
```
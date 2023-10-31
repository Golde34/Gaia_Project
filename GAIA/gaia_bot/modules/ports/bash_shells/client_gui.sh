#!/bin/bash

# create a lock file
touch /tmp/client_gui_lock

cd ../client_gui

npm run dev

# remove the lock file when done
rm -f /tmp/client_gui_lock
```
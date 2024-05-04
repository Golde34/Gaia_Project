#!/bin/bash

# create a lock file
touch /tmp/client_gui_lock

cd ../client_gui

# load nvm 
source ~/.nvm/nvm.sh

npm run dev

# remove the lock file when done
rm -f /tmp/client_gui_lock
```
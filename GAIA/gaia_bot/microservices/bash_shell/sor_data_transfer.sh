#!bin/bash

# create a lock file
touch /tmp/sor_data_transfer_lock

cd ../gaia_pipeline/sor-data-transfer

sbt run

# remove the lock file when done
rm -f /tmp/sor_data_transfer_lock
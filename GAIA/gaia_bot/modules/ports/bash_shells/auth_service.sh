#!/bin/bash

cd ../authentication_manager/auth_service

mvn install
java -jar target/auth_service-0.0.1-SNAPSHOT.jar

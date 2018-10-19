#!/bin/bash

sandboxurl="$1"
userpage="$2"
secret="$3"
echo "Starting headless E2E test execution targeting $sandboxurl"
wget -S "${sandboxurl}/${userpage}.aspx?k=${secret}&un=e2euser" -O credentials.txt
echo 'User created on CI sandbox'

response=`cat credentials.txt`
regex='username":"(.*.sitefinity.com)'
[[ $response =~ $regex ]]
createdUser=${BASH_REMATCH[1]}
echo "UserName is: $createdUser"

regex='password":"(.*)"'
[[ $response =~ $regex ]]
createdPass=${BASH_REMATCH[1]}
echo "Password is: $createdPass"

npm run e2e -- --params.sfUrl="$sandboxurl" --params.login.username="$createdUser" --params.login.password="$createdPass" --params.browser="chrome" --params.headless

#!/bin/bash

sandboxurl="$1"
echo "Starting headless E2E test execution targeting $sandboxurl"
wget -S "${sandboxurl}/08d586c0-8436-4088-96af-006150e38123.aspx?k=C8E7279CD035B23BB9C0F1F954DFF5B3&un=e2euser" -O credentials.txt
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

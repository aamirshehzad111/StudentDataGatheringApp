#!/bin/bash
# Stop all servers and start the server
forever stopall
forever start /home/ec2-user/studentdataapp/app.js

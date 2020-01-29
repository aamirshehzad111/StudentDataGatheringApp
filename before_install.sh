#!/bin/bash
# Install node.js and Forever.js
curl -sL https://rpm.nodesource.com/setup_10.x | sudo bash -
sudo yum install nodejs -y
sudo npm install forever -g

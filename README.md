# Voting unit test

Please find in attach the test files for the Voting.sol project.

Testing is done via the javascript files : 
test/test.js

## Directories 
* ├── contracts => Voting.sol 
* ├── do_test.sh => bash script to start the test
* ├── package.json => dependencies
* ├── test    => test.js  => Main script for the test 
* └── truffle-config.js => local network config for ganache & set solidity version 


## Requirements 

* truffle 
* ganache 
* Solidity 0.8.13

## Usage : 

First run ganache 
```
ganache
```
Run the test 
```
truffle test test/test.js
```
or launch the bash script 
```
./do_test.sh
```

## Result

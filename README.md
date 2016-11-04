# swiftservergenerator
This module is a wrapper for the Yeoman command line utility [yo](https://github.com/yeoman/yo) and the [Swift Server Generator](https://github.com/IBM-Swift/generator-swiftserver).

The purpose of this module is to provide a single install with a custom command that performs the code generation for the Swift Server Generator project.

This command line utility runs on Node.js and generates a Swift 3 REST webservice server, as described in the [Swift Server Generator](https://github.com/IBM-Swift/generator-swiftserver) project.

## Installation
To use this module, you will need Node.js and Swift 3 installed on your Linux or macOS system. You can get Node.js from https://nodejs.org and Swift 3 from https://swift.org/download.

To install, use: `npm install -g git+https://github.com/IBM-Swift/swiftservergenerator`  

## Quick start
To create a Swift Server Generator project with no models defined, use: `swiftservergenerator`  
To add a data model to your project, `cd` to the new project directory and use: `swiftservergenerator --model`  
To run the generated server, use: `<project-dir>/.build/debug/<app-name>`

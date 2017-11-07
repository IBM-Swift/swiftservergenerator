#!/usr/bin/env node

/*
 * Copyright IBM Corporation 2016
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
var path = require('path');

// Get the args with the node executable and script name removed
var args = process.argv.slice(2);

// Construct the generator name we want to use and preserve the
// remaining arguments so we can pass them on.
// If no args given - run the default generator (swiftserver:app)
// If first arg is a long option (eg --model) - run the subgenerator by that name
// All remaining args are passed to the selected generator
var generator = 'swiftserver';
if (args.length > 0) {
    if (args[0].startsWith('--') && args[0].length > 2) {
        generator += ':' + args.shift().substr(2);
    }
}
args.unshift(generator);

// Run the embedded generator

var modulesDir = path.join(__dirname, '..', 'node_modules'); // TODO: Will this work properly with npm 3?
// TODO NOTE - move this NOTE out to an issue.
// This might be an npm 3 compatible alternative, need to check if it works if the module
// is globally installed, since there will not be a '.bin' in that case and the binary will
// be in nodedir/bin instead (except on windows).
// Also note that require.resolve() will throw if it fails to find the module.
// Therefore, we may need to have multiple failbacks here:
// 1. Check for embedded:   ok - use it,         doesn't exist - do resolve
// 2. Do resolve:           ok - check version,  throws - fail
// 3. Check version:        ok - check for .bin, doesn't match dependency - fail <<-- shouldn't be necessary
// 4. Check for .bin:       ok - use it,         doesn't exist - check for global bin
// 5. Check for global bin: ok - use it,         doesn't exist - fail
// var modulesDir = path.dirname(path.dirname(require.resolve('yo/package.json')));
// END
var yoCommand = path.join(modulesDir, '.bin', 'yo');
process.env['RUN_BY_COMMAND'] = 'swiftservergenerator';
var options = { cwd: process.cwd(), env: process.env, detached: false, stdio: 'inherit' };

var child = require('child_process').spawn(yoCommand, args, options);
child.on('close' , (code) => {
  process.exit(code);
});

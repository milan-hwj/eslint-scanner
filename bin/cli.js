#!/usr/bin/env node
'use strict';

const process = require('process');
const program = require('commander');
const version = require('../package.json').version;
const eslint = require("eslint");
const render = require('../src/render');
const output = require('../src/output');

program
    .version(version)
    .usage('[options] <src...>')
    .option('-f, --path <path>', 'base directory for resolving paths')
    .option('-c, --config <path>', '.eslintrc path')
    .option('-o, --output <path>', 'path for report html')
    .parse(process.argv);

// if (!program.args.length && !program.stdin) {
//     console.log(program.helpInformation());
//     process.exit(1);
// }

if (program.debug) {
    process.env.DEBUG = '*';
}

if (!program.color) {
    process.env.DEBUG_COLORS = false;
}


new Promise((/* resolve, reject */) => {
    const path = program.path || './app/biz/';
    const eslintConfig = program.config || './app/biz/.eslintrc';
    const outputPath = program.output || './report.html';
    // eslint
    const CLIEngine = eslint.CLIEngine;
    const cli = new CLIEngine({
        envs: ['browser', 'mocha'],
        fix: true,
        configFile: eslintConfig
    });
    const report = cli.executeOnFiles([path]);
    render(report, outputPath);
})
.catch((err) => {
    output.error(err);
    process.exit(1);
});

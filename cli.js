#!/usr/bin/env node
'use strict';
const chalk = require('chalk');
const dpn = require('dpn');
const figures = require('figures');
const indentString = require('indent-string');
const meow = require('meow');
const ora = require('ora');
const sortObject = require('sort-object');

const cli = meow([
	'Usage',
	'  $ dpn [username]',
	'',
	'Options',
	'  -j, --json     Output the result as JSON',
	'  -r, --reverse  Reverse the result',
	'  -v, --verbose  Show the name of the dependents'
], {
	alias: {
		j: 'json',
		r: 'reverse',
		v: 'verbose'
	}
});

const spinner = ora('Loading dependents');

if (!cli.flags.json) {
	spinner.start();
}

dpn(cli.input[0])
	.then(res => {
		spinner.stop();

		if (cli.flags.json || !process.stdin.isTTY) {
			console.log(res);
			process.exit();
		}

		res = sortObject(res, {
			sort: (a, b) => cli.flags.reverse ? res[a].length - res[b].length : res[b].length - res[a].length
		});

		Object.keys(res).forEach(el => {
			console.log(chalk.bold(res[el].length) + ' ' + figures.arrowRight + ' ' + el);

			if (cli.flags.verbose) {
				res[el].forEach(dep => console.log(indentString(chalk.dim(dep), ' ', 6)));
			}
		});
	}).catch(err => {
		spinner.stop();
		console.log(chalk.bold.red(err));
		process.exit(1);
	});

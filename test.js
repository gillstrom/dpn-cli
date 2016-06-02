import execa from 'execa';
import test from 'ava';

test('show help output', async t => {
	t.regex(await execa.stdout('./cli.js', ['--help']), /Get the dependents of a users npm modules/);
});

test('get dependents', async t => {
	t.regex(await execa.stdout('./cli.js', ['gillstrom']), /app-version/);
});

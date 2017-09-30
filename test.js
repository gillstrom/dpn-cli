import execa from 'execa';
import test from 'ava';

test('get dependents', async t => {
	t.regex(await execa.stdout('./cli.js', ['gillstrom']), /app-version/);
});

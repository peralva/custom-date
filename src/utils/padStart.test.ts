import { describe, it } from 'node:test';
import assert from 'node:assert';
import padStart from './padStart';

describe(__filename, () => {
	it('2 digits', () => {
		assert.equal(padStart(1, 2), '01');
	});

	it('3 digits', () => {
		assert.equal(padStart(20, 3), '020');
	});

	it('Input greater than parameter', () => {
		assert.equal(padStart(300, 2), '300');
	});
});

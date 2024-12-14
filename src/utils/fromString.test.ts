import { describe, it } from 'node:test';
import assert from 'node:assert';
import CustomDate from './CustomDate';

describe(__filename, () => {
	it('Valid date (default timezone 1)', () => {
		const date = new CustomDate();
		date.fromString('2024-12-13 12:34:56.789', 'yyyy-MM-dd HH:mm:ss.SSS');
		assert.equal(date.getTime(), 1734093296789);
	});

	it('Valid date (default timezone 2)', () => {
		const date = new CustomDate();
		date.fromString('2024-12-13 12:34:56.789', 'yyyy-MM-dd HH:mm:ss.SSS', {});
		assert.equal(date.getTime(), 1734093296789);
	});

	it('Valid date (-3 hours timezone)', () => {
		const date = new CustomDate();

		date.fromString('2024-12-13 12:34:56.789', 'yyyy-MM-dd HH:mm:ss.SSS', {
			timezone: -180,
		});

		assert.equal(date.getTime(), 1734104096789);
	});

	it('Invalid date', () => {
		const date = new CustomDate();
		date.fromString('abcd', 'yyyy');
		assert.equal(date.getTime(), NaN);
	});

	const date = new CustomDate();

	it('Length', () => {
		assert.throws(
			() => {
				date.fromString('', 'yyyy');
			},
			(err) =>
				err instanceof Error &&
				err.message === 'stringDate and mask parameters must be the same size',
		);
	});

	it('Timezone: -5000.1', () => {
		assert.throws(
			() => {
				date.fromString('', '', { timezone: -5000.1 });
			},
			(err) =>
				err instanceof Error &&
				err.message ===
					'timezone must be integer\ntimezone cannot be less than -1439',
		);
	});

	it('Timezone: 5000.1', () => {
		assert.throws(
			() => {
				date.fromString('', '', { timezone: 5000.1 });
			},
			(err) =>
				err instanceof Error &&
				err.message ===
					'timezone must be integer\ntimezone cannot be greater than 1439',
		);
	});
});

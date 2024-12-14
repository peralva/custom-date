import { describe, it } from 'node:test';
import assert from 'node:assert';
import CustomDate from './CustomDate';

describe(__filename, () => {
	it('Valid date (default timezone 1)', () => {
		const date = new CustomDate('2024-12-13T12:34:56.789-03:00');

		assert.equal(
			date.toCustomString('yyyy-MM-dd HH:mm:ss.SSS'),
			'2024-12-13 15:34:56.789',
		);
	});

	it('Valid date (default timezone 2)', () => {
		const date = new CustomDate('2024-12-13T12:34:56.789-03:00');

		assert.equal(
			date.toCustomString('yyyy-MM-dd HH:mm:ss.SSS', {}),
			'2024-12-13 15:34:56.789',
		);
	});

	it('Valid date (-3 hours timezone)', () => {
		const date = new CustomDate('2024-12-13T12:34:56.789Z');

		assert.equal(
			date.toCustomString('yyyy-MM-dd HH:mm:ss.SSS', { timezone: -180 }),
			'2024-12-13 09:34:56.789',
		);
	});

	it('Invalid date', () => {
		const date = new CustomDate('');

		assert.equal(date.toCustomString(''), date.toString());
	});

	const date = new CustomDate();

	it('Timezone: -5000.1', () => {
		assert.throws(
			() => {
				date.toCustomString('', { timezone: -5000.1 });
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
				date.toCustomString('', { timezone: 5000.1 });
			},
			(err) =>
				err instanceof Error &&
				err.message ===
					'timezone must be integer\ntimezone cannot be greater than 1439',
		);
	});
});

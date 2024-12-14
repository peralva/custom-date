import padStart from './padStart';

export default (date: Date, mask: string, timezone = 0): string => {
	let errors = '';

	if (!Number.isInteger(timezone)) errors += '\ntimezone must be integer';

	if (timezone < -1439) {
		errors += '\ntimezone cannot be less than -1439';
	} else if (timezone > 1439) {
		errors += '\ntimezone cannot be greater than 1439';
	}

	if (errors) throw new Error(errors.replace('\n', ''));

	if (!date.toJSON()) return date.toString();

	const dateWithoutReference = new Date(date);

	dateWithoutReference.setUTCMinutes(
		dateWithoutReference.getUTCMinutes() + timezone,
	);

	const year = dateWithoutReference.getUTCFullYear().toString();
	const month = padStart(dateWithoutReference.getUTCMonth() + 1, 2);
	const day = padStart(dateWithoutReference.getUTCDate(), 2);
	const hour = padStart(dateWithoutReference.getUTCHours(), 2);
	const minute = padStart(dateWithoutReference.getUTCMinutes(), 2);
	const second = padStart(dateWithoutReference.getUTCSeconds(), 2);
	const millisecond = padStart(dateWithoutReference.getUTCMilliseconds(), 3);

	let result = mask;

	result = result.replace(/yyyy/g, year);
	result = result.replace(/MM/g, month);
	result = result.replace(/dd/g, day);
	result = result.replace(/HH/g, hour);
	result = result.replace(/mm/g, minute);
	result = result.replace(/ss/g, second);
	result = result.replace(/SSS/g, millisecond);

	return result;
};

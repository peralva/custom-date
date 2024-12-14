export default (value: number, length: number): string => {
	return value.toString().padStart(length, '0');
};

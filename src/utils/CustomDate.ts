import fromString from './fromString';
import toCustomString from './toCustomString';

export default class extends Date {
	public toCustomString(
		mask: string,
		{ timezone }: { timezone?: number } = {},
	): string {
		return toCustomString(this, mask, timezone);
	}

	public fromString(
		stringDate: string,
		mask: string,
		{ timezone }: { timezone?: number } = {},
	): void {
		return fromString(this, stringDate, mask, timezone);
	}
}

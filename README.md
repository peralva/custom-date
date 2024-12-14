# @peralva/custom-date

Custom Date

[![NPM Version](https://img.shields.io/npm/v/%40peralva%2Fcustom-date)](https://www.npmjs.com/package/@peralva/custom-date?activeTab=versions)
[![GitHub Release Date](https://img.shields.io/github/release-date/peralva/custom-date)](https://github.com/peralva/custom-date/releases)
[![GitHub License](https://img.shields.io/github/license/peralva/custom-date)](https://github.com/peralva/custom-date?tab=MIT-1-ov-file#readme)
[![NPM Downloads](https://img.shields.io/npm/dm/%40peralva%2Fcustom-date)](https://www.npmjs.com/package/@peralva/custom-date)
[![NPM Publish](https://github.com/peralva/custom-date/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/peralva/custom-date/actions/workflows/npm-publish.yml)

## Installation

```bash
npm install --save @peralva/custom-date
```

## Usage

### Get date string from a mask

```ts
import { CustomDate } from '@peralva/custom-date';

const date = new CustomDate();

const stringDate = date.toCustomString('yyyy-MM-dd HH:mm:ss.SSS', {
	timezone: -180,
});

console.log(stringDate);
```

### Change date instance from a mask

```ts
import { CustomDate } from '@peralva/custom-date';

const date = new CustomDate();

date.fromString('20241214 12:34:56.789', 'yyyyMMdd HH:mm:ss.SSS', {
	timezone: -180,
});

console.log(date);
```

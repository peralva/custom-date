export default (
	date: Date,
	stringDate: string,
	mask: string,
	timezone = 0,
): void => {
	let errors = '';

	if (stringDate.length !== mask.length) {
		errors += '\nstringDate and mask parameters must be the same size';
	}

	if (!Number.isInteger(timezone)) errors += '\ntimezone must be integer';

	if (timezone < -1439) {
		errors += '\ntimezone cannot be less than -1439';
	} else if (timezone > 1439) {
		errors += '\ntimezone cannot be greater than 1439';
	}

	if (errors) throw new Error(errors.replace('\n', ''));

	const indexyyyy = mask.indexOf('yyyy');
	const indexMM = mask.indexOf('MM');
	const indexdd = mask.indexOf('dd');
	const indexHH = mask.indexOf('HH');
	const indexmm = mask.indexOf('mm');
	const indexss = mask.indexOf('ss');
	const indexSSS = mask.indexOf('SSS');

	/*
        Definindo o fuso horário para o informado para que todos os ajustes sejam feitos no fuso
        horário desejado
    */
	date.setUTCMinutes(date.getUTCMinutes() + timezone);

	if (indexyyyy > -1) {
		date.setUTCFullYear(Number(stringDate.substring(indexyyyy, indexyyyy + 4)));
	}

	if (indexMM > -1) {
		const set = Number(stringDate.substring(indexMM, indexMM + 2)) - 1;

		/*
            Se a data atual for por exemplo 31/01 e o mês for alterado para 04 antes de definir o
            dia, a data vai para 01/05, já que não existe 31/04 deixando o mês 05
        */
		date.setUTCMonth(set);

		/*
            Aqui é definido uma segunda vez para corrigir o caso acima, deixando o mês 04 (no
            exemplo acima)
        */
		date.setUTCMonth(set);
	}

	if (indexdd > -1) {
		const set = Number(stringDate.substring(indexdd, indexdd + 2));

		/*
            Se a data atual for por exemplo 01/04 e o dia for alterado para 31 antes de definir o
            mês, a data vai para 01/05, já que não existe 31/04 deixando o dia 01
        */
		date.setUTCDate(set);

		/*
            Aqui é definido uma segunda vez para corrigir o caso acima, deixando o dia 31 (no
            exemplo acima)
        */
		date.setUTCDate(set);
	}

	if (indexHH > -1) {
		date.setUTCHours(Number(stringDate.substring(indexHH, indexHH + 2)));
	}

	if (indexmm > -1) {
		date.setUTCMinutes(Number(stringDate.substring(indexmm, indexmm + 2)));
	}

	if (indexss > -1) {
		date.setUTCSeconds(Number(stringDate.substring(indexss, indexss + 2)));
	}

	if (indexSSS > -1) {
		date.setUTCMilliseconds(
			Number(stringDate.substring(indexSSS, indexSSS + 3)),
		);
	}

	// Voltando o fuso horário para o orignal
	date.setUTCMinutes(date.getUTCMinutes() - timezone);
};

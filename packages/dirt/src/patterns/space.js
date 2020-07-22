export const SPACE = [0, 2, 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192, 256];

export const toSpace = token => {
	console.log(token);
	if (!token) return SPACE[0];
	if (token.length === 1) return SPACE[token] + 'px';
	if (token.length === 2) return `${SPACE[token[0]] + 'px'} ${SPACE[token[1]] + 'px'}`;
	if (token.length === 3) {
		return `${SPACE[token[0]] + 'px'} ${SPACE[token[1]] + 'px'} ${SPACE[token[2]] + 'px'}`;
	}
	if (token.length === 4) {
		return `${SPACE[token[0]] + 'px'} ${SPACE[token[1]] + 'px'} ${SPACE[token[2]] + 'px'} ${
			SPACE[token[3]] + 'px'
		}`;
	}
};

export const setSpace = (n, nx, ny) => {
	return nx && !ny
		? toSpace([nx, 0])
		: ny && !nx
		? toSpace([0, ny])
		: nx && ny
		? toSpace([nx, ny])
		: n
		? toSpace(toArray(n))
		: 0;
};

export const toArray = n => (typeof n === 'number' ? [n] : [...n]);

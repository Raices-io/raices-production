const highlight = (children, highlighted = []) => {
	children.split(' ').map(word => {
		// If word is in highlighted array
		if (highlighted.includes(word)) {
			return <span className="color">{word + ' '}</span>;
		} else {
			return word + ' ';
		}
	});
};

export default highlight;

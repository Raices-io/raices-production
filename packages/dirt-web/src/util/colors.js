import theme from "../styles/theme";

const colors = color => {
	const colorObj = color.split(".")[0];
	const colorHue = color.split(".")[1];

	if (!colorHue) return theme.colors[colorObj];

	return theme.colors[colorObj][colorHue];
};

export default colors;

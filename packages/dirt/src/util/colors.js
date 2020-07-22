import theme from "../styles/theme";

const colors = color => {
	const colorObj = color.split(".")[0];
	const colorHue = color.split(".")[1];

	if (!colorHue) return theme.global.colors[colorObj];

	return theme.global.colors[colorObj][colorHue];
};

export default colors;

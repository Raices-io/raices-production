import { COLORS } from "../patterns/colors";

const colors = color => {
	const colorObj = color.split(".")[0];
	const colorHue = color.split(".")[1];

	if (!colorHue) return COLORS[colorObj];

	return COLORS[colorObj][colorHue];
};

export default colors;

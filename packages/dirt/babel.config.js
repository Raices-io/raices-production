const presets = [
	[
		"@babel/env",
		{
			modules: false,
		},
	],
	["@babel/preset-react"],
];

const plugins = ["babel-plugin-styled-components"];

module.exports = { presets, plugins };

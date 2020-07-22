const presets = [
	[
		'@babel/env',
		{
			modules: false,
		},
	],
	['@babel/preset-react'],
];

const plugins = ['babel-plugin-styled-components', { ssr: true, displayName: true, preprocess: false }];

module.exports = { presets, plugins };

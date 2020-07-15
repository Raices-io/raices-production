import babel from "@rollup/plugin-babel";

export default [
	{
		input: "src/main.js",
		output: {
			name: "dirt-design",
			file: "dist/main.js",
			format: "cjs",
		},
		external: ["react"],
		plugins: [
			babel({
				exclude: "node_modules/**",
			}),
		],
	},
];

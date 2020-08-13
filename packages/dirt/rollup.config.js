import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default [
	{
		input: 'src/main.js',
		output: {
			name: 'dirt-design',
			file: 'dist/main.js',
			format: 'cjs',
		},
		external: ['react', 'react-dom', 'prop-types', 'styled-components', 'next/link', 'next'],
		plugins: [
			babel({
				exclude: 'node_modules/**',
			}),
			nodeResolve()
		],
	},
];

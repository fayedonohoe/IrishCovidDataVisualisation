import resolve from '@rollup/plugin-node-resolve'; //locate and bundle dependencies
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser'; //minify code

// `npm run build` -> `production` is true
// `npm run dev` -> `production` is false
const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'public/src/index.js',
	output: {
		file: 'public/src/bundle.js',
		format: 'iife', // immediately-invoked function expression — suitable for <script> tags
		sourcemap: true
	},
	plugins: [
		resolve(), // tells Rollup how to find date-fns in node_modules
		commonjs(), // converts date-fns to ES modules
		production && terser() // minify, but only in production
	]
};

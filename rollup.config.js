import babel from 'rollup-plugin-babel';
import { uglify } from "rollup-plugin-uglify";
import commonjs from 'rollup-plugin-commonjs';
const extensions = [
	'.js', '.jsx', '.ts', '.tsx',
];

module.exports = {
  input: 'index.ts',
  output: {
    file: './dist/index.js',
    format: 'umd',
    sourcemap: true,
    name: 'FaiDnD',
    exports: 'named',
  },
	plugins: [
    babel({
			extensions,
      include: ['./index.ts', 'src/**/*'],
      exclude: 'node_modules/**',
    }),
		commonjs({
			extensions
		}),
    uglify()
  ],
};
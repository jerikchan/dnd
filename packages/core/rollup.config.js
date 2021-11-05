import babel from 'rollup-plugin-babel';
import { uglify } from "rollup-plugin-uglify";
import commonjs from 'rollup-plugin-commonjs';
const extensions = [
	'.js', '.jsx', '.ts', '.tsx',
];

function output(ext, format = 'umd') {
  return {
    name: 'FaiDnd',
    file: `./dist/fai-dnd.${ext}`,
    format,
    exports: 'named',
  };
}

const umd = {
  input: 'index.ts',
  output: output('js'),
  plugins: [
    babel({
			extensions,
      include: ['./index.ts', 'src/**/*'],
      exclude: 'node_modules/**',
    }),
		commonjs({
			extensions
		}),
  ],
};

const min = {
  ...umd,
  output: output('min.js'),
  plugins: [...umd.plugins, uglify()],
}

const es = {
  ...umd,
  output: output('esm.js', 'esm'),
}

module.exports = [umd, min, es];
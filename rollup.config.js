import typescript from 'rollup-plugin-typescript';

export default {
  input: 'lib/index.ts',
  output: [
    {
      file: 'dist/main.cjs.js',
      format: 'cjs',
    },
    {
      file: 'dist/main.esm.js',
      format: 'es',
    },
  ],
  plugins: [
    typescript({
      exclude: 'node_modules/**',
      typescript: require('typescript'),
    }),
  ],
};

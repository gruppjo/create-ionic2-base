import alias from 'rollup-plugin-alias';
import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'src/app/public/vendor.ts',
  dest: 'src/app/public/vendor.es2015.js',
  format: 'iife',
  moduleName: 'vendor',
  plugins: [
    typescript(),
    alias({ rxjs: __dirname + '/node_modules/rxjs-es' }),
    resolve({
      jsnext: true,
      main: true,
      browser: true }),
  ]
}

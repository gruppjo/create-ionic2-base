import alias from 'rollup-plugin-alias';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';

export default {
  entry: 'src/app/main.ts',
  dest: 'src/app/public/bundle.es2015.js',
  format: 'iife',
  sourceMap: true,
  plugins: [
    typescript(),
    alias({ rxjs: __dirname + '/node_modules/rxjs-es' }),
    resolve({ jsnext: true,
              main: true,
              browser: true })
  ],
  external: [
    '@angular/core',
    '@angular/common',
    '@angular/compiler',
    '@angular/core',
    '@angular/http',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    '@angular/router',
    '@angular/router-deprecated',
    'ionic-angular',
    'ionic-native'
  ],
  globals: {
    '@angular/common' : 'vendor._angular_common',
    '@angular/compiler' : 'vendor._angular_compiler',
    '@angular/core' : 'vendor._angular_core',
    '@angular/http' : 'vendor._angular_http',
    '@angular/platform-browser' : 'vendor._angular_platformBrowser',
    '@angular/platform-browser-dynamic' : 'vendor._angular_platformBrowserDynamic',
    '@angular/router' : 'vendor._angular_router',
    '@angular/forms' : 'vendor._angular_forms',
    'ionic-angular': 'vendor._ionic_angular',
    'ionic-native': 'vendor._ionic-native'
  }
}

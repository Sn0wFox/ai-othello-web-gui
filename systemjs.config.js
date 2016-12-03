/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 *
 * NOTE: this file is mostly the same as the one provided
 * here: https://angular.io/docs/ts/latest/tutorial/,
 * for the version github:angular/angular@2.0.0-rc.4.
 * Some small changes were applied to fit the needs of the current app.
 */
(function(global) {
  // map tells the System loader where to look for things
  var map = {
    'src':                        'build', // 'src',
    '@angular':                   'node_modules/@angular',
    'bluebird':                   'node_modules/bluebird/js/browser',
    'jquery':                     'node_modules/jquery/dist',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    'rxjs':                       'node_modules/rxjs'
  };
  // packages tells the System loader how to load when no filename and/or no extension
  var packages = {
    'src':                        { main: 'main.js',  defaultExtension: 'js' },
    'rxjs':                       { defaultExtension: 'js' },
    'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
    'bluebird':                   { main: 'bluebird.js', defaultExtension: 'js' },
    'jquery':                     { main: 'jquery.js', defaultExtension: 'js' }
  };
  var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'forms',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'router-deprecated',
    'upgrade',
  ];
  // Individual files (~300 requests):
  function packIndex(pkgName) {
    packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
  }
  // Bundled (~40 requests):
  function packUmd(pkgName) {
    packages['@angular/'+pkgName] = { main: 'bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
  }
  // Most environments should use UMD; some (Karma) need the individual index files
  var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
  // Add package entries for angular packages
  ngPackageNames.forEach(setPackageConfig);
  var config = {
    map: map,
    packages: packages
  };
  System.config(config);
})(this);

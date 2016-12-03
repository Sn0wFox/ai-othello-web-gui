const gulp = require('gulp');                     // The packages which make this code working somehow like "make"
const del = require('del');                       // To erase some file during cleaning tasks
const typescript = require('gulp-typescript');    // To make gulp work with TypeScript compiler
const sourcemaps = require('gulp-sourcemaps');    // To produce .map.js files while compiling
const tscConfig = require('./tsconfig.json');     // Gather the options for TypeScript compiler

/** PARAMETERS **/
const SRC = 'src';                  // Root of the sources folder
const BUILD = 'build';              // Root of the build folder
const SRC_ALL = SRC + '/**/*';      // Match all the files in the sources folder
const BUILD_ALL = BUILD + '/**/*';  // Match all the files in the build folder
const STC_FILES = [                 // All the staic files needed in the buildng directory
  SRC_ALL + '.css',
  SRC_ALL + '.html'
  // Add here the static files you want to copy in the building directory
];

/** GULP TASKS **/
/**
 * Cleans the contents of the building directory.
 */
gulp.task('clean', (er) => {
  return del(BUILD_ALL);
});

/**
 * Compiles TypeScript files using the typings,
 * and generates .map.js files too.
 */
gulp.task('compile', () => {
  return gulp
    .src([SRC_ALL + '.ts', 'typings/**/*.ts'])
    .pipe(sourcemaps.init())
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(BUILD));
});

/**
 * Cleans building directory and recompiles TypeScript files
 * using the typings, and generates .map.js files too.
 * Note that it compiles only when the cleaning task is done
 * (no concurrency here).
 */
gulp.task('clean-compile', ['clean'], () => {
  return gulp
    .src([SRC_ALL + '.ts', 'typings/**/*.ts'])
    .pipe(sourcemaps.init())
    .pipe(typescript(tscConfig.compilerOptions))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(BUILD));
});

/**
 * Copies the static files needed in the building directory.
 */
gulp.task('assets', () => {
  return gulp
    .src(STC_FILES)
    .pipe(gulp.dest(BUILD));
});

/**
 * Cleans building directory and recopies static files
 * in the building directory.
 * Note that it recopies files only when the cleaning task is done
 * (no concurrency here).
 */
gulp.task('clean-assets', ['clean'], () => {
  return gulp
    .src(STC_FILES)
    .pipe(gulp.dest(BUILD));
});

/**
 * Watch for changes in the /src folder.
 */
gulp.task('watch', () => {
  // Recompile when a ts file is modified
  gulp
    .watch([SRC_ALL + '.ts'], ['compile'])
    .on('change', (e) => {
        console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
    });
  // Recopy files when a .html or .css file is modified
  gulp
    .watch([SRC_ALL + '.html', SRC_ALL + '.css'], ['assets'])
    .on('change', (e) => {
        console.log('Resource file ' + e.path + ' has been changed. Updating.');
    });
});

/**
 * Compiles .ts files and copies static files
 * in the building directory.
 */
gulp.task('build', ['compile', 'assets']);

/**
 * Cleans the building directory and rebuilds the app.
 * Note that it recopies and compiles files
 * only when the cleaning task is done
 * (no concurrency here between cleaning and the others).
 */
gulp.task('rebuild', ['clean', 'clean-compile', 'clean-assets']);

/**
 * Sets the default task to the build task.
 */
gulp.task('default', ['build']);

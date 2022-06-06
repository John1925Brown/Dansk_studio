const { src, dest, watch, series } = require("gulp");
const browserSync = require("browser-sync").create();
const minifyCSS = require("gulp-minify-css");
const concat = require("gulp-concat");
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const minify = require("gulp-minify");
const htmlmin = require("gulp-htmlmin");
const tinypng = require("gulp-tinypng-compress");

// Static server
function bs() {
  serveSass();
  browserSync.init({
    server: {
      baseDir: "./",
    },
  });
  watch("./*.html").on("change", browserSync.reload);
  watch("./sass/**/*.scss", serveSass).on("change", browserSync.reload);
  watch("./sass/**/*.sass", serveSass).on("change", browserSync.reload);
  watch("./scss/**/*.scss", serveSass).on("change", browserSync.reload);
  watch("./js/*.js").on("change", browserSync.reload);
}

function serveSass() {
  return src("./sass/**/*.scss")
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(dest("./css"))
    .pipe(browserSync.stream());
}

function buildCSS(done) {
  src("css/**/**.css")
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(dest("dist/css/"));
  done();
}

function buildJS(done) {
  src(["js/**.js", "!js/**.min.js"])
    .pipe(
      minify({
        ext: {
          min: ".js",
        },
      })
    )
    .pipe(dest("dist/js/"));
  src("js/**.min.js").pipe(dest("dist/js/"));
  done();
}

function html(done) {
  src("**.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(dest("dist/"));
  done();
}

function php(done) {
  src("**.php").pipe(dest("dist/"));
  src("phpmailer/**.**").pipe(dest("dist/phpmailer/"));
  done();
}

function fonts(done) {
  src("fonts/**/**").pipe(dest("dist/fonts/"));
  done();
}

function imagemin(done) {
  src("img/**/**")
    .pipe(tinypng({ key: "b8WCSLTzjlVxQRCgxw8zjwX2s59RyK2C" }))
    .pipe(dest("dist/img/"));
  src("img/**/*.svg").pipe(dest("dist/img/"));
  src("img/**/*.jpg")
    .pipe(tinypng({ key: "b8WCSLTzjlVxQRCgxw8zjwX2s59RyK2C" }))
    .pipe(dest("dist/img/"));
  done();
}

exports.serve = bs;
exports.build = series(buildCSS, buildJS, html, php, fonts, imagemin);

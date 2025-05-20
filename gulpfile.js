const { src, dest, watch, parallel, series } = require("gulp");
const scss = require("gulp-sass")(require("sass"));
const uglify = require("gulp-uglify-es").default;
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");
const clean = require("gulp-clean");

// const avif = require("gulp-avif");
// const webp = require("gulp-webp").default;
const imagemin = require("gulp-imagemin");
// const merge = require("merge-stream");
// const newer = require("gulp-newer");

// function images() {
//   const avifImages = src("app/images/src/*.*")
//     .pipe(newer("app/images/dist"))
//     .pipe(avif({ quality: 50 }))
//     .pipe(dest("app/images/dist"));
//   const webpImages = src("app/images/src/*.*")
//     .pipe(newer("app/images/dist"))
//     .pipe(webp())
//     .pipe(dest("app/images/dist"));
//   const originalImages = src("app/images/src/*.*")
//     .pipe(newer("app/images/dist"))
//     .pipe(imagemin())
//     .pipe(dest("app/images/dist"));

//   return merge(avifImages,webpImages, originalImages);
// }

function images(){
  return src("app/images/src/*")
  .pipe(imagemin())
  .pipe(dest("app/images/dist"))
}

function scripts() {
  return src(["app/js/main.js"])
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(dest("app/js"))
    .pipe(browserSync.stream());
}

function styles() {
  return src("app/scss/style.scss")
    .pipe(
      scss({
        outputStyle: "compressed",
        sourceMap: false,
      }).on("error", scss.logError)
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 10 versions"],
      })
    )
    .pipe(concat("style.min.css"))
    .pipe(dest("app/css"))
    .pipe(browserSync.stream());
}

function watching() {
  browserSync.init({
    server: {
      baseDir: "app/",
    },
  });
  watch(["app/scss/style.scss"], styles);
  watch(["app/images/src"], images);
  watch(["app/js/main.js"], scripts);
  watch(["app/*.html"]).on("change", browserSync.reload);
}

function cleanDist() {
  return src("dist").pipe(clean());
}

function building() {
  return src(
    [
      "app/css/style.min.css",
      "app/images/dist/*.*",
      "app/fonts/*.*",
      "app/js/main.min.js",
      "app/**/*.html",
    ],
    {
      base: "app",
    }
  ).pipe(dest("dist"));
}

exports.styles = styles;
exports.scripts = scripts;
exports.watching = watching;
exports.images = images;

exports.build = series(cleanDist, building);
exports.default = parallel(styles, images, scripts, watching);

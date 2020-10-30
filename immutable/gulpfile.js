const gulp = require("gulp")
const rev = require("gulp-rev")
const revReplace = require("gulp-rev-replace");
const clean = require("gulp-clean")

gulp.task('clean', function () {
  return gulp.src('build', {read: false})
    .pipe(clean());
});
 

gulp.task("revision", function(){
  return gulp.src(["assets/**/*.css", "assets/**/*.js"])
    .pipe(rev())
    .pipe(gulp.dest("build"))
    .pipe(rev.manifest())
    .pipe(gulp.dest("build"))
})

gulp.task("revreplace", function(){
  var manifest = gulp.src("./build/rev-manifest.json");

  return gulp.src("./index.html")
    .pipe(revReplace({manifest: manifest}))
    .pipe(gulp.dest("build"));
});

gulp.task("default", gulp.series("clean", "revision", "revreplace"));
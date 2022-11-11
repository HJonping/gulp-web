import gulp from 'gulp'
const sass = require('gulp-sass')(require('sass')) //将scss编译成css
import autoprefixer from 'gulp-autoprefixer'
import plumber from 'gulp-plumber'
import gulpSourcemaps from 'gulp-sourcemaps'
import cleanCSS from 'gulp-clean-css'
import gulpIf from 'gulp-if'
import minimist from 'minimist'
import uglify from 'gulp-uglify'
import babelify from 'babelify'
import browserify from 'gulp-browserify'
import babel from 'gulp-babel'
import fileinclude from 'gulp-file-include' // 公共文件
const browserSync = require('browser-sync').create(); // 微型服务，当资源改动时，浏览器会自动刷新
import gulpHtmlmin from 'gulp-htmlmin' //压缩html文件
import { format } from 'date-fns'
import gulpZip from 'gulp-zip'
import runSequence from 'gulp4-run-sequence'
import deleted from 'gulp-deleted'

//接收gulp命令参数
const argv = minimist(process.argv.slice(2), {
    default: {
        //默认值
        env: 'prod' || 'test',
        mergeModule: true
    }
});
//watch模式和编译dev模式下 可生成源码 方便调试 上线前需要重新编译 yarn build 去掉生成的源码注释
const sourcemapsFlag = argv.env === 'dev' || argv._[0] === 'watch' || argv._[0] === 'serve' ? true : false
//是否合并js模块 加入模块兼容代码 可兼容旧项目一些乱的js写法
const moduleFlag = argv.mergeModule === 'false' ? false : true
const projectPath = './'
const srcPath = `${projectPath}src`
// 编译文件输出路径
const outPutPath = `${projectPath}dist`


//sass编译成css文件默认输出路径
const stylePath = '/styles'
//js 编译生成的文件默认输出路径
const scriptPath = '/scripts'

const styleFiles = `${srcPath}${stylePath}/*.scss`
const commonStyleFiles = `${srcPath}${stylePath}/common/_base.scss`
//css 输出方式 nested, expanded, compact, compressed
var outputStyle = 'expanded'
const scriptFiles = `${srcPath}${scriptPath}/*.js`
const staticPath = `/static`
const staticFiles = `${srcPath}/static/**/*`
const htmlPath = `/pages`
const htmlFiles = `${srcPath}${htmlPath}/*.html`
const includeHtmlFiles = `${srcPath}/include/*.html`

/*
 * 任务：sass编译成css样式
 * gulpSourcemaps 生成sourcemap文件 简单讲就是文件压缩后不利于查看与调试，但是有了sourcemap，出错的时候，除错工具将直接显示原始代码，而不是转换后的代码
 * gulpSourcemaps.write( path )，将会在指定的 path，生成独立的sourcemaps信息文件 如果不指定则在当前路径生成
 * plumber:Stream 发生错误时，进行错误处理可以避免 gulp 进程崩溃
 * 
 */
function styles(cb) {
    console.log('styles', 'styles')
    gulp.src(styleFiles)
        .pipe(plumber())
        .pipe(gulpIf(sourcemapsFlag, gulpSourcemaps.init())) //标记 map 记录始发点
        .pipe(sass({
            outputStyle: outputStyle
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);       
            cascade: true,
        }))
        .pipe(cleanCSS()) //压缩css
        //dev环境才生成sourcemaps
        .pipe(gulpIf(sourcemapsFlag, gulpSourcemaps.write())) //输出 .map 文件
        .pipe(gulp.dest(`${outPutPath}${stylePath}`))
        .pipe(browserSync.reload({
            stream: true
        }))
    cb()
}
gulp.task(styles)

/*
 * 任务：es6+编译成es5，进行js模块合并,压缩
 */
//压缩参数
const miniOptions = {}
function scripts(cb) {
    gulp.src(scriptFiles)
        .pipe(gulpIf(sourcemapsFlag, gulpSourcemaps.init()))
        .pipe(plumber())
        .pipe(babel())
        //使用Browserify进行es6模块合并 因浏览器识别不了require
        .pipe(gulpIf(moduleFlag, browserify({
            transform: [babelify.configure({ presets: ['@babel/preset-env'] })],
            insertGlobals: true,
            debug: sourcemapsFlag
        })))
        .pipe(uglify(miniOptions))
        //dev环境才生成sourcemaps
        .pipe(gulpIf(sourcemapsFlag, gulpSourcemaps.write()))
        .pipe(gulp.dest(`${outPutPath}${scriptPath}`))
        .pipe(browserSync.reload({
            stream: true
        }))
    cb()
}
gulp.task(scripts)

/*
 * 任务：html文件公共文件编译，压缩
 */
function html(cb) {
    gulp.src(`${srcPath}${htmlPath}/*.html`)
        .pipe(plumber())
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulpIf(sourcemapsFlag, gulpSourcemaps.init()))
        .pipe(gulpHtmlmin({ collapseWhitespace: true }))
        //dev环境才生成sourcemaps
        .pipe(gulpIf(sourcemapsFlag, gulpSourcemaps.write())) //输出 .map 文件
        .pipe(gulp.dest(`${outPutPath}${htmlPath}`))
        .pipe(browserSync.reload({
            stream: true
        }))
    cb()
}
gulp.task(html)

/**
 * copy静态内容 如图片
 **/
function copy(cb) {
    gulp.src([staticFiles])
        .pipe(gulp.dest(`${outPutPath}${staticPath}`))
        .pipe(browserSync.reload({
            stream: true
        }))
    cb()
}
gulp.task(copy)

/*
 * 任务：浏览器自动刷新
 */
function browserSyncTask(cb) {
    browserSync.init(
        {
            server: {
                baseDir: `${outPutPath}`,
            },
            startPath: `${htmlPath}/index.html`,
            open: true
            // port: 3000
        })
    cb()
}

/*
 * 任务：清除dist文件夹内容
 */
function deleteDist(cb) {
    gulp.src(`${outPutPath}/**`)
        .pipe(deleted(`${outPutPath}/**`))
    cb()
}
gulp.task(deleteDist)

/*
 * 任务：压缩存档
 */
function archive(cb) {
    const filename = format(new Date(), 'yyyyMMdd')
    gulp.src([`${outPutPath}/**`, `!${outPutPath}/*.zip`])
        .pipe(gulpZip(filename + '.zip'))
        .pipe(gulp.dest(outPutPath))
    cb()
}
gulp.task(archive)

// 编译压缩任务 先清除dist目录文件
const build = function (cb) {
    runSequence('deleteDist', 'styles', 'scripts', 'copy', 'html', 'archive', cb)
}
gulp.task(build)

// 监听文件任务
const watch = function (cb) {
    gulp.series(browserSyncTask, () => { })();
    gulp.watch([styleFiles, commonStyleFiles], gulp.series(styles));
    gulp.watch(scriptFiles, gulp.series(scripts));
    gulp.watch([htmlFiles, includeHtmlFiles], gulp.series(html));
    gulp.watch(staticFiles, gulp.series(copy));
    cb()
}
gulp.task(watch)

// 开发环境服务
const serve = function (cb) {
    runSequence('deleteDist', ['styles', 'scripts', 'copy', 'html'], 'watch', cb)
}
gulp.task(serve)

export {
    build,
    watch,
    serve
}

var gulp           = require('gulp'), // Подключаем Gulp
	browserSync  		 = require('browser-sync').create(),
	autoprefixer 		 = require('gulp-autoprefixer'),
	sass = require('gulp-sass')(require('sass')), //Подключаем Sass пакет,
	cssnano      		 = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
	rename       		 = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
	concat       		 = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
	uglify       		 = require('gulp-uglify-es').default, // Подключаем gulp-uglifyjs (для сжатия JS)
	del          		 = require('del'), // Подключаем библиотеку для удаления файлов и папок
	imagemin     		 = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
	webp             = require('gulp-webp'),
	htmlmin          = require('gulp-htmlmin');
	pug              = require('gulp-pug');



	const { series } = require('gulp');  // новый синтаксис
	const { parallel } = require('gulp'); // новый синтаксис галп 4 

gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync.init({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'app' // Директория для сервера - app
		},
		notify: false // Отключаем уведомления
	});
});
gulp.task('watch', function() {
	gulp.watch("app/*.pug").on('change', gulp.parallel('pug'));
	gulp.watch('app/sass/**/*.sass', gulp.parallel('sass')); // Наблюдение за sass файлами в папке sass
	gulp.watch("app/*.html").on('change', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
	gulp.watch('app/js/**/*.js').on('change', browserSync.reload);   // Наблюдение за JS файлами в папке js
});

// pug
gulp.task('pug', function () {
  return gulp.src('app/**/*.pug')
  .pipe(pug({
    pretty: true
	}))
	.pipe(gulp.dest('app'));
});

// html replace
gulp.task('html-replace', function() {
	return gulp.src('app/*.html') // Переносим HTML в продакшен
		.pipe(htmlmin({ collapseWhitespace: true })) // Минифицируем HTML
		.pipe(gulp.dest('dist'));
})


// sass and css tasks
gulp.task('sass', function () { // Создаем таск Sass
	return gulp.src('app/sass/**/*.sass') // Берем источник
		.pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
		.pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
		.pipe(browserSync.reload({ stream: true })) // Обновляем CSS на странице при изменении
});

gulp.task('css-replace', function() {
	return gulp.src('app/css/main.css')
		.pipe(gulp.dest('dist/css'))
})

gulp.task('css-fonts', function() {
	return gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
		.pipe(gulp.dest('dist/fonts'))
	})

gulp.task('css-min', function() {
	return gulp.src('app/css/main.css') // Выбираем файл для минификации
		.pipe(cssnano()) // Сжимаем
		.pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
		.pipe(gulp.dest('dist/css'))  ,
				gulp.src('app/libs/**/*.css') // Для библиотек
				    .pipe(concat('libs.min.css'))
				    .pipe(cssnano())
				    .pipe(gulp.dest('dist/css'));
});

// js 
gulp.task('scripts', function() {
	return gulp.src([ // Берем все необходимые библиотеки
		'app/libs/**/*.js', // Берем jQuery
		// 'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js' // Берем Magnific Popup
		])
				.pipe(concat('libs.min.js')) // Собираем их в кучу в новом файле libs.min.js
				.pipe(uglify()) // Сжимаем JS файл
				.pipe(gulp.dest('dist/js')), // Выгружаем в папку app/js
			gulp.src('app/js/*.js')
				.pipe(uglify())
				.pipe(rename({suffix: '.min'}))
				.pipe(gulp.dest('dist/js')),
			gulp.src('app/js/*.js')
				.pipe(gulp.dest('dist/js'))
});
// сжатие изображений
gulp.task('img', () =>
    gulp.src([
		'app/images/**/*.{jpg,jpeg,png,gif,svg}',
		'!app/images/apple-icon-57x57.png',
		'!app/images/apple-icon-60x60.png',
		'!app/images/apple-icon-72x72.png',
		'!app/images/apple-icon-76x76.png',
		'!app/images/apple-icon-114x114.png',
		'!app/images/apple-icon-120x120.png',
		'!app/images/apple-icon-144x144.png',
		'!app/images/apple-icon-152x152.png',
		'!app/images/android-icon-36x36.png',
		'!app/images/android-icon-48x48.png',
		'!app/images/android-icon-72x72.png',
		'!app/images/android-icon-96x96.png',
		'!app/images/android-icon-144x144.png',
		'!app/images/favicon-96x96.png',
		'!app/images/ms-icon-70x70.png',
		'!app/images/ms-icon-144x144.png',
		'!app/images/ms-icon-150x150.png',
		'!app/images/ms-icon-310x310.png',
		'!app/images/apple-icon.png',
		'!app/images/apple-icon-precomposed.png',
		'!app/images/ico.png',
		'!app/images/ico.jpg'
	])
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            svgoPlugins: [{removeViewBox: false}]
        }))
        .pipe(gulp.dest('dist/images'))
);

// создание webp версий изображений
gulp.task('webp', () =>
    gulp.src('app/images/**/*.{jpg,jpeg,png}')
        .pipe(webp({quality: 75}))
        .pipe(gulp.dest('dist/images'))
);

// копирование изображений без сжатия (для разработки)
gulp.task('img-copy', () =>
    gulp.src('app/images/**/*')
        .pipe(gulp.dest('dist/images'))
);

// delete
gulp.task('clean', async function() {
	// Удаляем всё из dist КРОМЕ папки .git
	return del.sync('dist/**/*', { 
		force: true,
		ignore: ['dist/.git/**/*', 'dist/.git']
	}); 
});

// минификация favicon (оставляем только основные)
gulp.task('favicon-min', function() {
	return gulp.src([
		'app/images/favicon.ico',
		'app/images/favicon-16x16.png',
		'app/images/favicon-32x32.png',
		'app/images/android-icon-192x192.png',
		'app/images/apple-icon-180x180.png',
		'app/images/manifest.json',
		'app/images/browserconfig.xml'
	])
	.pipe(gulp.dest('dist/images'));
});

// копирование .htaccess
gulp.task('htaccess', function() {
	return gulp.src('.htaccess')
		.pipe(gulp.dest('dist'));
});

// копирование sitemap.xml
gulp.task('sitemap', function() {
	return gulp.src('app/sitemap.xml')
		.pipe(gulp.dest('dist'));
});

// копирование robots.txt
gulp.task('robots', function() {
	return gulp.src('app/robots.txt')
		.pipe(gulp.dest('dist'));
});

// деплой в production репозиторий
gulp.task('deploy', function(callback) {
	const { spawn } = require('child_process');
	
	const commitMessage = process.env.COMMIT_MSG || 'Update production build';
	
	console.log('🚀 Деплой в production...');
	
	// Используем spawn для лучшей работы с потоками
	const git = spawn('cmd.exe', ['/c', 
		'cd dist && git add . && git diff-index --quiet HEAD || git commit -m "' + commitMessage + '" && git push origin master'
	], { stdio: 'inherit' });
	
	git.on('close', function(code) {
		if (code === 0) {
			console.log('✅ Деплой завершен успешно!');
			callback();
		} else {
			callback(new Error('Деплой завершился с кодом ' + code));
		}
	});
});

// Основная задача сборки
gulp.task('build', gulp.series('clean', 'html-replace', 'sass', gulp.parallel('img', 'webp', 'css-min', 'css-replace', 'css-fonts', 'scripts', 'favicon-min', 'htaccess', 'sitemap', 'robots')));

exports.buildAndDeploy = gulp.series('build', 'deploy');

exports.see = parallel('browser-sync', 'watch');




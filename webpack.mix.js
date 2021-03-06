const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js').vue()
    .postCss('resources/css/app.css', 'public/css', [
        require('postcss-import'),
        require('tailwindcss'),
        require('autoprefixer'),
    ])
    .postCss('resources/css/reset.css', 'public/css/app.css')
    //.sass('resources/sass/app.scss', 'public/css',{
    //    sourceMap: true,
    //    sassOptions: {
    //      outputStyle: "compressed",
    //    },
    //})
    .minify('public/js/app.js')
    .webpackConfig(require('./webpack.config'));

if (mix.inProduction()) {
    mix.version();
}

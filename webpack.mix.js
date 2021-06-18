const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .vue()
    .sass('resources/sass/app.scss', 'public/css',{
        sourceMap: true,
        sassOptions: {
          outputStyle: "compressed",
        },
    })
    //.minify('public/css/app.css');
    //  outputStyle: mix.inProduction ? 'compressed' : 'expanded'
    mix.postCss('resources/css/custom.css','public/css/app.css',{
        outputStyle: "compressed"
    }).minify('public/css/app.css');
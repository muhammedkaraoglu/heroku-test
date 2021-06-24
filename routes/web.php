<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION
    ]);
});

//Route::group(['namespance' => 'App\Https\Controllers\App','prefix' => '/app','as' => 'app'],function(){
//    Route::get('/','HomeController@index')->name('dasboard');
//});

Route::group(['namespace' => 'App\Http\Controllers\App','prefix' => '/app','as' => 'app.'],
    fn() => [
        Route::get('/','DashboardController@index')->name('dashboard'),
        Route::get('/note/create','NoteController@create')->name('note.create'),
    ]
);

Route::group(['namespace' => 'App\Http\Controllers\App','prefix' => '/app/api','as' => 'app.api.'],
  fn() => [

    Route::group(['prefix' => '/note','as' => 'note.'],
      fn() => [
        Route::get('/','NoteController@index')->name('index'),
        Route::post('/','NoteController@store')->name('store'),
      ]),
  ]
);


Route::get('/login','App\Http\Controllers\Auth\AuthenticatedSessionController@create')->name('login');

//Route::get('/login',fn() => 'test')->name('login');


Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->name('dashboard');

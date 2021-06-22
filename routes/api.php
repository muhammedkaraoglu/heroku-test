<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
  return $request->user();
});

Route::group(['namespace' => 'App\Http\Controllers\App','prefix' => '/app/api','as' => 'app.api.'],
  fn() => [

    Route::group(['prefix' => '/note','as' => 'note.'],
      fn() => [
        Route::get('/','NoteController@index')->name('index'),
        Route::post('/','NoteController@store')->name('store'),
      ]),
  ]
);
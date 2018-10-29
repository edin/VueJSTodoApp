<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/todos', 'Api\TodoController@get');
Route::post('/todos', 'Api\TodoController@post');
Route::patch('/todos', 'Api\TodoController@patch');
Route::delete('/todos/{id}', 'Api\TodoController@delete');

Route::get('/comments/{type}/{id}', 'Api\CommentController@get');
Route::post('/comments', 'Api\CommentController@post');
Route::patch('/comments', 'Api\CommentController@patch');
Route::delete('/comments/{id}', 'Api\CommentController@delete');
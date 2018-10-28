<?php

use App\{Todo, Comment};
use App\Http\Resources\{TodoCollection, CommentCollection};
use Illuminate\Http\Request;

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

Route::post('/todos', function(Request $request) {
    $data = json_decode($request->getContent(), true);
    $id = (int)$data['id'];

    if ($id > 0) {
        $todo = Todo::findOrFail($id);
        $todo->update($data);
        return $todo;
    } else {
        return Todo::create($data);
    }
});

Route::get('/todos', function () {
    return new TodoCollection(Todo::all());
});

Route::delete('/todos/{id}', function($id) {
    $todo = Todo::findOrFail($id);
    $todo->delete();
    return response()->json(null, 204);
});

Route::post('/comments', function(Request $request) {
    $data = json_decode($request->getContent(), true);
    $id = (int)$data['id'];

    if ($id > 0) {
        $todo = Comment::findOrFail($id);
        $todo->update($data);
        return $todo;
    } else {
        return Comment::create($data);
    }
});

function findComments($collection, $type, $id) {
    $comments = Comment::where("entity_type", "=", $type)->where("entity_id", "=", $id)->get();

    foreach ($comments as $comment) {
        $collection[] = $comment;
    }

    foreach ($comments as $comment) {
        findComments($collection, "comment", $comment->id);
    }
}

Route::get('/comments/{type}/{id}', function ($type, $id) {
    $data = new Illuminate\Database\Eloquent\Collection();
    findComments($data, $type, $id);
    return new CommentCollection($data);
});

Route::delete('/comments/{id}', function($id) {
    Comment::find($id)->delete();
    return 204;
});
<?php

namespace App\Http\Controllers\Api;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

use App\{Todo, Comment};
use App\Http\Resources\{TodoCollection, CommentCollection};
use Illuminate\Http\Request;

class TodoController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function post(Request $request) {
        $data = json_decode($request->getContent(), true);
        return Todo::create($data);
    }

    public function patch(Request $request) {
        $data = json_decode($request->getContent(), true);
        $id = (int)$data['id'];
   
        $todo = Todo::findOrFail($id);
        $todo->update($data);
        return $todo;
    }    

    public function get() {
        return new TodoCollection(Todo::all());
    }

    public function delete ($id) {
        $todo = Todo::findOrFail($id);
        $todo->delete();
        return response()->json(null, 204);
    }
}
<?php

namespace App\Http\Controllers\Api;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Database\Eloquent\Collection;

use App\{Todo, Comment};
use App\Http\Resources\{TodoCollection, CommentCollection};
use Illuminate\Http\Request;


class CommentController extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

    public function post(Request $request) {
        $data = json_decode($request->getContent(), true);
        return Comment::create($data);
    }

    public function patch(Request $request) {
        $data = json_decode($request->getContent(), true);
        $id = (int)$data['id'];

        $todo = Comment::findOrFail($id);
        $todo->update($data);
        return $todo;
    }    

    function findComments($collection, $type, $id) {
        $comments = Comment::where("entity_type", "=", $type)->where("entity_id", "=", $id)->get();
    
        foreach ($comments as $comment) {
            $collection[] = $comment;
        }
    
        foreach ($comments as $comment) {
            $this->findComments($collection, "comment", $comment->id);
        }
    }

    public function get($type, $id) {
        $data = new Collection();
        $this->findComments($data, $type, $id);
        return new CommentCollection($data);
    }
    
    public function delete($id) {
        Comment::find($id)->delete();
        return 204;
    }
}





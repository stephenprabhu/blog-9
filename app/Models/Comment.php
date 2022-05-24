<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function post(){
        return $this->belongsTo(Post::class);
    }

    public function scopeFilter($query, array $filters){
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('message', 'like', '%'.$search.'%')
                ->orWhereHas('post', fn($query)=>
                    $query->where('title','like', '%'.$search.'%'))
                ->orWhereHas('user', fn($query)=>
                    $query->where('name','like', '%'.$search.'%'));
            });
        });
    }
}

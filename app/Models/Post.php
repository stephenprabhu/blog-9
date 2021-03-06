<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Spatie\Tags\HasTags;

class Post extends Model
{
    use HasFactory;
    use HasTags;

    protected $guarded = ['id'];
    protected $with = ['author','category'];

    public function scopeFilter($query, array $filters){
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('title', 'like', '%'.$search.'%')
                    ->orWhere('slug', 'like', '%'.$search.'%')
                    ->orWhere('snippet', 'like', '%'.$search.'%')
                    ->orWhere('body', 'like', '%'.$search.'%');
            });
        })->when($filters['status'] ?? null, function ($query, $status ){
            if($status === 'published'){
                $query->where('published',true);
            }else if ($status === 'draft'){
                $query->where('published',false);
            }
        })->when($filters['category'] ?? null, function ($query, $category){
            $query->whereExists(fn($query)=>
                $query->from('categories')
                    ->whereColumn('categories.id','posts.category_id')
                    ->where('categories.slug',$category));
        })->when($filters['author'] ?? null, function ($query, $author){
            $query->whereExists(fn($query)=>
                $query->from('users')
                    ->whereColumn('users.id','posts.user_id')
                    ->where('users.username',$author));
        });
    }

    public function author(){
        return $this->belongsTo(User::class,'user_id');
    }

    public function category(){
        return $this->belongsTo(Category::class);
    }

    public function comments(){
        return $this->hasMany(Comment::class);
    }

    public function publishedDate(): Attribute
    {
        return Attribute::make(
            set: fn ($value) => Carbon::parse($value)
        );
    }

    public function published(): Attribute
    {
        return Attribute::make(
            set: fn ($value) => $value == "published" ? true : false
        );
    }


    public function featuredImage(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value ? Storage::url($value) : null
        );
    }
}

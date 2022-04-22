<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Tags\HasTags;

class Post extends Model
{
    use HasFactory;
    use HasTags;

    protected $guarded = ['id'];

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
        });
    }

    public function author(){
        return $this->belongsTo(User::class,'user_id');
    }

    public function category(){
        return $this->belongsTo(Category::class);
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
}

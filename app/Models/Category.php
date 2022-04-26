<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Category extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function posts(){
        return $this->hasMany(Post::class);
    }

    public function imageUrl(): Attribute {
        return Attribute::make(
            get: fn ($value) => $value ? Storage::url($value) : null
        );
    }
}

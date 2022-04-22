<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class PostSubmitRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title'=>['required','max:255','min:2'],
            'slug'=>['required','unique:posts,slug'],
            'body'=>['required'],
            'published'=>['required'],
            'category_id'=>['required','exists:categories,id'],
            'snippet'=>['nullable'],
            'published_date'=>['nullable', 'date'],
            'meta_description'=>['nullable'],
            'meta_keywords'=>['nullable'],
        ];
    }
}

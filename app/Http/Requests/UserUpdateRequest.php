<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;

class UserUpdateRequest extends FormRequest
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
        $user = $this->route('user');
        return [
            'name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:255','min:3',Rule::unique('users','username')->ignore($user),'regex:/[a-zA-Z0-9-]+/'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users','email')->ignore($user) ],
            'slogan'=> ['nullable','max:255'],
            'role'=>['required','min:0','max:2']
        ];
    }
}

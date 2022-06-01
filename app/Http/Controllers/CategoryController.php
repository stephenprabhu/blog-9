<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Request as LaravelRequest;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $categories = Category::filter(LaravelRequest::only('search'))
                        ->latest()
                        ->paginate(10)
                        ->appends(LaravelRequest::all());
        $filters = LaravelRequest::all('search');
        return inertia('Categories/Index',[
            'categories'=> $categories,
            'filters'=> $filters
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'=>['required','max:255'],
            'slug'=>['required','unique:categories,slug'],
            'description'=>['nullable']
        ]);

        if($request->hasFile('image_url')){
            $path = $request->file('image_url')->store('public/categories/');
            $validated['image_url']=$path;
        }

        Category::create($validated);
        return redirect()->back()->with('success','Category Successfully Created');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function edit(Category $category)
    {
        $categories = Category::filter(LaravelRequest::only('search'))
                    ->latest()
                    ->paginate(10)
                    ->appends(LaravelRequest::all());
        $filters = LaravelRequest::all('search');
        return inertia('Categories/Index',[
            'catEditing'=>true,
            'categories'=> $categories,
            'filters'=>$filters,
            'curCategory'=>$category
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name'=>['required','max:255'],
            'slug'=>['required',Rule::unique('categories','slug')->ignore($category)],
            'description'=>['nullable']
        ]);

        if($category->image_url){
            Storage::disk('local')->delete($category->image_url);
        }

        if($request->hasFile('image_url')){
            $path = $request->file('image_url')->store('public/categories/');
            $validated['image_url']=$path;
        }

        $category->update($validated);
        return redirect()->route('categories.index')->with('success','Category Updated');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function destroy(Category $category)
    {
        if($category->image_url){
            Storage::disk('local')->delete($category->image_url);
        }
        if($category->posts->count() > 0 ){
            return back()->with('fail','Category Could Not Be Deleted Because There Are Posts That Use The Category');
        }
        $category->delete();
        return redirect()->route('categories.index')->with('success','Category Deleted');
    }
}

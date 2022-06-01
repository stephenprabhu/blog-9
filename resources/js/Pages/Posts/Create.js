import { Link, useForm } from "@inertiajs/inertia-react";
import RichTextEditor from "@mantine/rte";
import { useEffect, useState, useRef} from "react";
import Layout from "../../Shared/Layout";
import LoadingButton from "../../Shared/LoadingButton";
import slugify from "slugify";
import { ActionIcon, Select, Textarea, MultiSelect, TextInput } from "@mantine/core";
import CreateCategoryModal from "../Categories/CategoryFormModal";
import {MdAdd} from "react-icons/md";
import { DatePicker } from '@mantine/dates';
import SingleFileUpload from "../../Shared/SingleFileUpload";
import { Inertia } from "@inertiajs/inertia";
import { Editor } from '@tinymce/tinymce-react';

const Create = (props) => {
    const [categoryFormModalOpened, setCategoryFormModalOpened]=useState(false);
    const [showAdvanced, setShowAdvanced] = useState(false);


    const { data, setData, post, processing } = useForm({
        title: "",
        slug:"",
        published:"published",
        body:"",
        category_id:"",
        published_date: new Date(),
        meta_description: "",
        meta_keywords: "",
        snippet: "",
        tags: [],
        featured_image: null
    });





    const {editing, article, categories, tags, errors } = props;

    useEffect(()=>{
        if(editing && article){
            let editTags = [];
            if( article.tags && article.tags.length){
                editTags = article.tags.map(tag => tag.name.en)
            }

            setData({
                title: article.title,
                slug: article.slug,
                published: article.published ? "published": "draft",
                body: article.body,
                category_id: String(article.category_id),
                published_date: article.published_date,
                meta_description: article.meta_description,
                meta_keywords: article.meta_keywords,
                snippet:  article.snippet,
                tags: editTags,
            });
        }
    },[editing, article]);


    const onTitleInputChanged = (e) => {
        const val = e.currentTarget.value;
        if(val){
            setData(data => {
                return {
                    ...data,
                    "title":val,
                    "slug": slugify(val)
                }
            });
        }else{
            setData(data => {
                return {
                    ...data,
                    "title":"",
                    "slug": ""
                }
            });
        }
    };



    const onBodyChanged = (bodyVal)=>{
        setData(data => {
           return {
            ...data,
            "body": bodyVal,
            "snippet": textCleaner(bodyVal, 300),
            "meta_description": textCleaner(bodyVal, 140)
           }
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        if(editing){
            Inertia.post(route("posts.update", article), {
                _method: 'put',
                ...data
              });
        }else{
            post(route("posts.store"));
        }
    }

    const handleImageUpload = (file) => new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('image', file);

        fetch('/posts/upload', {
            method: 'POST',
            body: formData,
        })
        .then((response) => response.json())
        .then((result) =>  {
            console.log(result);
            return resolve(result.url);
        })
        .catch(() => reject(new Error('Upload failed')));
    });

    const textCleaner = (text, length)=>{
        return text.replace(/<\/?[^>]+(>|$)/g, "").replace("&nbsp;", " ").slice(0,length);
    }

    return (
        <div className="h-full">
            <h1 className="mb-8 text-3xl font-bold">
                <Link
                    href={route("posts.index")}
                    className="text-indigo-600 hover:text-indigo-700"
                >
                    Posts
                </Link>
                <span className="font-medium text-indigo-600"> /</span> {editing ? "Edit":"Create"}
            </h1>
            <div className="bg-white rounded shadow z-30 overflow-visible">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-wrap p-8 -mb-8 -mr-6">
                        <div className="grid grid-cols-12 w-full">
                            <div className="col-span-6">

                                <TextInput
                                    className="w-full pb-2 pr-6 "
                                    label="Title"
                                    name="title"
                                    error={errors.title}
                                    value={data.title}
                                    onChange={onTitleInputChanged}
                                    required
                                />
                                <TextInput
                                    className="w-full pb-2 pr-6 "
                                    label="Slug"
                                    name="slug"
                                    error={errors.slug}
                                    value={data.slug}
                                    onChange={e=> setData("slug", e.currentTarget.value) }
                                    required
                                />
                            </div>
                            <div className="col-span-6">
                                <div className="w-full pb-2 pr-6">
                                    <label className="mb-2">Featured Image:</label>
                                    <SingleFileUpload
                                        onFileUpload={(file) => setData(prevData => ({...prevData, 'featured_image':file}))}
                                        imagePath={editing ? article.featured_image : null}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="w-full grid grid-cols-2 gap-4 mr-6">
                        <Select
                            label="Category"
                            data={categories.map(category=>(
                                {value:String(category.id) , label:category.name}
                            ))}
                            value={data.category_id}
                            placeholder="Click Here"
                            error={errors.category_id}
                            nothingFound="Nothing found"
                            searchable
                            rightSection={
                                <ActionIcon
                                    className="bg-indigo-700"
                                    variant="filled"
                                    onClick={() => setCategoryFormModalOpened(true)}>
                                    <MdAdd />
                                </ActionIcon>
                            }
                            onChange={val => setData('category_id', val)}
                        />
                            <MultiSelect
                                label="Tags"
                                data={tags.map(tag => { return {value: tag.name.en, label:tag.name.en}})}
                                placeholder="Select items"
                                searchable
                                creatable
                                clearable
                                getCreateLabel={(query) => `+ Create ${query}`}
                                value={data.tags}
                                onChange={val => setData('tags', val)}
                            />
                        <Select
                            data={[
                                {value:"published", label:"Published"},
                                {value:"draft", label:"Draft"},
                            ]}
                            label="Status"
                            value={data.published}
                            onChange={val => setData('published', val)}

                        />
                        <DatePicker
                            placeholder="Pick date"
                            label="Published Date"
                            value={data.published_date}
                            onChange={val => setData('published_date', val)}
                            required />
                        </div>

                        {/* <RichTextEditor
                            value={data.body}
                            onChange={onBodyChanged}
                            onImageUpload={handleImageUpload}
                            style={{minHeight:"400px"}}
                            apiKey="i4mwasxip6nx08ueqa0m0yi8yu42qg6es6y6t7w1iqkzt2r2"
                            className="w-full mt-4"
                        /> */}
                         <Editor
                            initialValue={editing ? article.body : ''}
                            tinymceScriptSrc='/js/tinymce/tinymce.min.js'
                            init={{
                            height: 500,
                            menubar: false,
                            width:'100%',
                            plugins: [ "image", "code", "table", "link", "media", "lists"],
                            toolbar1: 'undo redo | bold italic underline strikethrough | fontfamily fontsize blocks | alignleft aligncenter alignright alignjustify | outdent indent | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl',
                            toolbar2: ' numlist bullist',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                            onEditorChange={onBodyChanged}
                        />
                        <input type="hidden" value={data.body} name="body" />
                        {showAdvanced &&
                        <div className="w-full flex justify-around mt-3 ml-1 mr-1">
                             <Textarea
                                className="w-full mr-2"
                                description="Give a brief description about the article."
                                label="Snippet"
                                value={data.snippet}
                                onChange={event => setData('snippet', event.currentTarget.value)}
                            />
                            <Textarea
                                className="w-full mr-2"
                                description="Description of article shown on search engines like Google"
                                label="Meta Description (Max 140 characters)"
                                value={data.meta_description}
                                onChange={event => setData('meta_description', event.currentTarget.value)}
                            />
                            <Textarea
                                className="w-full"
                                description="Keywords related to the article. (Seperate by commas)"
                                placeholder="Dinosaurs, Jurassic Park, Velociraptor"
                                label="Meta Keywords"
                                onChange={event => setData('meta_keywords', event.currentTarget.value)}
                                value={data.meta_keywords}

                            />
                        </div>

                        }
                    </div>

                    <div className="flex items-center justify-end px-8 py-4 bg-gray-100 border-t border-gray-200">
                        <button className="btn-secondary mr-3" type="button" onClick={() => setShowAdvanced(show => !show)}>
                            {showAdvanced ? "Hide": "Show"} Advanced
                        </button>
                        <a href="#" className="btn-indigo mr-3">Show Preview</a>
                        <LoadingButton
                            loading={processing}
                            type="submit"
                            className="btn-indigo"
                        >
                            {editing ? "Update": "Create"} Post
                        </LoadingButton>
                    </div>
                </form>
            </div>
                <CreateCategoryModal opened={categoryFormModalOpened} onExternalPage={true} setOpened={setCategoryFormModalOpened} />
        </div>
    );
};

Create.layout = (page) => <Layout title="Posts" children={page} />;

export default Create;

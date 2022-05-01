import { useForm, usePage } from '@inertiajs/inertia-react'
import React from 'react'
import { Modal, Textarea, TextInput } from '@mantine/core'
import slugify from 'slugify';
import LoadingButton from '../../Shared/LoadingButton';
import { useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';
import SingleFileUpload from '../../Shared/SingleFileUpload';

const CreateCategoryModal = (props) => {

    const { data, setData, errors, post, put, processing } = useForm ({
        name: "",
        slug: "",
        description:"",
        image_url:null
    });

    const {catEditing: editing, curCategory} = usePage().props;

    useEffect(()=>{
        if(editing && curCategory){
            setData({
                name: curCategory.name,
                slug: curCategory.slug,
                description: curCategory.description
            });
        }

    },[editing, curCategory]);



    function handleSubmit(e) {
        e.preventDefault();
        if(editing){
            Inertia.post(route("categories.update", curCategory), {
                _method: 'put',
                ...data
              });
        }else{
            post(route("categories.store"));
        }
        props.setOpened(false);
        setData({
            name: "",
            slug: "",
            description:""
        });
    }


    const onTitleInputChanged = (e) => {
        const val =  e.currentTarget.value;
        if(val){
            setData(data => {
                return {
                    ...data,
                    "name":val,
                    "slug": slugify(val)
                }
            });
        }else{
            setData(data => {
                return {
                    ...data,
                    "name":"",
                    "slug": ""
                }
            });
        }
    };

    const onCategoryModalClosed = ()=>{
        if(props.onExternalPage){
            props.setOpened(false);
        }else{
            Inertia.get(route('categories.index'));
        }
    }

  return (
    <Modal
    opened={props.opened}
    onClose={onCategoryModalClosed}
    title="Create New Category"
    >
        <form onSubmit={handleSubmit}>
           <div>
                <label>
                    Category Image (optional):
                </label>
                <SingleFileUpload
                    imagePath={editing && curCategory ? curCategory.image_url : null}
                    onFileUpload={(file) => setData(prevData => ({...prevData, 'image_url':file}))} />
           </div>

            <TextInput
                className="w-full pb-2 pr-6"
                label="Title"
                name="title"
                error={errors.name}
                value={data.name}
                onChange={onTitleInputChanged}
                required
            />
            <TextInput
                className="w-full pb-2 pr-6"
                label="Slug"
                name="slug"
                error={errors.slug}
                value={data.slug}
                onChange={e=> setData("slug", e.target.value) }
                required
            />
            <Textarea
                label="Description (optional):"
                minRows={2}
                maxRows={4}
                value={data.description}
                onChange={e => setData("description", e.currentTarget.value)}
            />
            <LoadingButton
                loading={processing}
                type="submit"
                className="btn-indigo mt-3"
            >
                {editing ? "Update": "Create"} Category
            </LoadingButton>
        </form>
    </Modal>
  )
}

export default CreateCategoryModal

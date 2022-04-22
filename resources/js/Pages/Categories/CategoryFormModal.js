import { useForm, usePage } from '@inertiajs/inertia-react'
import React from 'react'
import { Modal, Textarea } from '@mantine/core'
import TextInput from '../../Shared/TextInput';
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
        imageUrl:null
    });

    const {editing, curCategory} = usePage().props;

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
            put(route("categories.update", curCategory));
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
        const val =  e.target.value;
        if(val){
            setData(data => {
                return {
                    ...data,
                    "name":val,
                    "slug": slugify(val)
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
                    Category Image:
                </label>
                <SingleFileUpload onFileUpload={(file) => setData('imageUrl',file)} />
           </div>
            <TextInput
                className="w-full pb-2 pr-6"
                label="Title"
                name="title"
                errors={errors.name}
                value={data.name}
                onChange={onTitleInputChanged}
            />
            <TextInput
                className="w-full pb-2 pr-6"
                label="Slug"
                name="slug"
                errors={errors.slug}
                value={data.slug}
                onChange={e=> setData("slug", e.target.value) }
            />
            <Textarea
                label="Description:"
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

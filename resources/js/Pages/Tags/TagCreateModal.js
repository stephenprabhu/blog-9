import { Modal } from "@mantine/core";
import TextInput from "../../Shared/TextInput";
import { useForm, usePage } from '@inertiajs/inertia-react'
import LoadingButton from "../../Shared/LoadingButton";
import { useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";
const TagCreateModal = (props) => {

    const {editing, curTag} = usePage().props;

    const { data, setData, errors, post, put, processing } = useForm ({
        name: "",
    });

    useEffect(()=>{
        if(editing && curTag){
            setData({
                name: curTag.name.en,
            });
        }

    },[editing, curTag]);

    function handleSubmit(e) {
        e.preventDefault();
        if(editing){
            put(route("tags.update", curTag.id));
        }else{
            post(route("tags.store"));
        }
        props.setOpened(false);
        setData({
            name: ""
        });
    }

    const onModalClose = ()=>{
        Inertia.get(route('tags.index'));
    }


  return (
        <Modal
        opened={props.opened}
        onClose={onModalClose}
        title="Create New Tag"
        >
            <form onSubmit={handleSubmit}>
                <TextInput
                    label="Name"
                    required
                    value={data.name}
                    errors={errors.name}
                    onChange={e=> setData("name", e.target.value) }
                />
                <LoadingButton
                    type="submit"
                    className="btn-indigo mt-3"
                    loading={processing}

                >
                    {editing ? "Update": "Create"} Tag
                </LoadingButton>
            </form>
        </Modal>
  )
}

export default TagCreateModal

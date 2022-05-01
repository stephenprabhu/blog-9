import React,{useState} from "react";
import { Menu } from '@mantine/core';
import {MdEditNote, MdOutlineDeleteSweep, MdOutlineAutoGraph} from "react-icons/md";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { Inertia } from "@inertiajs/inertia";
import moment from "moment";
import Badge from "../../Shared/Badge";
import DeleteConfirmationModal from "../../Shared/DeleteConfirmationModal";
import imagePathHelper from "../../helpers/ImagePathHelper";
import MantineMenuItem from "../../Shared/MantineMenuItem";

const PostRow = ({post, index}) => {
    const [deleteDialogOpened, setDeleteDialogOpened]= useState(false);


    const onEditMenuClicked =()=>{
        Inertia.get(route('posts.edit',post.id));
    }

    const onPostDeleteClicked = ()=>{
        setDeleteDialogOpened(false);
        Inertia.delete(route('posts.destroy', post.id));
    }

    const onViewDetailsClicked = ()=>{
        Inertia.get(route('posts.show',post));
    }

  return (
    <tr
        className="hover:bg-gray-100 focus-within:bg-gray-100"
    >
    <td className="pl-3">{index + 1}</td>
    <td className="border-t py-2 px-2">
        {post.featured_image &&
            <img src={post.featured_image} width="100px" height="100px" style={{objectFit:'cover'}}  alt="Post Featured" />
        }
    </td>
    <td className="border-t py-2 px-2">
        {post.title}
    </td>
    <td className="border-t py-2 px-2">
        {post.published ? <Badge color="success">Published</Badge> : <Badge color="info">Draft</Badge>}
    </td>
    <td>{post.views}</td>
    <td className="border-t py-2 px-2">
        {moment(post.created_at).format('MMM DD, YYYY')}
    </td>
    <td className="border-t">
        <Menu>
            <MantineMenuItem icon={MdEditNote} onClick={onEditMenuClicked} label={"Edit"} />
            <MantineMenuItem icon={MdOutlineAutoGraph} onClick={onViewDetailsClicked} label={"View Details"} />
            <MantineMenuItem
                component="a"
                href={route('front.post',post)}
                target="_blank"
                icon={HiOutlineGlobeAlt}
                onClick={()=>{}}
                label={"View On Website"} />
            <MantineMenuItem icon={MdOutlineDeleteSweep} color="red" onClick={()=>setDeleteDialogOpened(true)} label={"Delete"} />
        </Menu>
    </td>
    <DeleteConfirmationModal
        opened={deleteDialogOpened}
        onConfirmClicked={onPostDeleteClicked}
        onCancelClicked={() => setDeleteDialogOpened(false)}
        name="Post"
    />
    </tr>
  )
}

export default PostRow

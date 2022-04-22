import React,{useState} from "react";
import { Menu } from '@mantine/core';
import {MdEditNote, MdOutlineDeleteSweep, MdOutlineAutoGraph} from "react-icons/md";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { Inertia } from "@inertiajs/inertia";
import moment from "moment";
import Badge from "../../Shared/Badge";
import DeleteConfirmationModal from "../../Shared/DeleteConfirmationModal";

const PostRow = ({post, index}) => {
    const [deleteDialogOpened, setDeleteDialogOpened]= useState(false);

    const onEditMenuClicked =()=>{
        Inertia.get(route('posts.edit',post.id));
    }

    const onPostDeleteClicked = ()=>{
        setDeleteDialogOpened(false);
        Inertia.delete(route('posts.destroy', post.id));
    }

  return (
    <tr
        className="hover:bg-gray-100 focus-within:bg-gray-100"
    >
    <td className="pl-3">{index + 1}</td>
    <td></td>
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
            <Menu.Item icon={<MdEditNote />} onClick={()=>{onEditMenuClicked()}}>Edit</Menu.Item>
            <Menu.Item icon={<MdOutlineAutoGraph />}>View Details</Menu.Item>
            <Menu.Item icon={<HiOutlineGlobeAlt />}>View On Website</Menu.Item>
            <Menu.Item icon={<MdOutlineDeleteSweep /> } onClick={()=>setDeleteDialogOpened(true)} color="red">Delete</Menu.Item>
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

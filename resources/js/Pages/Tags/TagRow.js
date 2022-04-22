import { Menu } from '@mantine/core';
import {MdEditNote, MdOutlineDeleteSweep} from "react-icons/md";
import DeleteConfirmationModal from '../../Shared/DeleteConfirmationModal';
import { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';

const TagRow = ({tag, index}) => {
    const [deleteDialogOpened, setDeleteDialogOpened]= useState(false);

    const onTagDeleteClicked = ()=>{
        setDeleteDialogOpened(false);
        Inertia.delete(route('tags.destroy', tag.id));
    }

    const onEditClicked=()=>{
        Inertia.get(route('tags.edit',tag.id));
    }

  return (
    <tr  className="hover:bg-gray-100 focus-within:bg-gray-100">
        <td className="border-t py-2 px-2">{index + 1}</td>
        <td className="border-t py-2 px-2">{tag.name.en}</td>
        <td className="border-t">
            <Menu>
                <Menu.Item icon={<MdEditNote />} onClick={onEditClicked} >Edit</Menu.Item>
                <Menu.Item icon={<MdOutlineDeleteSweep /> } onClick={() => setDeleteDialogOpened(true)}  color="red">Delete</Menu.Item>
            </Menu>
        </td>
        <DeleteConfirmationModal
            opened={deleteDialogOpened}
            onConfirmClicked={onTagDeleteClicked}
            onCancelClicked={() => setDeleteDialogOpened(false)}
            name="Tag"
        />
    </tr>
  )
}

export default TagRow

import {MdEditNote, MdOutlineDeleteSweep} from "react-icons/md";
import { HiOutlineGlobeAlt } from "react-icons/hi";
import { Menu } from '@mantine/core';
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";
import DeleteConfirmationModal from "../../Shared/DeleteConfirmationModal";

const CategoryRow = ({category, index}) => {
    const [deleteDialogOpened, setDeleteDialogOpened]= useState(false);

    const onDeleteClicked  = ()=>{
        setDeleteDialogOpened(false);
        Inertia.delete(route('categories.destroy', category.id));
    }

    const onEditClicked = ()=>{
        Inertia.get(route('categories.edit',category.id));
    }
  return (
    <tr className="hover:bg-gray-100 focus-within:bg-gray-100">
    <td className="pl-3">{index + 1}</td>
    <td></td>
    <td className="border-t py-2 px-2">
        {category.name}
    </td>
    <td className="border-t py-2 px-2">
        {category.description}
    </td>
    <td className="border-t py-2 px-2">
    <Menu>
        <Menu.Item icon={<MdEditNote />} onClick={onEditClicked}>Edit</Menu.Item>
        <Menu.Item icon={<HiOutlineGlobeAlt />}>View Category Posts</Menu.Item>
        <Menu.Item icon={<MdOutlineDeleteSweep /> } onClick={() => setDeleteDialogOpened(true)}  color="red">Delete</Menu.Item>
    </Menu>
    </td>
    <DeleteConfirmationModal
        opened={deleteDialogOpened}
        onConfirmClicked={onDeleteClicked}
        onCancelClicked={() => setDeleteDialogOpened(false)}
        name="Category"
    />
    </tr>
  )
}

export default CategoryRow

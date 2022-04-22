import { Menu } from "@mantine/core";
import {MdEditNote, MdOutlineDeleteSweep, MdOutlineCancel, MdLockOutline} from "react-icons/md";
import { useState } from "react";
import DeleteConfirmationModal from "../../Shared/DeleteConfirmationModal";
import { Inertia } from "@inertiajs/inertia";

const UserRow = ({user,index}) => {
    const [deleteDialogOpened, setDeleteDialogOpened]= useState(false);

    const onUserDeleteClicked = ()=>{
        setDeleteDialogOpened(false);
        Inertia.delete(route('users.destroy', user.id));
    }

    const onEditMenuClicked =()=>{
        Inertia.get(route('users.edit',user.id));
    }

  return (
    <tr className='hover:bg-gray-100 focus-within:bg-gray-100'>
        <td className='border-t py-2 px-2'>
            {index+1}
        </td>
        <td></td>
        <td className='border-t py-2 px-2'>
            {user.name}
        </td>
        <td className='border-t py-2 px-2'>
            {user.email}
        </td>
        <td className='border-t py-2 px-2'>
            {user.role === 0 ? "Reader":""}
            {user.role === 1 ? "Author":""}
            {user.role === 2 ? "Admin":""}

        </td>
        <td className='border-t'>
            <Menu>
                <Menu.Item icon={<MdEditNote />} onClick={onEditMenuClicked}>
                    Edit Profile
                </Menu.Item>
                <Menu.Item icon={<MdLockOutline />} onClick={onEditMenuClicked}>
                    Change Password
                </Menu.Item>
                <Menu.Item icon={<MdOutlineCancel />}>
                    Block
                </Menu.Item>
                <Menu.Item icon={<MdOutlineDeleteSweep /> } onClick={()=>setDeleteDialogOpened(true)} color="red">
                    Delete
                </Menu.Item>
            </Menu>
        </td>
        <DeleteConfirmationModal
            opened={deleteDialogOpened}
            onConfirmClicked={onUserDeleteClicked}
            onCancelClicked={() => setDeleteDialogOpened(false)}
            name="User"
        />
    </tr>
  )
}

export default UserRow

import { Menu } from "@mantine/core";
import {MdEditNote, MdOutlineDeleteSweep, MdOutlineCancel, MdLockOutline} from "react-icons/md";
import { useState } from "react";
import DeleteConfirmationModal from "../../Shared/DeleteConfirmationModal";
import { Inertia } from "@inertiajs/inertia";
import BlockConfirmationModal from "../../Shared/BlockConfirmationModal";
const UserRow = ({user,index}) => {
    const [deleteDialogOpened, setDeleteDialogOpened]= useState(false);
    const [blockDialogOpened, setBlockDialogOpened]= useState(false);

    const onUserDeleteClicked = ()=>{
        setDeleteDialogOpened(false);
        Inertia.delete(route('users.destroy', user.id));
    }

    const onUserBlockClicked = ()=>{
        setBlockDialogOpened(false);
        Inertia.post(route('users.block', user.id));
    }

    const onUserUnBlockClicked = ()=>{
        Inertia.post(route('users.unblock', user.id));
    }

    const onEditMenuClicked =()=>{
        Inertia.get(route('users.edit',user.id));
    }

  return (
    <tr className={`hover:bg-gray-100 focus-within:bg-gray-100 ${!user.status ? 'text-gray-700':''}`}>
        <td className='border-t py-2 px-2'>
            {index+1}
        </td>
        <td>
            {user.image_url &&
                <img src={user.image_url}
                    width="100px"
                    height="100px"
                    style={{objectFit:'cover', borderRadius:"50%"}}  alt="User Profile" />}
        </td>
        <td className='border-t py-2 px-2'>
            {user.name}  {!user.status ? '(Blocked)':''}
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
                {user.status ?
                    <Menu.Item icon={<MdOutlineCancel />}  onClick={()=>setBlockDialogOpened(true)}>
                        Block User
                    </Menu.Item>
                    :
                    <Menu.Item icon={<MdOutlineCancel />}  onClick={onUserUnBlockClicked}>
                        Unblock User
                    </Menu.Item>
                }


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
        <BlockConfirmationModal
            opened={blockDialogOpened}
            onConfirmClicked={onUserBlockClicked}
            onCancelClicked={() => setBlockDialogOpened(false)}
        />
    </tr>
  )
}

export default UserRow

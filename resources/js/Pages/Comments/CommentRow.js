import { Link } from "@inertiajs/inertia-react";
import moment from "moment";
import { Menu } from "@mantine/core";
import {MdDelete,  MdOutlineCancel, MdMoreHoriz} from "react-icons/md";
import DeleteConfirmationModal from "../../Shared/DeleteConfirmationModal";
import { Inertia } from "@inertiajs/inertia";
import { useState } from "react";

const CommentRow = ({comment}) => {
    const [deleteDialogOpened, setDeleteDialogOpened]= useState(false);

    const onCommentDeleteClicked = ()=>{
        setDeleteDialogOpened(false);
        Inertia.delete(route('comments.destroy', comment));
    }

  return (
    <tr>
        <td className="px-3 py-2 ">
            <div className="flex justify-between w-full">
                <div>
                    <h3 className="font-bold inline">{comment.user.name}</h3> commented:
                    <p>
                        {comment.message}
                    </p>
                    On <Link href={route('posts.show', comment.post)} className="text-indigo-500 font-bold">{comment.post.title}</Link>
                </div>
                <div className="text-right ">
                    <span style={{float:'right'}}>{moment(comment.created_at).format('MMM DD, YYYY hh:mm')}</span>

                    <div className="mt-6">
                        <Menu  control={<button className="bg-gray-200 rounded-lg py-1 px-1">Options <MdMoreHoriz className="inline" /></button>}>
                            <Menu.Item icon={<MdDelete />} onClick={() => setDeleteDialogOpened(true)}>Delete Comment</Menu.Item>
                            <Menu.Item color="red" icon={<MdOutlineCancel />}>Block User</Menu.Item>
                        </Menu>
                    </div>
                </div>
            </div>

            <hr  className="mt-2"  />
        </td>
        <DeleteConfirmationModal
            opened={deleteDialogOpened}
            onConfirmClicked={onCommentDeleteClicked}
            onCancelClicked={() => setDeleteDialogOpened(false)}
            name="Comment"
        />
    </tr>
  )
}

export default CommentRow

import { Dialog } from "@mantine/core";

const DeleteConfirmationModal = (props) => {
  return (
    <Dialog
    opened={props.opened}
    withCloseButton
    onClose={props.onCancelClicked}
    size="lg"
    radius="md"
>
    Are You Sure You Wish To Delete This {props.name}? <br />
    This Cannot Be Undone
    <div className=" mt-2 ">
        <button
            onClick={props.onConfirmClicked}
            className="bg-red-600 text-white text-md py-2 px-4 rounded-md mr-3">
            Yes
        </button>
        <button
            className="bg-indigo-600 text-white text-md py-2 px-4 rounded-md"
            onClick={props.onCancelClicked}
        >
            Cancel
        </button>
    </div>
</Dialog>
  )
}

export default DeleteConfirmationModal

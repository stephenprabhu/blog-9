import { Dialog } from "@mantine/core";

const BlockConfirmationModal = (props) => {
  return (
    <Dialog
    opened={props.opened}
    withCloseButton
    onClose={props.onCancelClicked}
    size="lg"
    radius="md"
    >
        Are You Sure You Wish To Block This User? <br />
        <small>All thier existing comments will be hidden and they will not be able to post any further comments.
        You can revert this by unblocking the user.</small>
        <div className=" mt-2 ">
            <button
                onClick={props.onConfirmClicked}
                className="bg-red-600 text-white text-md py-2 px-4 rounded-md mr-3">
                Block
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

export default BlockConfirmationModal

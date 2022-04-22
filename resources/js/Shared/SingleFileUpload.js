import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
registerPlugin(FilePondPluginImagePreview);

const SingleFileUpload = (props) => {
  return (
    <FilePond
        {...props}
        onupdatefiles={(fileItems) => {
            props.onFileUpload(fileItems[0].file);
        }}
        storeAsFile={true}
        credits={{}}
        allowImagePreview={true}
    />
  )
}

export default SingleFileUpload

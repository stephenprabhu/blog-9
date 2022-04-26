import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
registerPlugin(FilePondPluginImagePreview);
import { useState } from 'react';

const SingleFileUpload = (props) => {

    const {imagePath, onFileUpload} = props;
    const [files, setFiles] = useState(imagePath ? [
         {
          source: imagePath,
          options: { type: "local" }
        }
      ]: null);

  return (
    <FilePond
        {...props}
        files={files}
        onupdatefiles={(fileItems) => {
            if(fileItems[0]){
                onFileUpload(fileItems[0].file);
                setFiles([fileItems[0].file]);
            }
        }}
        server={imagePath ? {
          load: (source, load, error, progress, abort, headers) => {
            var myRequest = new Request(source);
            fetch(myRequest).then(function(response) {
              response.blob().then(function(myBlob) {
                load(myBlob);
              });
            });
          }
        }:null}
        storeAsFile={true}
        credits={{}}
        allowImagePreview={true}
    />
  )
}

export default SingleFileUpload

/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Button from '/components/ui/button';
function Uploader({getSelectedFile}) {
    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        multiple: false,
        onDrop: (acceptedFiles) => {
           // let param = { coin: coin.code, address: coin.address};
            setFiles(acceptedFiles.map((file) => Object.assign(file, {
                preview: URL.createObjectURL(file),
            })));
            console.log('..cone',acceptedFiles )
            getSelectedFile && getSelectedFile(acceptedFiles);

        },
    });
    const thumbs = files.map((file) => (<div key={file.name} className="h-full w-full">
      <img src={file.preview} className="mx-auto max-h-full max-w-full object-contain" alt="uploaded image"/>
    </div>));
    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, [files]);
    console.log(files);
    return (<div className="rounded-lg border border-solid border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-light-dark sm:p-6">
      <div {...getRootProps({
        className: 'border border-dashed relative border-gray-200 dark:border-gray-700 h-48 flex items-center justify-center rounded-lg',
    })}>
        <input {...getInputProps()}/>
        {files.length > 0 ? (thumbs) : (<div className="text-center">
            <p className="mb-6 text-sm tracking-tighter text-gray-600 dark:text-gray-400">
              PNG, GIF, JPG...
            </p>
            <Button>CHOOSE FILE</Button>
          </div>)}
      </div>
    </div>);
}
export default Uploader;


// /* eslint-disable @next/next/no-img-element */
// import React, { useEffect, useState } from 'react';
// import { useDropzone } from 'react-dropzone';
// import Button from '/components/ui/button';
// function Uploader({getSelectedFile}) {
//     const [files, setFiles] = useState([]);
//     // const [profileImage, setProfileImage] = useState([]);

//     const { getRootProps, getInputProps } = useDropzone({
//         accept: 'image/*',
//         multiple: false,
//         onDrop: (acceptedFiles) => {
//            // let param = { coin: coin.code, address: coin.address};
//             setFiles(acceptedFiles.map((file) => Object.assign(file, {
//                 preview: URL.createObjectURL(file),
//             })));
//             console.log('..conel',acceptedFiles )
//           //  getSelectedFile && getSelectedFile(acceptedFiles);

//         },
//     });
//     const thumbs = files.map((file) => (<div key={file.name} className="h-full w-full">
//       <img src={file.preview} className="mx-auto max-h-full max-w-full object-contain" alt="uploaded image"/>
//     </div>));
//     useEffect(() => {
//         // Make sure to revoke the data uris to avoid memory leaks
//         files.forEach((file) => URL.revokeObjectURL(file.preview));
//     }, [files]);
//     console.log(files);
//     return (<div className="rounded-lg border border-solid border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-light-dark sm:p-6">
//       <div 
//     //   {...getRootProps({
//     //     className: 'border border-dashed relative border-gray-200 dark:border-gray-700 h-48 flex items-center justify-center rounded-lg',
//     // })}
    
//     >
//         <input 
//         // {...getInputProps()}
//         onChange={e =>{
//           console.log(e.target.files, "selected files")
//           getSelectedFile && getSelectedFile(e.target.files)
//           }}
//         />
//         {files.length > 0 ? (thumbs) : (<div className="text-center">
//             <p className="mb-6 text-sm tracking-tighter text-gray-600 dark:text-gray-400">
//               PNG, GIF, JPG...
//             </p>
//             <Button>CHOOSE FILE</Button>
//           </div>)}
//       </div>
//     </div>);
// }
// export default Uploader;

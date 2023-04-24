/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Button from '/components/ui/button';
import { ArrowUp } from '/components/icons/arrow-up';
import { DotsIcon } from '/components/icons/dots-icon';

function Uploader({getSelectedFile, uploadedImageUrl}) { 
    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/jpeg, image/png',
        multiple: false,
        onDrop: (acceptedFiles) => {
            setFiles(acceptedFiles.map((file) => Object.assign(file, {
                preview: URL.createObjectURL(file),
            })));
            console.log('..cone',acceptedFiles )
            getSelectedFile && getSelectedFile(acceptedFiles);

        }, 
    });
    const thumbs = files.map((file) => (
     
      <div key={file.name} >
           <img className="relative w-1/2 h-auto mx-auto p-1 rounded-lg ring-2 ring-gray-300 dark:ring-gray-500" 
        // src = {`/api/imagefetcher?url=${encodeURIComponent(
        //   currentUser?.vendorsImageUrl
        // )}`}
        onLoad={() => { URL.revokeObjectURL(file.preview) }}
        src = {file.preview}
        alt="user image avatar"
        />
                      {/* <img src={file.preview} className=" object-contain" alt="uploaded image" onLoad={() => { URL.revokeObjectURL(file.preview) }}/> */}
                        </div>
    
    ));
    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks
        files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, []);
    return (
    
      <div {...getRootProps({})}>
        <input {...getInputProps()} 
        />
        {files.length > 0 ? (thumbs) : (
            <div>
              {uploadedImageUrl?.length >0 ? (
                  <div>
                    {/* <div className="relative h-36 w-full overflow-hidden rounded-lg sm:h-44 md:h-64 xl:h-80 2xl:h-96 3xl:h-[448px]"> */}
           <img className="relative w-1/2 h-auto mx-auto p-1 rounded-lg ring-2 ring-gray-300 dark:ring-gray-500" 
                  src = {uploadedImageUrl}
                  alt="user image avatar"
                  />
                  </div>

              ):(
                <div>
                        <Button>
                      Upload
                        </Button>
                </div>

                      
              )}
           
            </div>
          )}
      </div>
    // </div>
    
    );
}
export default Uploader;


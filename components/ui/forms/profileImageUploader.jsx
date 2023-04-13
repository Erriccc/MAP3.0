/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Button from '/components/ui/button';
import { ArrowUp } from '/components/icons/arrow-up';
import { DotsIcon } from '/components/icons/dots-icon';
import Image from '/components/ui/image';

function Uploader({getSelectedFile, uploadedImageUrl}) { 
    const [files, setFiles] = useState([]);
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
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
    

      <div key={file.name} className="relative h-36 w-full overflow-hidden rounded-lg sm:h-44 md:h-64 xl:h-80 2xl:h-96 3xl:h-[448px]">

        {/* <div key={file.name} className="relative mx-auto -mt-12 h-100 w-100 shrink-0 overflow-hidden rounded-full border-[5px] border-white shadow-large dark:border-gray-500 sm:-mt-14 sm:h-28 sm:w-28 md:mx-0 md:-mt-16 md:h-32 md:w-32 xl:mx-0 3xl:-mt-20 3xl:h-40 3xl:w-40 3xl:border-8">  */}
                            <Image 
                          src = {file.preview }
                          layout="fill" objectFit="contain" className=" object-contain" alt="uploaded image"
                          onLoad={() => {
                            // handleImageLoad(e);
                            URL.revokeObjectURL(file.preview)
                          }}
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
        // onChange={(e) => setFiles(e.target.value)}
        // onChange={}
        />
        {files.length > 0 ? (thumbs) : (
            <div>
              {uploadedImageUrl?.length >0 ? (
                  <div>
                    <div className="relative h-36 w-full overflow-hidden rounded-lg sm:h-44 md:h-64 xl:h-80 2xl:h-96 3xl:h-[448px]">
                    {/* <div className="relative mx-auto -mt-12 h-100 w-100 shrink-0 overflow-hidden rounded-full border-[5px] border-white shadow-large dark:border-gray-500 sm:-mt-14 sm:h-28 sm:w-28 md:mx-0 md:-mt-16 md:h-32 md:w-32 xl:mx-0 3xl:-mt-20 3xl:h-40 3xl:w-40 3xl:border-8"> */}
                          <Image 
                          src = {`/api/imagefetcher?url=${encodeURIComponent(
                            uploadedImageUrl
                          )}`}
                          layout="fill" 
                          objectFit="contain" 
                          className="rounded-full" alt="uploaded image"/>
                        </div>

                  </div>

              ):(
                <div>
                        <Button>
                      {/* <DotsIcon/> */}
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


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
     
      // <div key={file.name} className="relative h-36 w-full overflow-hidden rounded-lg sm:h-44 md:h-64 xl:h-80 2xl:h-96 3xl:h-[448px]">
      // {/* <Image 
      // src = {`/api/imagefetcher?url=${encodeURIComponent(
      //   currentUser?.vendorsImageUrl && currentUser.vendorsImageUrl
      // )}`}

      // layout="fill" objectFit="cover" alt="Cover Image"/> */}
      //         <div className="bg-cover bg-center" 
      //     // style="background-image: url(...)"
      //     style={{ backgroundImage:`url(${file.preview })`,
      //     width: '100%',
      //     height: '100%',
      //   }}
      //     ></div>
      <div key={file.name} >

        {/* <div key={file.name} className="relative mx-auto -mt-12 h-100 w-100 shrink-0 overflow-hidden rounded-full border-[5px] border-white shadow-large dark:border-gray-500 sm:-mt-14 sm:h-28 sm:w-28 md:mx-0 md:-mt-16 md:h-32 md:w-32 xl:mx-0 3xl:-mt-20 3xl:h-40 3xl:w-40 3xl:border-8">  */}
                            {/* <Image 
                          src = {file.preview }
                          layout="fill" objectFit="contain" className=" object-contain" alt="uploaded image"
                          onLoad={() => {
                            // handleImageLoad(e);
                            URL.revokeObjectURL(file.preview)
                          }}
                          /> */}

       {/* <div className="bg-cover bg-center" 
          // style="background-image: url(...)"
          style={{ backgroundImage:`url(${file.preview })`,
          width: '100%',
          height: '100%',
        }}
          ></div> */}

           <img className="relative w-1/2 h-auto mx-auto p-1 rounded-lg ring-2 ring-gray-300 dark:ring-gray-500" 
        // src = {`/api/imagefetcher?url=${encodeURIComponent(
        //   currentUser?.vendorsImageUrl
        // )}`}
        onLoad={() => { URL.revokeObjectURL(file.preview) }}
        src = {file.preview}
        alt="Bordered avatar"
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
                    {/* <div className="relative h-36 w-full overflow-hidden rounded-lg sm:h-44 md:h-64 xl:h-80 2xl:h-96 3xl:h-[448px]"> */}
                    {/* <div className="relative mx-auto -mt-12 h-100 w-100 shrink-0 overflow-hidden rounded-full border-[5px] border-white shadow-large dark:border-gray-500 sm:-mt-14 sm:h-28 sm:w-28 md:mx-0 md:-mt-16 md:h-32 md:w-32 xl:mx-0 3xl:-mt-20 3xl:h-40 3xl:w-40 3xl:border-8"> */}
                          {/* <Image 
                          src = {`/api/imagefetcher?url=${encodeURIComponent(
                            uploadedImageUrl
                          )}`}
                          layout="fill" 
                          objectFit="contain" 
                          className="rounded-full" alt="uploaded image"/> */}
           <img className="relative w-1/2 h-auto p-1 rounded-lg ring-2 ring-gray-300 dark:ring-gray-500" 

        // src = {`/api/imagefetcher?url=${encodeURIComponent(
        //   currentUser?.vendorsImageUrl
        // )}`}
        src = {uploadedImageUrl}
        alt="Bordered avatar"
        />
                        {/* </div> */}

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


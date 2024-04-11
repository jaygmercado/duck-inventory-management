import React, { useState } from 'react';
import Image from 'next/image';
import { useEditState } from '.';
import notify from '@/utils/notify';
import CodeSpace from '../../../public/codespace_logo.png';

interface CoverPhotoProps {
  coverPhoto: string;
  // eslint-disable-next-line no-unused-vars
  onSubmit?: (newPhoto: string | ArrayBuffer) => Promise<void>;
}
const CoverPhoto: React.FC<CoverPhotoProps> = ({ coverPhoto, onSubmit }) => {
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [imageData, setImageData] = useState<string | ArrayBuffer | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { editProgress, setEditProgress } = useEditState();

  const processImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const acceptedFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const reader = new FileReader();
    const imageFile = e.target.files;

    if (!imageFile) return;
    if (!acceptedFileTypes.includes(imageFile[0]['type'])) {
      e.target.value = '';
      return notify('Error', 'Unsupported File type, jpg/jpeg/png only');
    }
    if (imageFile[0].size > 5000000) {
      e.target.value = '';
      return notify('Error', 'file larger than 5MB');
    }

    reader.readAsDataURL(imageFile[0]);
    reader.onload = () => setImageData(reader.result);
    reader.onerror = () => notify('Error', 'failed to process image');
  };

  const cancelUploadHandler = () => {
    setShowImageUpload(false);
    setImageData(null);
    setEditProgress && setEditProgress(false);
  };

  const uploadHandler = () => {
    setSubmitting(true);
    imageData &&
      onSubmit &&
      onSubmit(imageData)
        .then(() => {
          setImageData(null);
          setShowImageUpload(false);
          setSubmitting(false);
        })
        .catch(() => {
          setImageData(null);
          notify('Error', 'failed to upload image');
        });
  };

  return (
    <div className='relative h-52 w-full overflow-hidden'>
      {showImageUpload && (
        <div className='flex justify-center items-center z-50 absolute top-0 bottom-0 left-0 right-0 bg-gray-200'>
          {imageData === null || imageData === '' ? (
            <>
              <input
                type='file'
                onChange={processImage}
                accept='image/png, image/jpg, image/jpeg'
              />
              <button
                type='button'
                onClick={cancelUploadHandler}
                className='bg-red-500 hover:bg-red-400 text-white px-5 py-3 rounded'
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                type='button'
                disabled={submitting}
                onClick={uploadHandler}
                className='disabled:bg-green-200 relative z-50 px-5 py-3 rounded text-white shadow-lg bg-green-500 hover:bg-green-400 mr-5'
              >
                Upload
              </button>
              <button
                type='button'
                disabled={submitting}
                onClick={cancelUploadHandler}
                className='disabled:bg-red-200 bg-red-500 z-50 hover:bg-red-400 text-white px-5 py-3 rounded'
              >
                Cancel
              </button>
              <Image
                fill
                objectFit='cover'
                className='h-full w-full object-cover'
                src={(imageData as string) || ''}
                alt='placeholder-img'
              />
            </>
          )}
        </div>
      )}
      <Image
        fill
        objectFit='cover'
        className='h-full w-full object-cover'
        src={!coverPhoto || coverPhoto === '' ? CodeSpace : coverPhoto}
        alt='Cover Photo'
      />
      <button
        type='button'
        disabled={editProgress}
        onClick={() => {
          setShowImageUpload(true);
          setEditProgress && setEditProgress(true);
        }}
        className='disabled:hidden absolute z-20 rounded right-3 bottom-3 text-[0.65em] p-2 bg-gray-300 text-gray-600 hover:bg-gray-200 hover:shadow-lg'
      >
        <svg className='w-4 aspect-square' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
          <path d='M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z' />
        </svg>
      </button>
    </div>
  );
};

export default CoverPhoto;

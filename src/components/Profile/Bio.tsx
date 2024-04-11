'use client';
import React, { useEffect, useRef, useState } from 'react'
import EditBtn from './EditBtn'
import { useFormik } from 'formik';

interface BioProps {
  bio: string;
  // eslint-disable-next-line no-unused-vars
  onEdit?: (newInfo: string) => Promise<void>;
}
const Bio: React.FC<BioProps> = ({ bio, onEdit }) => {
  const [editMode, setEditMode] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (editMode) textAreaRef.current?.focus();
  }, [editMode])

  const {
    getFieldProps,
    handleSubmit,
    resetForm,
    dirty,
    isValid,
    values
  } = useFormik({
    enableReinitialize: true,
    initialValues: { bio },
    onSubmit: (values, { resetForm }) => {
      setEditMode(false);
      onEdit && onEdit(values.bio).catch(() => {
        resetForm();
      });
    }
  });

  return (
    <section>
      <div className='flex space-x-5 items-center mb-4'>
        <h2 className='text-gray-400 text-sm'>Biography</h2>
        <EditBtn
          inEdit={editMode}
          isValid={isValid && dirty}
          toggleEdit={setEditMode}
          onEditAccept={handleSubmit}
          onEditCancel={resetForm} />
      </div>
      {editMode ?
        <textarea ref={textAreaRef} placeholder='Enter your bio here' className='w-full p-2' rows={8} {...getFieldProps('bio')} /> :
        <p className='text-sm'>
          {values.bio}
        </p>
      }
    </section>
  )
}

export default Bio
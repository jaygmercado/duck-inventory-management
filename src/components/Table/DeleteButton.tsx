import React, { useState } from 'react'

interface DeleteButtonProps {
  onDelete: () => void;
}
const DeleteButton: React.FC<DeleteButtonProps> = ({ onDelete }) => {
  const [deleting, setDeleting] = useState(false);
  return (
    <button
      onClick={() => {
        setDeleting(true);
        onDelete();
      }}
      disabled={deleting}
      className="text-blue-500 hover:text-blue-700 disabled:hover:cursor-not-allowed disabled:text-blue-200">
      Delete
    </button>
  )
}

export default DeleteButton
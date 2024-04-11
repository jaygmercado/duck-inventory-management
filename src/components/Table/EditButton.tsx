import Link from 'next/link';
import React from 'react'

interface EditButtonProps {
  updateLink: string;
}
const EditButton: React.FC<EditButtonProps> = ({ updateLink }) => (
  <Link
    href={updateLink}
    className="text-blue-500 hover:text-blue-700 disabled:hover:cursor-not-allowed disabled:text-blue-200">
    Edit
  </Link>
)

export default EditButton
import { useEditState } from '.';

interface EditBtnProps {
  isValid: boolean;
  className?: string;
  inEdit: boolean;
  toggleEdit?: React.Dispatch<React.SetStateAction<boolean>>;
  onEditAccept?: () => void;
  onEditCancel?: () => void;
}
const EditBtn: React.FC<EditBtnProps> = ({ isValid, inEdit, onEditAccept, toggleEdit, onEditCancel, className }) => {
  const { editProgress, setEditProgress } = useEditState();
  const onEditHandler = () => {
    if (toggleEdit) toggleEdit(false);
    if (onEditAccept) onEditAccept();
  }

  const onCancelHandler = () => {
    toggleEdit && toggleEdit(false);
    onEditCancel && onEditCancel();
    setEditProgress && setEditProgress(false);
  }

  const startEditHandler = () => {
    toggleEdit && toggleEdit(true);
    setEditProgress && setEditProgress(true);
  }

  if (inEdit) return (
    <div className="flex space-x-2">
      <button type='button' className="rounded bg-green-400 fill-white disabled:bg-green-200 p-0.5 aspect-square" onClick={onEditHandler} disabled={!isValid}>
        <svg className='w-4 aspect-square' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
      </button>
      <button type='button' className="rounded bg-red-400 fill-white p-0.5" onClick={onCancelHandler}>
        <svg className='w-4 aspect-square' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" /></svg>
      </button>
    </div>
  );
  return (
    <button type='button' disabled={editProgress} onClick={startEditHandler} className={`fill-gray-400 hover:fill-gray-600 disabled:hidden ${className}`}>
      <svg className='w-4 aspect-square' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" /></svg>
    </button>
  );
}

export default EditBtn;
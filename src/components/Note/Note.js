import { TiDeleteOutline } from 'react-icons/ti';
import { MdEdit } from 'react-icons/md';
import { FaRegSave } from 'react-icons/fa';
import { useState } from 'react';
import {Modal, Button} from 'react-bootstrap';
import Tag from '../Tag/Tag';
import './Note.scss';

function Note({id, deleteNote, deleteTag, text, tags, changeText, addTag, addNewTag}) {
  const [editMode, setEditMode] = useState(false);
  const [editValue, setEditValue] = useState(text);
  const [show, setShow] = useState(false);
  const [newTag, setNewTag] = useState('');

  const handleClose = () => {
    if (newTag.trim()) {
      addNewTag(newTag.trim(), id);
    }
    setNewTag('');
    setShow(false);};

    const handleCloseA = () => {
      setNewTag('');
      setShow(false);};

  const handleShow = () => setShow(true);

  const changeMode = (e) => {
    setEditMode(true);
  };

  const save = (e) => {
    let tagsArray = editValue.match(/#\S+/gi);
    if (tagsArray) {
      addTag(tagsArray.map(tag => tag.slice(1)), id);
    }
    setEditMode(false);
    changeText(id, editValue);
  };

  const changeEditValue = ({target:{value}}) => {
    setEditValue(value);
  };

  return (
    <>
    <div className="note-wrapper">
     <div className="icons-wrapper">
     {editMode && <FaRegSave className="icon" onClick={save} size={20}/>}
      {!editMode && <MdEdit className="icon" onClick={changeMode} size={20} />}
      <TiDeleteOutline className="icon" onClick={() => {deleteNote(id);}} size={20} />
     </div>
     {editMode && <textarea autoFocus className="edit mb-3" type="text" value={editValue} onChange={changeEditValue} />} 
     {!editMode && <div className="mb-3">{text}</div>}
     <div className="tags-wrapper">
     {tags && tags.map((tag, index) =>
  <Tag key={index} id={id} tagname={tag} deleteTag={deleteTag} />)}
  <div className="addtag" onClick={handleShow}>+</div>
     </div>
    </div>
    <Modal show={show} onHide={handleCloseA}>
        <Modal.Header closeButton>
          <Modal.Title>Добавление тега</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" value={newTag} onChange={e => setNewTag(e.target.value)} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseA}>
            Закрыть
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Сохранить тег
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Note;

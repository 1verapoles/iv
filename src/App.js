import noteData from './data.json';
import { Container, Row, Form, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Note from './components/Note/Note';
import './App.css';

function App() {
  const [notes, setNotes] = useState(noteData);
  const [currentNote, setCurrentNote] = useState("");
  const [filter, setFilter] = useState("");

  const deleteTag = (id, tagname) => {
    setNotes(prevNotes => {return prevNotes.map(el => {if (el.id === id) {return {...el, tags: el.tags.filter(tag => tag !== tagname)};} else {return el;}})});
  };

  const addTag = (tagsArray, id) => {
    let changedNoteTags = notes.find(note => note.id === id).tags;
    let newTags = tagsArray.filter(tag => !changedNoteTags.includes(tag));
    if (newTags.length) {
    setNotes(prevNotes => {return prevNotes.map(el => {if (el.id === id) {return {...el, tags: [...el.tags, ...newTags]};} else {return el;}})});
    }
  };

  const addNewTag = (newTag, id) => {
    setNotes(prevNotes => {return prevNotes.map(el => {if (el.id === id) {return {...el, tags: [...el.tags, newTag]};} else {return el;}})});
     };

  const changeText = (id, editValue) => {
    setNotes(prevNotes => {return prevNotes.map(el => {if (el.id === id) {return {...el, text: editValue};} else {return el;}})});
  };

  const deleteNote = (id) => {
    setNotes(prevNotes => {return prevNotes.filter(note => note.id !== id)});
  };

  const changeCurrentNote = (e) => {
    setCurrentNote(e.target.value);   
  };
  
  const addNote = () => {
    if (currentNote) {
      setNotes(prevNotes => {return [...prevNotes, {id: uuidv4(), text: currentNote, tags: []}];});
      setCurrentNote("");
    }    
  };

  const changeFilter = (e) => {
    setFilter(e.target.value);   
  };
  
  const clearFilter = () => {
    if (filter) {
      setFilter("");
    }    
  };

  return (
    <Container>
  <Row>
  <div className="mb-5 mt-3 d-flex">
    <Form.Control
      as="textarea"
      placeholder="Введите текст заметки"
      value={currentNote}
      onChange={changeCurrentNote}
      style={{ height: '100px' }}
    />
    <Button variant="primary" onClick={addNote}>Сохранить</Button>
    </div>
  </Row>
  <Row>
  <div className="mb-5 d-flex">
    <Form.Control
      type="text"
      value={filter}
      onChange={changeFilter}
      placeholder="Искать заметку по тегу"
    />
    <Button variant="primary" onClick={clearFilter}>Очистить фильтр</Button>
    </div>
  </Row>
  <div className="notes-wrapper">
   {!filter && notes && notes.map(note =>
  <Note key={note.id} {...note}  deleteTag={deleteTag} deleteNote={deleteNote} changeText={changeText} addTag={addTag} addNewTag={addNewTag} />)}
   {filter && notes && notes.filter(note => note.tags.some(tag => tag.includes(filter))).map(note =>
  <Note key={note.id} {...note}  deleteTag={deleteTag} changeText={changeText} deleteNote={deleteNote} addTag={addTag} addNewTag={addNewTag} />)}
  </div>
</Container>
  );
}

export default App;

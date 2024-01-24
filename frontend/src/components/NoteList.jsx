import React from 'react';
import { Card, CardBody, CardTitle, CardText, Button, Col, Row } from 'reactstrap';
import { LiaThumbtackSolid } from 'react-icons/lia';
import { FaThumbtack } from 'react-icons/fa';
import { MdEdit, MdDelete } from 'react-icons/md';

const NoteCard = ({ note, onEdit, onPin, onDelete }) => {

  return (
    <Col md={4} className="mb-4">
      <Card className={`note ${note.pinned ? 'pinned-note' : ''}`}>
        <CardBody>
          <div className='note-pin'>
            <CardTitle tag="h5">{note.title}</CardTitle>
            <Button color="link" onClick={() => onPin(note)}>
              {note.pinned ? <FaThumbtack size={20} /> : <LiaThumbtackSolid size={20} />}
            </Button>
          </div>
          <CardText>{note.tagline}</CardText>

          <CardText className="mt-2">{note.body}</CardText>
          <div className='icon-container'>
            <Button color="link" onClick={() => onEdit(note)}>
              <MdEdit size={20} />
            </Button>
            <Button color="link" onClick={() => onDelete(note._id)}>
              <MdDelete size={20} />
            </Button>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

const NoteList = ({ notes, onEdit, onPin, onDelete }) => {
  return (
    <Row>
      {notes.map((note) => (
        <NoteCard key={note._id} note={note} onEdit={onEdit} onPin={onPin} onDelete={onDelete} />
      ))}
    </Row>
  );
};

export default NoteList;

import React, { useState, useEffect, useRef } from 'react';
import { Container, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';
import NoteList from '../components/NoteList';
import { CiClock2 } from "react-icons/ci";
import { VscCollapseAll } from "react-icons/vsc";
import { CiCirclePlus } from "react-icons/ci";
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const Home = () => {
  const [notes, setNotes] = useState([]);
  const [editNote, setEditNote] = useState(null);
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    body: '',
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [message, setMessage] = useState(null);
  const [addNote, setAddNote] = useState(false);

  useEffect(() => {
    // Fetch notes from the mock API (JSONPlaceholder)
    axios.get(`https://wazirone-assignment-fph1zh97h-safwannazir911s-projects.vercel.app/api/notes`)
      .then(response => {
        setNotes(response.data);
      })
      .catch(error => {
        console.error('Error fetching notes:', error);
      });
  }, [currentPage, notes]);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleEdit = (note) => {
    setEditNote(note);
    setFormData({
      title: note.title,
      tagline: note.tagline,
      body: note.body,
    });
    setModal(true);
  };

  const handleModalToggle = () => {
    setEditNote(null);
    setFormData({
      title: '',
      tagline: '',
      body: '',
    });
    setModal(!modal);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveChanges = () => {
    // Handle save changes (Edit or Add) here
    if (editNote) {
      // Implement update/edit functionality
      axios.put(`https://wazirone-assignment-fph1zh97h-safwannazir911s-projects.vercel.app/api/notes/${editNote._id}`, formData)
        .then(() => {
          // Reset state and close the modal
          handleModalToggle();
          // Set success message
          setMessage('Note saved successfully!');
        })
        .catch((error) => {
          // Handle error
          console.error('Error updating note:', error);
          // Set error message
          setMessage('Failed to update note. Please try again.');
        }).finally(
          () => {
            setTimeout(() => setMessage(null), 6000);
          }
        );
    } else {
      // Implement add functionality
      axios.post('https://wazirone-assignment-fph1zh97h-safwannazir911s-projects.vercel.app/api/notes', formData)
        .then(() => {
          // Reset state and close the modal
          // Set success message
          setMessage('Note added successfully!');
        })
        .catch((error) => {
          // Handle error
          console.error('Error adding note:', error);
          // Set error message
          setMessage('Failed to add note. Please try again.');
        }).finally(
          () => {
            setTimeout(() => setMessage(null), 6000);
          }
        );
    }
  };

  const handlePin = (note) => {
    // Toggle the pinned status of the note
    axios.put(`https://wazirone-assignment-fph1zh97h-safwannazir911s-projects.vercel.app/api/notes/${note._id}`, {
      pinned: !note.pinned,
    })
      .then(response => {
        console.log('Note pinned status updated successfully:', response.data);
      })
      .catch(error => {
        console.error('Error updating pinned status:', error);
      });
  };

  const handleDelete = (noteId) => {
    // Implement delete functionality
    axios.delete(`https://wazirone-assignment-fph1zh97h-safwannazir911s-projects.vercel.app/api/notes/${noteId}`)
      .then(() => {

      })
      .catch(error => {
        console.error('Error deleting note:', error);
      });
  };

  const getCurrentTime12HourFormat = () => {
    const now = new Date();
    let hours = now.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    hours = hours % 12 || 12;

    const formattedHours = hours.toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');

    return `${formattedHours}:${minutes} ${ampm}`;
  };

  const itemsPerPage = 6;
  const pageCount = Math.ceil(notes.length / itemsPerPage);
  const startOffset = currentPage * itemsPerPage;
  const endOffset = startOffset + itemsPerPage;
  const currentNotes = notes.slice(startOffset, endOffset);


  const handleAddNote = () => {
    setAddNote(!addNote)
  }


  return (
    <Container className="mt-5">
      {/* New Note Form */}
      {addNote ? (
        <Form className="mb-3 border rounded bg-note">
          <FormGroup>
            <Label for="title">Title</Label>
            <Input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="tagline">Tagline</Label>
            <Input
              type="text"
              name="tagline"
              id="tagline"
              value={formData.tagline}
              onChange={handleInputChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="body">Body</Label>
            <Input
              type="textarea"
              name="body"
              id="body"
              value={formData.body}
              onChange={handleInputChange}
            />
          </FormGroup>
          <span className='time'>
            <CiClock2 size={24} />
            Today,
            {getCurrentTime12HourFormat()}
          </span>
          <div className='d-flex flex-row justify-content-between align-items-center'>
            <Button className='mt-4' color='dark' onClick={handleSaveChanges}>
              Save New Note
            </Button>
            <Button onClick={handleAddNote} color='link'>
              <VscCollapseAll size={24} />
            </Button>
          </div>


        </Form>
      ) :
        <div className='m-4'>
          <div className='d-flex flex-row justify-content-between align-items-center'>
            <Input
              type="textarea"
              onClick={handleAddNote}
              placeholder='Take a note...'
            />
            <Button onClick={handleAddNote} color='link'>
              <CiCirclePlus size={44} />
            </Button>

          </div>
        </div>

      }



      {message && (
        <p className={message.includes('successfully') ? 'text-success' : 'text-danger'}>
          {message}
        </p>
      )}
      {/* Note List */}
      <NoteList
        notes={currentNotes}
        onEdit={handleEdit}
        onPin={handlePin}
        onDelete={handleDelete}
      />

      {/* Pagination */}
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageChange}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="Previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        activeClassName="active"
        pageClassName="page"
        breakClassName="break"
      />

      {/* Edit Note Modal */}
      <Modal isOpen={modal} toggle={handleModalToggle}>
        <ModalHeader toggle={handleModalToggle}>
          {editNote ? 'Edit Note' : 'Add Note'}
        </ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="tagline">Tagline</Label>
              <Input
                type="text"
                name="tagline"
                id="tagline"
                value={formData.tagline}
                onChange={handleInputChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="body">Body</Label>
              <Input
                type="textarea"
                name="body"
                id="body"
                value={formData.body}
                onChange={handleInputChange}
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={handleModalToggle}>
            Cancel
          </Button>
          <Button color="dark" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </ModalFooter>
        {/* Display success or error message */}
      </Modal>
    </Container>
  );
};

export default Home;

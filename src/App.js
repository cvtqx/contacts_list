import React, { useState } from 'react';
import './app.css';
import data from './mock-data.json';
import { nanoid } from 'nanoid';
import { ReadOnlyRow } from './components/ReadOnlyRow';
import { EditableRow } from './components/EditableRow';


const App = () => {
  const [contacts, setContacts] = useState(data);
  const [addFormData, setAddFormData] = useState({
    fullName: '',
    address: '',
    phoneNumber: '',
    email: ''
  });

  const [editFormData, setEditFormData] = useState({
    fullName: '',
    address: '',
    phoneNumber: '',
    email: ''
  });

  const [editContactId, setEditContactId] = useState(null)

  const handleAddFormChange = (event) => {
    event.preventDefault();
    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };//copying the object to prevent its mutation
    newFormData[fieldName] = fieldValue;
    setAddFormData(newFormData);
  }

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute('name');
    const fieldValue = event.target.value;

    const newFormData = {
      ...editFormData
    }
    newFormData[fieldName] = fieldValue;
    setEditFormData(newFormData);
  }

  const handleAddFormSubmit = (event) => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      fullName: addFormData.fullName,
      address: addFormData.address,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email
    }

    setContacts([...contacts, newContact]);
    setAddFormData({
      fullName: '',
      address: '',
      phoneNumber: '',
      email: '',
    });
  }

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      id: editContactId,
      fullName: editFormData.fullName,
      address: editFormData.address,
      phoneNumber: editFormData.phoneNumber,
      email: editFormData.email,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === editContactId);

    newContacts[index] = editedContact;
    setContacts(newContacts);
    setEditContactId(null);

  }

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.id);
    const formValues = {
      fullName: contact.fullName,
      address: contact.address,
      phoneNumber: contact.phoneNumber,
      email: contact.email
    }

    setEditFormData(formValues)
  }

  const handleCancelClick = () => {
    setEditContactId(null)
  }

  const handleDeleteButton = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex(contact => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  }

  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone number</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact) => (
              <>
                {editContactId === contact.id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteButton={handleDeleteButton}
                  />
                )}
              </>
            ))}
          </tbody>
        </table>
      </form>
      <h2>Add a contact</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="fullName"
          required
          placeholder="Enter a name"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="address"
          required
          placeholder="Enter an address"
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="phoneNumber"
          required
          placeholder="Enter a phone number"
          onChange={handleAddFormChange}
        />
        <input
          type="email"
          name="email"
          required
          placeholder="Enter an email"
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default App;

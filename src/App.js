import React, {useState} from 'react';
import data from "./mock-data.json"
import {nanoid} from 'nanoid';
import ReadOnlyRow from './components/ReadOnlyRow';
import EditableRow from './components/EditableRow';

function App() {

  const [contacts, setContacts] = useState(data);
  
  const initialFormState =
    {
    fullName: '',
    address: '',
    phoneNumber: '',
    email: '',
  };
  
  const [addFormData, setAddFormData] = useState({...initialFormState})

  const [editFormData, setEditFormData] = useState({
   fullName: "",
   address: "",
   phoneNumber: "",
   email: "",
 });

   const [editContactId, setEditContactId] = useState(null);

  const handleAddFromChange =(event) =>{
    event.preventDefault();
  
  const fieldName = event.target.getAttribute('name');
  const fieldValue = event.target.value;

  //console.log(fieldValue);

  const newFormData ={...addFormData};
  newFormData[fieldName] = fieldValue;

  setAddFormData(newFormData);
  }

  const handleEditFormChange =(event) =>{
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData ={...editFormData};
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  }

  const handleAddFormSubmit = (event)=>{
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      fullName: addFormData.fullName,
      address: addFormData.address,
      phoneNumber: addFormData.phoneNumber,
      email: addFormData.email
    }


    const newContacts =[
      ...contacts, newContact
    ];
    setContacts(newContacts);
    console.log("Form submitted", newContact)
    setAddFormData({...initialFormState}); //should clear teh form after submission but it doesn't
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
  }; 

  const handleEditClick = (event, contact) =>{
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      fullName: contact.fullName,
      address: contact.address,
      phoneNumber: contact.phoneNumber,
      email: contact.email,
    };

    setEditFormData(formValues); //prepopulates form fields with values of current contact that need to be edited
  }

  const handleCancelClick = ()=>{
    setEditContactId(null)
  }

  const handleDeleteButton = (id)=> {
    
    const newContacts = [...contacts];
    const index = contacts.findIndex((contact) =>contact.id === id);

    newContacts.splice(index, 1);

    setContacts(newContacts);
  }

  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table className="table table-success table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Phone Number</th>
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
      <h2> Add a contact</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="fullName"
          required="required"
          placeholder="Enter a full name..."
          onChange={handleAddFromChange}
          value={addFormData.fullName}
        />
        <input
          type="text"
          name="address"
          required="required"
          placeholder="Enter an address..."
          onChange={handleAddFromChange}
          value={addFormData.address}
        />
        <input
          type="text"
          name="phoneNumber"
          required="required"
          placeholder="Enter a phone number..."
          onChange={handleAddFromChange}
          value={addFormData.phoneNumber}
        />
        <input
          type="text"
          name="email"
          required="required"
          placeholder="Enter an email address..."
          onChange={handleAddFromChange}
          value={addFormData.email}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default App;

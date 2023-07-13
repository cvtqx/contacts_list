import React from 'react'

export const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteButton }) => {
  return (
    <tr>
      <td>{contact.fullName}</td>
      <td>{contact.address}</td>
      <td>{contact.phoneNumber}</td>
      <td>{contact.email}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteButton(contact.id)}>Delete</button>
      </td>
    </tr>
  );
};

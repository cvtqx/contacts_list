import React from 'react'

export const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <tr>
      <td>
        <input
          type="text"
          name="fullName"
          required
          placeholder="Enter a name"
          onChange={handleEditFormChange}
          value={editFormData.fullName}
        />
      </td>
      <td>
        <input
          type="text"
          name="address"
          required
          placeholder="Enter an address"
          onChange={handleEditFormChange}
          value={editFormData.address}
        />
      </td>
      <td>
        <input
          type="text"
          name="phoneNumber"
          required
          placeholder="Enter a phone number"
          onChange={handleEditFormChange}
          value={editFormData.phoneNumber}
        />
      </td>
      <td>
        <input
          type="email"
          name="email"
          required
          placeholder="Enter an email"
          onChange={handleEditFormChange}
          value={editFormData.email}
        />
      </td>
      <td>
        <button type="submit">Save</button>
        <button type="button" onClick={handleCancelClick}>
          Cancel
        </button>
      </td>
    </tr>
  );
};

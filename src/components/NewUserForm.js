import React, { useState } from 'react';
import '../css/NewUserForm.css'

const NewUserForm = (props) => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('Male');

  const formSubmitHandler = (e) => {
    e.preventDefault();
    props.getNewUser({
      firstName, lastName, gender
    });
    setFirstName('');
    setLastName('');
    setGender('Male');
  }

  return (
    <form
      className='new-user-form'
      onSubmit={formSubmitHandler}>
      <p>
        <label>First name </label>
        <input
          placeholder=' enter the first name'
          value={firstName}
          onChange={(e) => { setFirstName(e.target.value) }}
          required
        ></input>
      </p>
      <p>
        <label>Last name </label>
        <input
          placeholder=' enter the last name'
          value={lastName}
          onChange={(e) => { setLastName(e.target.value) }}
          required
        ></input>
      </p>
      <p>
        <label>Gender </label>
        <select
          value={gender}
          onChange={(e) => { setGender(e.target.value) }}
        >
          <option value='Female'>Female</option>
          <option value='Male'>Male</option>
          <option value='Divers'>Divers</option>
        </select>
      </p>
      <button type='submit'>Save</button>

    </form>
  )
}

export default NewUserForm;
import React, { useState } from 'react';
import '../css/NewUserForm.css'

const NewUserForm = (props) => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('Male');
  /** $$Explanation
  * the default value of first name is true, because at the first 
  * reload of the app,the styling of the input should be the same
  * like when the value is valid. Here we are checking only when 
  * we enter white spaces, w don't have to worry about when the 
  * doesn't enter any values, in that case the submit form won't work 
  * because of the attribute @required in the HTML element input
  */
  const [isFirstNameValid, setIsFirstNameValid] = useState(true);
  const [isLastNameValid, setIsLastNameValid] = useState(true);

  const formSubmitHandler = (e) => {
    //prevents the http request and the redirecting to the 'URL/?'
    e.preventDefault();
    //sends the entered values of the form as one object {firstName,lastName,gender} to App-Comp
    props.getNewUser({
      firstName, lastName, gender
    });
    //resets the form
    setFirstName('');
    setLastName('');
    setGender('Male');
  }

  return (
    <form
      className='new-user-form'
      onSubmit={formSubmitHandler}>
      <p className={`${isFirstNameValid ? '' : 'invalid'}`}>
        <label>First name </label>
        <input
          placeholder='enter the first name'
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
            /** $$Explanation
             * we check if the entered name is empty, if true the
             * @isFirstNameValid should be set to false, but if not
             * we need to set it to true, Why? simply because in I 
             * enter '     a' as soon as I entered the character 'a'
             * the value of the first name is now valid and we need
             * to rerender the comp with the valid styling.
             */
            if (e.target.value.trim().length === 0) {
              setIsFirstNameValid(false);
            } else setIsFirstNameValid(true);
          }}
          required
        ></input>
      </p>
      <p className={`${isLastNameValid ? '' : 'invalid'}`}>
        <label>Last name </label>
        <input
          placeholder='enter the last name'
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
            //need to check the validity of the last name entered with each keystroke
            if (e.target.value.trim().length === 0) {
              setIsLastNameValid(false);
            } else setIsLastNameValid(true);

          }}
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

    </form >
  )
}

export default NewUserForm;
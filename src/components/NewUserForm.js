import React, { useState } from 'react';
import '../css/NewUserForm.css';
import styled from 'styled-components';

const FormController = styled.p`
display: flex;
justify-content: center;
flex-direction: column;
margin: 11px;
& input {
  border-radius: 8px;
  border: none;
  margin-left: 10px;
  width: 150px;
  height: 20px;
  padding-left: 10px;
}

& label {
  font-size: 12px;
  padding-top: 10px;
  width: 150px;
  margin-left: 10px;
  margin-bottom: 5px;
  display: flex;
  color: ${props => (!props.isValid && 'rgb(220, 12, 12)')}
}
& input:focus{
  background-color: ${props => (!props.isValid && 'rgb(235, 149, 149)')} ;
}

& select {
  border-radius: 8px;
  border: none;
  margin-left: 10px;
  max-width: 75px;
  padding-left: 4px;
}

`;
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
      {/** $$Explanation
       * Here if we wanted to use a normal styling for the comp
       * <p className={`${isLastNameValid ? '' : 'invalid'}`}></p>
       * --- But here we want to use styled-component package
       * */}
      <FormController isValid={isFirstNameValid}>
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
      </FormController>

      <FormController isValid={isLastNameValid} >
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
      </FormController>
      <FormController isValid={true}>
        <label>Gender </label>
        <select
          value={gender}
          onChange={(e) => { setGender(e.target.value) }}
        >
          <option value='Female'>Female</option>
          <option value='Male'>Male</option>
          <option value='Divers'>Divers</option>
        </select>
      </FormController>
      <button type='submit'>Save</button>

    </form >
  )
}

export default NewUserForm;
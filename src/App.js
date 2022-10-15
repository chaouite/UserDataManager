import './App.css';
import UsersInfo from './components/UsersInfo';
import Card from './Wrapper/Card';
import users from './data/UsersData.json';
import NewUserForm from './components/NewUserForm';
import React, { useEffect, useState } from 'react';

const App = () => {

  const [updatedUsers, setUpdatedUsers] = useState(users);
  let filteredUsers = updatedUsers;
  let searchedUsers = updatedUsers;
  const [show, setShow] = useState(false);
  const [filterValue, setFilterValue] = useState('All');
  const [searchedUser, setSearchedUser] = useState('');

  const [isSearch, setIsSearch] = useState(false);

  /** Get the value that we want to use in the filter. */
  const filterTopHandler = (filterBy) => {
    setFilterValue(filterBy);
  }
  /** we don't need to store a new state for filtered users
   * because the main state is updatedUsers and if we filter we don't want to change this state 
   * we only want to render a part of this main state 
   * that fulfils a specific condition
   * --- we can put this code outside any function 
   * because we are not changing the main state here 
   * we are just affecting new value to our let filteredUsers--
   */
  if (filterValue !== 'All') {
    filteredUsers = updatedUsers.filter((user) => user.gender === filterValue);
  }

  /** getNewUser adds a new user to the main state = updatedUsers */
  const getNewUser = (newUser) => {
    setUpdatedUsers((prev) => {
      return (
        [...prev, newUser]
      );
    }
    );
  }

  const searchForHandler = (searchedName) => {
    setSearchedUser(searchedName);
    setIsSearch(true)
    console.log(searchedName);
  }

  /** --- we can put this code outside any function 
   * because we are not changing the main state here 
   * we are just affecting new value to our let searchedUsers-- */
  searchedUsers = updatedUsers.filter((user) =>
    user.firstName.toLowerCase().includes(searchedUser.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchedUser.toLowerCase())
  )

  /** toDelete will update the updatedUsers which is the main state
   */
  const toDelete = (firstName, lastName) => {
    console.log(firstName, lastName);
    setUpdatedUsers((prev) => {
      return prev.filter((user) => user.firstName !== firstName ||
        user.lastName !== lastName);
    })
  }

  useEffect(() => { console.log('updatedUsers', updatedUsers); }, [updatedUsers])
  useEffect(() => { console.log('filteredUsers', filteredUsers); }, [filteredUsers])
  useEffect(() => { console.log('searchedUsers', searchedUsers); }, [searchedUsers])

  return (
    <div className="App" >

      <Card>
        <button onClick={() => { setShow(!show) }}>
          {(show && 'Hide the form') || (!show && 'Add new user')}</button>
        {show
          &&
          <NewUserForm getNewUser={getNewUser}></NewUserForm>
        }
        <UsersInfo
          searchForHandler={searchForHandler}
          filterTopHandler={filterTopHandler}
          data={isSearch ? searchedUsers :
            filteredUsers
          }
          toDelete={toDelete} />

      </Card>
    </div >
  );
}

export default App;

import './App.css';
import UsersInfo from './components/UsersInfo';
import Card from './Wrapper/Card';
import users from './data/UsersData.json';
import NewUserForm from './components/NewUserForm';
import React, { useEffect, useState } from 'react';

const App = () => {

  const [updatedUsers, setUpdatedUsers] = useState(users);
  const [filteredUsers, setFilteredUsers] = useState(updatedUsers);
  const [searchedUsers, setSearchedUser] = useState(filteredUsers);
  const [show, setShow] = useState(false);
  const [filteredBy, setFilteredBy] = useState('All');

  const [isSearch, setIsSearch] = useState(false);

  const filterTopHandler = (filterBy) => {
    setFilteredBy(filterBy);
    setFilteredUsers(updatedUsers);
    if (filterBy !== 'All') {
      setFilteredUsers((prev) => {
        return prev.filter((user) => user.gender === filterBy);
      })
    }
  }
  const getNewUser = (newUser) => {
    setUpdatedUsers((prev) => {
      return (
        [...prev, newUser]
      );
    }
    );
    setFilteredUsers((prev) => {

      if (
        prev.length === 0 ||
        prev[0].gender === newUser.gender ||
        filteredBy === 'All') {
        return ([...prev, newUser]);
      };
      return prev;
    }
    );
  }

  const searchForHandler = (searchedName) => {
    setIsSearch(true);
    setSearchedUser(filteredUsers);
    console.log(searchedName);
    setSearchedUser((prev) => {
      return prev.filter((user) => {
        if (searchedName.length === 0) {
          setIsSearch(false);
          return filteredUsers;
        } return (
          user.firstName.toLowerCase().includes(searchedName.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchedName.toLowerCase()));
      }
      )
    });

  }

  const toDelete = (firstName, lastName) => {
    console.log(firstName, lastName);
    setUpdatedUsers((prev) => {
      return prev.filter((user) => user.firstName !== firstName ||
        user.lastName !== lastName);
    })

  }

  useEffect(() => {
    setFilteredUsers(updatedUsers);
  }, [updatedUsers]);
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
          data={isSearch ? searchedUsers : filteredUsers}
          toDelete={toDelete} />

      </Card>
    </div >
  );
}

export default App;

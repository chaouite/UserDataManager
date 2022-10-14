import './App.css';
import UsersInfo from './components/UsersInfo';
import Card from './Wrapper/Card';
import users from './data/UsersData.json';
import NewUserForm from './components/NewUserForm';
import React, { useEffect, useState } from 'react';

const App = () => {

  const [updatedUsers, setUpdatedUsers] = useState(users);
  const [filteredUsers, setFilteredUsers] = useState(updatedUsers);
  const [show, setShow] = useState(false);
  const [filteredBy, setFilteredBy] = useState('All');

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
  useEffect(() => { console.log(updatedUsers); }, [updatedUsers])
  useEffect(() => { console.log(filteredUsers); }, [filteredUsers])
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
          filterTopHandler={filterTopHandler}
          data={filteredUsers} />

      </Card>
    </div >
  );
}

export default App;

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
  //controls when to to show the form
  const [show, setShow] = useState(false);

  //value to be searched & value to filter with
  const [filterValue, setFilterValue] = useState('All');
  const [searchedUser, setSearchedUser] = useState('');

  //boolean value if searched input has been clicked
  const [isSearch, setIsSearch] = useState(false);


  /** getNewUser adds a new user (object) to the main state = updatedUsers = array of users */
  const getNewUser = (newUser) => {
    /**uses of prevState to update the state 'cuz setState is async = Batches the setState calls */
    setUpdatedUsers((prev) => {
      return (
        //makes a copy of the prev State Array and adds the new user to that array
        [...prev, newUser]
      );
    }
    );
  }

  //gets the value that we want to use in the filter
  const filterTopHandler = (filterBy) => {
    setFilterValue(filterBy);
  }
  /** $$Explanation
   * we don't need to store a new state for filtered users
   * because the main state is updatedUsers and if we filter we don't want to change this state 
   * we only want to render a part of this main state 
   * that fulfils a specific condition
   * --- we can put this code outside any function 
   * because we are not changing the main state here 
   * we are just affecting new value to our @filteredUsers --
   * if the filtered value is 'All' we render @updatedUsers --> look into the declaration of @filteredUsers
   * if the filtered value is not 'All' we filter it by gender
   */
  if (filterValue !== 'All') {
    filteredUsers = updatedUsers.filter((user) => user.gender === filterValue);
  }

  const searchForHandler = (searchedName) => {
    /**stores the value to be searched in @searchedUser */
    setSearchedUser(searchedName);
    //check if the search input has been used
    setIsSearch(true);
  }

  /** $$Explanation
   * we can put this code outside any function 
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
          /** $$Explanation
           * the users to be shown can differs in 3 ways:
           * 1-simply all the users that we have in our state @filteredUsers with 'All' as filter
           * 2-only the users that fulfill the filtered value @filteredUsers
           * 3-only the users that contain the searched value @searchedUsers
           * So mainly we have 2 options @filteredUsers either with 'All' value or with another 
           * and @searchedUsers 
           * To know when to show @searchedUsers we used @isSearch
           * when ever @isSearch is true we show the  @searchedUsers 
           *  */
          data={isSearch ? searchedUsers :
            filteredUsers
          }
          toDelete={toDelete} />

      </Card>
    </div >
  );
}

export default App;

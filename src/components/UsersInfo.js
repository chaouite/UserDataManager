import React from 'react'
import '../css/UsersInfo.css'
import UserSearch from './UserSearch';
import UsersFilter from './UsersFilter';
/* This FC displays the users  */
const UsersInfo = (props) => {

  /**retrieves the value to be used in the filter from UsersFilter-Comp 
   * and lifts it up to App-Comp */
  const filterHandler = (valOfFilter) => {
    props.filterTopHandler(valOfFilter);
  }
  /**retrieves the value to be searched from UserSearch-Comp
   *  and lifts it up to App-Comp */
  const searchFor = (searchedName) => {
    props.searchForHandler(searchedName);
  }

  return (
    <div className="users-Info">

      <header >
        ------------ Users ------------
      </header>
      <UserSearch searchFor={searchFor} />
      <UsersFilter filterHandler={filterHandler} />
      {props.data.map((user, index) => {
        return (
          /**
           * $$Explanation
           * I didn't use here the user.id as an index because if
           * the array = data = users selected to be shown
           * might be empty(exp: when I try to search with a value that
           * doesn't exist in the state = array),
           * If we won't have any element in the array
           *  we can't use user.id. That's why:
           * The use of the index is safer. 
           * */
          <div key={index}>
            <div className='users-Info-Button'>
              {/** 
              * lifts up first and last name to the user to be deleted
             */}
              <button onClick={() => {
                props.toDelete(user.firstName, user.lastName);
              }}>delete</button>
            </div>
            <div >
              <p > First Name:</p>
              <p
                style={{ color: 'white', marginLeft: '10px' }}
              >{user.firstName}</p>


              <p> Last Name:</p>
              <p
                style={{ color: 'white', marginLeft: '10px' }}
              >{user.lastName}</p>


              <p> Gender:</p>
              <p
                style={{ color: 'white', marginLeft: '10px' }}
              >{user.gender}</p>
            </div>


          </div>
        );
      }
      )}
    </div >

  )
}
export default UsersInfo;

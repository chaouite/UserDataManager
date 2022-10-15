import React from 'react'
import '../css/UsersInfo.css'
import UserSearch from './UserSearch';
import UsersFilter from './UsersFilter';
/* This FC displays the users  */
const UsersInfo = (props) => {

  //const [filterBy, setFilterBy] = useState('');

  const filterHandler = (valOfFilter) => {
    //setFilterBy(valOfFilter);
    props.filterTopHandler(valOfFilter);
  }
  const searchFor = (searchedName) => {
    props.searchForHandler(searchedName);
  }
  //useEffect(() => { console.log(filterBy); }, [filterBy]);
  return (
    <div className="users-Info">

      <header >
        ------------ Users ------------
      </header>
      <UserSearch searchFor={searchFor} />
      <UsersFilter filterHandler={filterHandler} />
      {props.data.map((user, index) => {
        return (
          //I didn't use here the user.id as an index because if
          // the array = data = users selected to be shown
          // is empty, we won't have any element in the array
          // we can't use user.id.
          <div key={index}>
            <div className='users-Info-Button'>
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

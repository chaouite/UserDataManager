import React from 'react'
import '../css/UsersInfo.css'
import UsersFilter from './UsersFilter';
/* This FC displays the users  */
const UsersInfo = (props) => {

  //const [filterBy, setFilterBy] = useState('');

  const filterHandler = (valOfFilter) => {
    //setFilterBy(valOfFilter);
    props.filterTopHandler(valOfFilter);
  }
  //useEffect(() => { console.log(filterBy); }, [filterBy]);
  return (
    <div className="users-Info">
      <header >
        ------------ Users ------------
      </header>
      <UsersFilter filterHandler={filterHandler}></UsersFilter>
      {props.data.map((user, index) => {
        return (
          //I didn't use here the user.id as an index because if
          // the array = data = users selected to be shown
          // is empty, we won't have any element in the array
          // we can't use user.id.
          <div key={index}  >

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
        );
      }
      )}
    </div >

  )
}
export default UsersInfo;

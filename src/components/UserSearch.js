import React from 'react';
import '../css/UserSearch.css'

/**gets the value to be searched for the user and 
 * lifts it up to the UsersInfo-Comp */
function UserSearch(props) {

  return (
    <div className='user-search' style={{ all: 'unset' }}>
      <input
        placeholder='search for ...'
        onChange={(e) => {
          props.searchFor(e.target.value);
        }}></input>
    </div>
  )
}

export default UserSearch
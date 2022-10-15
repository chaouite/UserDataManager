import React from 'react';
import '../css/UserSearch.css'

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
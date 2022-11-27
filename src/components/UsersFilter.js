import React from 'react';
import '../css/UsersFilter.css';

/**gets the choice of the user = the value to be used in the filter
 * and lifts is up to the UsersInfo-Comp
 */
const UsersFilter = (props) => {

  return (
    <div className='users-filter' style={{ all: 'unset' }}>
      <select onChange={(e) => {
        props.filterHandler(e.target.value);
      }}>
        <option vale='All'>All</option>
        <option vale='Male'>Male</option>
        <option vale='Female'>Female</option>
        <option vale='Divers'>Divers</option>
      </select>
    </div>
  )
}

export default UsersFilter
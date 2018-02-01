import React from 'react'

const FilterView = ({state, changeFunc}) => {

  return(
    <p>
      Rajaa näytettäviä: 
      <input 
        name="filter"
        value={state.filter}
        onChange={changeFunc}   
      />
    </p>
  )
}

export default FilterView

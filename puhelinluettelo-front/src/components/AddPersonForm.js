import React from 'react'

const AddPersonForm = ({submitFunc, changeFunc, state}) => {

  
  return(
    <div>
      <h3>Lisää uusi</h3>
      <form onSubmit={submitFunc}>
        <div>
          nimi: <input 
            name="newName"
            value={state.newName} 
            onChange={changeFunc}
          />
        </div>
        <div>
          numero: <input 
            name="newPhone"
            value={state.newPhone}
            onChange={changeFunc}
          />
        </div>
        <div>
          <button type="submit">lisää</button>
        </div>
      </form>
    </div>
  )
}

export default AddPersonForm
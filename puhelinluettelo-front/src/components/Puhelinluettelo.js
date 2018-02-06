import React from 'react'

const Puhelinluettelo = ({persons, delFunc}) => {

  return (
    <div>
      <h3>Numerot</h3>
      <table>
        <tbody>
          {persons.map(person => (
            <Person person={person} delFunc={delFunc}/>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const Person = ({person, delFunc}) => {
  return(
    <tr key={person.id}>
      <td>{person.name}</td>
      <td>{person.number}</td>
      <td>
        <button onClick={delFunc(person)}>Delete</button>
      </td>
    </tr>
  )
}

export default Puhelinluettelo
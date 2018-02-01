import React from 'react'

const Puhelinluettelo = ({persons, delFunc}) => {

  return (
    <div>
      <h3>Numerot</h3>
      <table>
        <tbody>
          {persons.map(person => (
            <tr key={person.id}>
              <td>{person.name}</td>
              <td>{person.number}</td>
              <td>
                <button onClick={delFunc(person)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Puhelinluettelo
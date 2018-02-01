import React from 'react';
import Puhelinluettelo from './components/Puhelinluettelo'
import AddPersonForm from './components/AddPersonForm'
import FilterView from './components/FilterView'
import personService from './services/persons'
import Notification from './components/Notification'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newPhone: '',
      filter: '',
      notification: null,
      notificationShow: false
    }
  }
  componentWillMount() {
    console.log('will mount')
    personService
      .getAll()
      .then(persons => {
        console.log(persons)
        this.setState({ persons })
        console.log('Resolved')
      })
      .catch(error => {console.log(error)})
  }

  addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: this.state.newName,
      number: this.state.newPhone
    }

    if(!this.state.persons.some(p => p.name === nameObject.name)) {
      personService
        .create(nameObject)
        .then(newPerson => {
          this.setState({
            persons: this.state.persons.concat(newPerson),
            newName: '',
            newPhone: '',
            notification: `Lisättiin ${newPerson.name}.`,
            notificationShow: true
          })
          setTimeout(() => {
            this.setState({notificationShow: false})
          }, 5000)
        })
    } else {
      if (window.confirm(`${nameObject.name} on jo luettelossa. Korvataanko vanha numero uudella?`)) {
        const newPerson = { ...this.state.persons.find(person => person.name === nameObject.name), name : nameObject.name, number: nameObject.number }

        personService
          .update(newPerson.id, newPerson)
          .then(changedPerson => {
            const persons = this.state.persons.filter(p => p.id !== changedPerson.id)
            this.setState({
              persons: persons.concat(changedPerson),
              newName: '',
              newPhone: '',
              notification: `Muutettiin ${changedPerson.name} numero.`,
              notificationShow: true
            })
            setTimeout(() => {
              this.setState({notificationShow: false})
            }, 5000)
          })
          .catch(error => {
            this.setState({ persons : this.state.persons.filter(p => p.id !== newPerson.id) })
            this.addName(event)
          })
      }
    }
  }

  deleteName = (person) => {
    return () => {
      if(window.confirm(`Do you want to delete ${person.name}?`)) {
      personService
        .del(person.id)
        .then(response => {
          this.setState({ 
            persons : this.state.persons.filter(p => p.id !== person.id),
            notification: `Poistettiin ${person.name}.`,
            notificationShow: true
          })
          setTimeout(() => {
            this.setState({notificationShow: false})
          }, 5000)
          console.log(response)
        })
        .catch(error => {
          alert(`'${person.name}' on jo valitettavasti poistettu luettelosta.`)
          this.setState({ persons : this.state.persons.filter(p => p.id !== person.id) })
        })
      }
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }


  render() {
    const filteredPersons = this.state.persons.filter(person => person.name.toLowerCase().includes(this.state.filter.toLowerCase()))
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Notification message={this.state.notification} show={this.state.notificationShow}/>
        <FilterView state={this.state} changeFunc={this.handleChange} />
        <AddPersonForm submitFunc={this.addName} state={this.state} changeFunc={this.handleChange}/>
        <Puhelinluettelo persons={filteredPersons} delFunc={this.deleteName.bind(this)}/>
      </div>
    )
  }
}


export default App

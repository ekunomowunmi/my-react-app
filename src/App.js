import React, {Component} from 'react';
import './App.css';
import Radium, {StyleRoot} from 'radium';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      {id: 'wuf1', name: 'Wunmi', age: 23},
      {id: 'maf1',name: 'Maximilian', age: 29},
      {id: 'stf1',name: 'Stephanie', age: 26},
    ],
    otherState: 'Some other value',
    showPersons: false
  }

  switchNameHandler = (newName) => {
    console.log('clicked');
    this.setState({
      persons: [
        {id: 'wuf1',name: 'Wunmi', age: 24},
        {id: 'maf1',name: newName, age: 30},
        {id: 'stf1',name: 'Stephanie', age: 27},
      ]
    })
  };

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };
     //don't directly assign it, objects should also be immutable,
    //so you pass a spread operator also to get a copy of the array
    //or you use Object.assign({}, this.state.persons[personIndex])
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIndex] = person;
    this.setState({
      persons: persons
    });
    // this.setState({
    //   persons: [
    //     {name: 'Wunmi', age: 24},
    //     {name: event.target.value, age: 30},
    //     {name: 'Stephanie', age: 26},
    //   ]
    // })
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
this.setState({
  showPersons: !doesShow
});
  };

  deletePersonsHandler = (personIndex) => {
    // const persons = this.state.persons.slice(); //creates a copy of the original array
    const persons = [...this.state.persons]; //or use and ES6 spread operator
    //const persons = this.state.persons; //assigning a reference to an array not copying it
    persons.splice(personIndex,1);
    this.setState({persons:persons});
    console.log('deleted');
  };

  render(){
    /**
     * this is the hardcoded person list
     * <Person name={this.state.persons[0].name} age={this.state.persons[0].age} click={this.switchNameHandler.bind(this,'Schwartz')}/>
            <Person
              name={this.state.persons[1].name}
              age={this.state.persons[1].age}
              click={this.switchNameHandler.bind(this,'Max!')}
              changed={this.nameChangedHandler}
              >My Hobbies: Racing</Person>
            <Person name={this.state.persons[2].name} age={this.state.persons[2].age}/>
     */
    const style = {
      backgroundColor: 'green',
      color:'white',
      font:'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor:'pointer',
      marginLeft:'10px',
      // ':hover': {
      //   backgroundColor:'lightGreen',
      //   color:'black'
      // }
    };

    let persons = null;
    if(this.state.showPersons){
      persons = (
          <div>
            {/** this wont get called immediately because of the arrow function, but inefficient */}
            {this.state.persons.map((person,index) => {
              return (
                <Person name = {person.name}
              age = {person.age}
              click= {this.switchNameHandler.bind(this, 'Max')}
              changed = {(event) => this.nameChangedHandler(event, person.id)}
              delete = {() => this.deletePersonsHandler(index)}
              key = {person.id}
             />
              );

            })}
          </div>
      );
      style.backgroundColor = 'red';
      // style[':hover'] = {
      //   backgroundColor:'salmon',
      //   color:'black'
      // };
    }

    let classes = [];
    if(this.state.persons.length <= 2) {
      classes.push('red'); //classes = ['red];
    }
    if(this.state.persons.length <=1) {
      classes.push('bold'); //classes = ['red],['bold' ])
    }

    return (
      <div className="App">
        <h1>Hi, Omowunmi</h1>

        <p className={classes.join(' ')}>This is working</p>
        {/* <button onClick={this.switchNameHandler.bind(this, 'Maximilianno')}>Switch Name</button> */}
        <button
          onClick={() => this.switchNameHandler('Maximiliano')}>Switch Name
        </button>
        <button
          style={style}
          onClick={this.togglePersonsHandler}>Toggle Name</button>
          {persons}
      </div>
    );
  }

}

export default App;
//this is a higher order function that wraps App

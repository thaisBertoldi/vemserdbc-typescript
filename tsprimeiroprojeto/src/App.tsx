import {useState} from 'react';
import './App.css';
import List from './components/List';
import { PeopleDTO } from './models/PeopleDTO';

function App() {

  const [people, setPeople] =useState<PeopleDTO['people']>(
    [
      {
        name:'Gabriel',
        age: 55,
        url: 'dsdasd.com'
      }]);

  return (
    <div className="App">
     <h1>Melhor turma</h1>
     <List people={people}/>
    </div>
  );
}

export default App;

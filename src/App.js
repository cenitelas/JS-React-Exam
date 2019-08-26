import React from 'react';
import './App.css';
import BooksBlock from './BooksBlock'

var booksArray = [{
  id:"1",
  name: 'Learn JS',
  author: 'Btchanov A.A',
  year: "2019",
  publish: 'Step Academy',
  pages: "2048",
  count: "10"
},
{
  id:"2",
  name: 'Learn React JS',
  author: 'Atchanov A.A',
  year: "2019",
  publish: 'Step Academy',
  pages: "1024",
  count: "5"
}]

class App extends React.Component {
  constructor(props) {
    super(props);

  }

  componentDidMount(){
    if(!localStorage.getItem('books')){
       localStorage.setItem('books', JSON.stringify(booksArray));
    }
  }
 

  render() {
    return (
      <div>  
        <div className="app">
          <div className="header">
            <h1>LIBRARY</h1>
            <ul className="menu">
              <li>Books</li>
              <li>Visitors</li>
              <li>Cards</li>
              <li>Statistics</li>
            </ul>
          </div>
          <div className="content">
              <BooksBlock/>
          </div>
        </div>
      </div>
    );
  }
}


export default App;

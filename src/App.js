import React from 'react';
import './App.css';
import BooksBlock from './BooksBlock'

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
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
    );
  }
}


export default App;

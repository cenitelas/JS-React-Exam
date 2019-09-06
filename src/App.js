import React from 'react';
import './App.css';
import BooksBlock from './BooksBlock'
import VisitorsBlock from './VisitorsBlock';
import CartsBlock from './CartsBlock';
import StatisticBlock from './StatisticBlock';

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

var visitorsArray =[{
    id:"1",
    name: 'Sasha',
    phone: '123321'
},
{
  id:"2",
  name: 'Pasha',
  phone: '32131'
}]

var cartsArray =[{
  id:"1",
  visitor: {
    id:"1",
    name: 'Sasha',
    phone: '123321'
  },
  book: {
    id:"2",
    name: 'Learn React JS',
    author: 'Atchanov A.A',
    year: "2019",
    publish: 'Step Academy',
    pages: "1024",
    count: "5"
  },
  dateTake:"20.05.1992",
  dateGive:''
}]

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      page:<BooksBlock/>,
      key:0
    }
    this.getPage = this.getPage.bind(this);
  }

  componentDidMount(){
    if(localStorage.getItem('books')==null){
       localStorage.setItem('books', JSON.stringify(booksArray));
    }

    if(localStorage.getItem('visitors')==null){
      localStorage.setItem('visitors', JSON.stringify(visitorsArray));
    }

    if(localStorage.getItem('carts')==null){
      localStorage.setItem('carts', JSON.stringify(cartsArray));
    }
  }
  
  getPage(page){
    this.setState({key:this.state.key+1,page:page});
  }

  render() {
    return (
      <div>  
        <div className="app">
          <div className="header">
            <h1>LIBRARY</h1>
            <ul className="menu">
              <li onClick={()=>this.getPage(<BooksBlock key={this.state.key}/>)}>Books</li>
              <li onClick={()=>this.getPage(<VisitorsBlock key={this.state.key}/>)}>Visitors</li>
              <li onClick={()=>this.getPage(<CartsBlock key={this.state.key}/>)}>Cards</li>
              <li onClick={()=>this.getPage(<StatisticBlock key={this.state.key}/>)}>Statistics</li>
            </ul>
          </div>
          <div className="content">
              {this.state.page}
          </div>
        </div>
      </div>
    );
  }
}


export default App;

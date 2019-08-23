import React from 'react';
import './BooksBlock.css';
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

class BooksBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        books:[],
        searchTag:'id',
        editView:false,
        modalContext:''
    }
    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.searchBook = this.searchBook.bind(this);
    this.bookEditView = this.bookEditView.bind(this);
  }

  componentDidMount(){
      this.setState({books:booksArray})
  }

  searchBook(e){
    var books = JSON.parse(JSON.stringify(booksArray))
    books.forEach(function(item){
        if(!item.name.toUpperCase().startsWith(e.target.value.toUpperCase())){
            delete books[books.indexOf(item)];
        }
    });

    this.setState({books:books});
  }
  
  bookEditView(e){
    var book = {};
    booksArray.forEach(function(item){
        if(item.id===e){
          book=e;
        }
    });
    

  }

  onChangeSelect(e){
    var books = this.state.books;
       books = books.sort(function (a, b) {
           return a[e.target.value].localeCompare(b[e.target.value]);
       })

    this.setState({books:books,searchTag:e.target.value});
  }

  render() {
    const books = this.state.books;
    return (
      <div className="books-block">
          <div className="header">
              <h3>ALL BOOKS:</h3>
              <button>New book</button>
          </div>
          <div className="middle">
              <div className="sort">
                  <label>Sort by:</label>
                  <select value={this.state.searchTag} onChange={(e)=>this.onChangeSelect(e)}>
                    <option value="id">ID</option>
                    <option value="name">NAME</option>
                    <option value="author">AUTHOR</option>
                    <option value="year">YEAR</option>
                    <option value="publish">PUBLISH</option>
                    <option value="pages">PAGES</option>
                    <option value="count">COUNT</option>
                </select>
                  <button>Sort</button>
              </div>
              <div className="search">
                  <label>Search:</label>
                  <input type="text" onChange={this.searchBook}></input>
              </div>
          </div>
          <div className="bottom">
            <table>
                <th>ID</th>
                <th>NAME</th>
                <th>AUTHOR</th>
                <th>YEAR</th>
                <th>PUBLISH</th>
                <th>PAGES</th>
                <th>COUNT</th>
                <th>EDIT</th>
                {books.map(item=>
                    <tr>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.author}</td>
                        <td>{item.year}</td>
                        <td>{item.publish}</td>
                        <td>{item.pages}</td>
                        <td>{item.count}</td>
                        <td><button key={item.id} onClick={()=>this.bookEditView(item.id)}>EDIT</button></td>
                    </tr>
                )}
                <tr>

                </tr>
            </table>
          </div>
      </div>
    );
  }
}


export default BooksBlock;
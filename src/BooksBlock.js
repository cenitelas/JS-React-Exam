import React from 'react';
import './BooksBlock.css';
import ModalBook from './ModalBook'

class BooksBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        books:[],
        searchTag:'name',
        editView:false,
        modalContext:'',
        showEditBook:false,
        bookEdit:{}
    }
    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.searchBook = this.searchBook.bind(this);
    this.showModalBook = this.showModalBook.bind(this);
    this.closeModalBook = this.closeModalBook.bind(this);
  }

  componentDidMount(){
    this.setState({books:JSON.parse(localStorage.getItem('books'))});
  }

  searchBook(e){
    var books = JSON.parse(localStorage.getItem('books'));
    books.forEach(function(item){
        if(!item.name.toUpperCase().startsWith(e.target.value.toUpperCase())){
            delete books[books.indexOf(item)];
        }
    });

    this.setState({books:books});
  }

  showModalBook(e){
    var book = {};
    this.state.books.forEach(function(item){
        if(item.id===e){
          book=item;
        }
    });
    this.setState({bookEdit:book,showEditBook:true});
  }

  closeModalBook(){
    this.setState({showEditBook:false});
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
         {this.state.showEditBook &&                   
          <ModalBook books={this.state.books} className="modal" book={JSON.parse(JSON.stringify(this.state.bookEdit))} close={this.closeModalBook}/>
        }
          <div className="header">
              <h3>ALL BOOKS:</h3>
              <button onClick={()=>this.showModalBook({})}>New book</button>
          </div>
          <div className="middle">
              <div className="sort">
                  <label>Sort by:</label>
                  <select value={this.state.searchTag} onChange={(e)=>this.onChangeSelect(e)}>             
                    <option value="name">NAME</option>
                    <option value="author">AUTHOR</option>   
                    <option value="count">COUNT</option>
                </select>
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
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.author}</td>
                        <td>{item.year}</td>
                        <td>{item.publish}</td>
                        <td>{item.pages}</td>
                        <td>{item.count}</td>
                        <td><button key={item.id} onClick={()=>this.showModalBook(item.id)}>EDIT</button></td>
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
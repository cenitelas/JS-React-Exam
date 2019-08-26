import React from 'react';
import './ModalBook.css';


class ModalBook extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        close:props.close,
        book:props.book,
        books:props.books,
        isNew:false
    }
    this.onChangeText=this.onChangeText.bind(this);
    this.saveBook = this.saveBook.bind(this);
    this.deleteBook = this.deleteBook.bind(this);
    this.addBook = this.addBook.bind(this);
  }

  componentDidMount(){
      if(!this.state.book.id)
      this.setState({isNew:true})
      else
      this.setState({isNew:false})
  }
  onChangeText(e,item){
    var text = e.target.value;
    var r = /\d+/;
    var r2 = /^\d+$/;

    if(!text.match(r))
    if(text.length>0)
    if(item!=='pages')
    if(item!=='count')
    if(item!=='year'){
      var book = this.state.book;
      book[item]=e.target.value;
      this.setState({book:book});
    }
    if(item!=='name')
    if(item!=='author')
    if(item!=='publish'){
      if(r2.test(text)){
        var book = this.state.book;
        book[item]=e.target.value;
        this.setState({book:book});
      }
    }
  }

  saveBook(book){
    if(book.id){
    var books = this.state.books;
    for(let i=0;i<books.length;i++){
      if(books[i].id===book.id){
        books[i]=book;
      }
    }
    this.setState({books:books});
    localStorage.removeItem("books")
    localStorage.setItem('books', JSON.stringify(this.state.books));
    this.state.close();
    }
    else{
    this.addBook(book);
    }
  }

  deleteBook(book){
    var books = this.state.books;
    for(let i=0;i<books.length;i++){
      if(books[i].id===book.id){
        books.splice(i, 1);
      }
    }
    this.setState({books:books});
    localStorage.removeItem("books")
    localStorage.setItem('books', JSON.stringify(books));
    this.state.close();
  }

  addBook(book){
    var books = this.state.books;

    var maxId = 0;
    books.forEach(function(item){
      if(maxId<parseInt(item.id))
          maxId=parseInt(item.id);
    });
    book.id=''+(maxId+1);
    books.push(book);
    this.setState({books:books});
    localStorage.removeItem("books")
    localStorage.setItem('books', JSON.stringify(books));
    this.state.close();
  }

  render() {
      const book = this.state.book;
      console.log(this.state.isNew)
    return (
      <div className="modal">
          <div className="field-close" onClick={this.state.close}></div>
          <div className="modal-context">
              <div className="header">
                  {this.state.isNew===false ? (
                  <h3>EDIT BOOK</h3> 
                  ) : (
                  <h3>CREATE BOOK</h3>
                  )}
                  <span onClick={this.state.close}>X</span>
              </div>
              <div className="content">
                <label>Name:</label>
                <input type="text" onChange={(e)=>this.onChangeText(e,'name')} value={book.name}/>
                <label>Author:</label>
                <input type="text" onChange={(e)=>this.onChangeText(e,'author')} value={book.author}/>
                <label>Year:</label>
                <input type="text" onChange={(e)=>this.onChangeText(e,'year')} value={book.year}/>
                <label>Publish:</label>
                <input type="text" onChange={(e)=>this.onChangeText(e,'publish')} value={book.publish}/>
                <label>Pages:</label>
                <input type="text" onChange={(e)=>this.onChangeText(e,'pages')} value={book.pages}/>
                <label>Count:</label>
                <input type="text" onChange={(e)=>this.onChangeText(e,'count')} value={book.count}/>
                <div>
                    <button onClick={()=>this.saveBook(book)}>Save</button>
                    {this.state.isNew===false &&
                    <button onClick={()=>this.deleteBook(book)}>Delete</button>
                    }
                </div>
              </div>
          </div>
      </div>
    );
  }
}


export default ModalBook;

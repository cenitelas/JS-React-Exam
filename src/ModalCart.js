import React from 'react';
import './ModalCart.css';


class ModalCart extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        close:props.close,
        carts:props.carts,
        visitors:props.visitors,
        books:props.books,
        cart:{},
        book:props.books[0],
        visitor:props.visitors[0],
    }
    this.onChangeSelect=this.onChangeSelect.bind(this);
    this.addCart = this.addCart.bind(this);
  }

  onChangeSelect(e,item){
      var cart = this.state.cart;
      var books = this.state.books;
      var visitors = this.state.visitors;
      if(item=='book'){
         books.forEach(function (book) { 
            if(book.id===e.target.value){
            cart.book=book;
            }
         });

         this.setState({book:cart.book});
      }
      if(item=='visitor'){
        visitors.forEach(function (visitor) { 
           if(visitor.id==e.target.value)
           cart.visitor=visitor;
        });       
        this.setState({visitor:cart.visitor});
     }
      this.setState({cart:cart});
  }
  
  addCart(){
    var cart = this.state.cart;
    if(!cart.hasOwnProperty('book')){
        if(this.state.books.filter(item=>item.count>0).length<1){
            return
        }
        cart.book=this.state.books[0];
    }
    if(!cart.hasOwnProperty('visitor')){
        if(this.state.visitors.length<1){
            return
        }
        cart.visitor=this.state.visitors[0];
    }
    var carts = this.state.carts;
    var maxId = 0;
    carts.forEach(function(item){
    if(maxId<parseInt(item.id))
        maxId=parseInt(item.id);
    });
    cart.id=''+(maxId+1);
    var date = new Date();
    cart.dateTake= date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
    ;
    carts.push(cart);
    this.setState({carts:carts});
    var books = this.state.books;
    books.forEach(function (item) {
        if(item.id===cart.book.id){
            books[books.indexOf(item)].count = parseInt(books[books.indexOf(item)].count-1)+'';
        }
    });
    localStorage.removeItem("carts")
    localStorage.setItem('carts', JSON.stringify(carts));
    localStorage.removeItem("books")
    localStorage.setItem('books', JSON.stringify(books));
    this.state.close();
  }

  render() {
      const books = this.state.books.filter(item=>item.count>0);
      const visitors = this.state.visitors;
    return (
      <div className="modal">
          <div className="field-close" onClick={this.state.close}></div>
          <div className="modal-context">
              <div className="header">
                  <h3>CREATE CART</h3>
                  <span onClick={this.state.close}>X</span>
              </div>
              <div className="content">
                <label>Book:</label>
                <select value={this.state.book.id} onChange={(e)=>this.onChangeSelect(e,'book')}>   
                    {books.map(item=>                
                        <option key={item.id} value={item.id}>{item.name}</option>
                    )}    
                </select>
                <label>Visitor:</label>
                <select value={this.state.visitor.id} onChange={(e)=>this.onChangeSelect(e,'visitor')}>   
                    {visitors.map(item=>                 
                        <option key={item.id} value={item.id}>{item.name}</option>
                     )}    
                </select>
                <div>
                    <button onClick={()=>this.addCart()}>Save</button>
                </div>
              </div>
          </div>
      </div>
    );
  }
}


export default ModalCart;

import React from 'react';
import './CartsBlock.css';
import ModalCart from './ModalCart'

class CartsBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        carts:[],
        searchTag:'visitor.name',
        visitors:[],
        books:[],
        modalContext:''
    }
    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.searchCart = this.searchCart.bind(this);
    this.showModalCart = this.showModalCart.bind(this);
    this.closeModalCart = this.closeModalCart.bind(this);
    this.returnBook = this.returnBook.bind(this);
  }

  componentDidMount(){
    this.setState({carts:JSON.parse(localStorage.getItem('carts'))});
    this.setState({visitors:JSON.parse(localStorage.getItem('visitors'))});
    this.setState({books:JSON.parse(localStorage.getItem('books'))});
  }

  searchCart(e){
    var carts = JSON.parse(localStorage.getItem('carts'));
    if(e.target.value.length>0)
    carts.forEach(function(item){
        if(!item.visitor.name.toUpperCase().startsWith(e.target.value.toUpperCase())){
            delete carts[carts.indexOf(item)];
        }
    });

    this.setState({carts:carts});
  }

  returnBook(cart){
    var books = JSON.parse(localStorage.getItem('books'));
    var carts = this.state.carts;
    books.forEach(function (item) {
        if(item.id===cart.book.id){
            books[books.indexOf(item)].count=(parseInt(books[books.indexOf(item)].count)+1)+'';
            carts.forEach(function (item2) {
                if(item2.id===cart.id){
                    var date = new Date();
                  carts[carts.indexOf(item2)].dateGive= date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear();
                }
            })
        }
    });
    this.setState({carts:carts});
    localStorage.removeItem("books")
    localStorage.setItem('books', JSON.stringify(books));
    localStorage.removeItem("carts")
    localStorage.setItem('carts', JSON.stringify(carts));
  }

  showModalCart(e){
    this.setState({showEditCart:true});
  }

  closeModalCart(){
    this.setState({showEditCart:false});
  }

  onChangeSelect(e){
    var carts = this.state.carts;
    carts = carts.sort(function (a, b) {
           return a[e.target.value].name.localeCompare(b[e.target.value].name);
       })

    this.setState({carts:carts,searchTag:e.target.value});
  }

  render() {
    const carts = this.state.carts;
    return (     
      <div className="carts-block">
         {this.state.showEditCart &&                   
          <ModalCart key={this.key} visitors={this.state.visitors} books={this.state.books} carts={this.state.carts} className="modal" close={this.closeModalCart}/>
        }
          <div className="header">
              <h3>ALL CARTS:</h3>
              <button onClick={()=>this.showModalCart({})}>New cart</button>
          </div>
          <div className="middle">
              <div className="sort">
                  <label>Sort by:</label>
                  <select value={this.state.searchTag} onChange={(e)=>this.onChangeSelect(e)}>             
                    <option value="visitor">VISITOR NAME</option>
                    <option value="book">BOOK NAME</option>
                </select>
              </div>
              <div className="search">
                  <label>Search:</label>
                  <input type="text" onChange={this.searchCart}></input>
              </div>
          </div>
          <div className="bottom">
            <table>
                <th>ID</th>
                <th>VISITOR NAME</th>
                <th>BOOK NAME</th>
                <th>DATE TAKE</th>
                <th>DATE GIVE</th>
                {carts.map(item=>
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.visitor.name}</td>
                        <td>{item.book.name}</td>
                        <td>{item.dateTake}</td>
                        {item.dateGive ?(    
                             <td>{item.dateGive}</td>
                        ) : (
                             <td><button key={item.id} onClick={()=>this.returnBook(item)}>RETURN</button></td>
                        )}
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


export default CartsBlock;
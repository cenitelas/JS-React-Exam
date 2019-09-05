import React from 'react';
import './StatisticBlock.css';

class StatisticBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        carts:[]
    }
    this.getTopBooks = this.getTopBooks.bind(this);
    this.getTopVisitors = this.getTopVisitors.bind(this);
  }
  componentDidMount(){
    this.setState({carts:JSON.parse(localStorage.getItem('carts'))});
  }

  getTopBooks(){
    var carts = this.state.carts;
    var cartsBook = [];

    carts.forEach(function(item){
        if(!cartsBook.find(i=>i.book.name===item.book.name)){
            var temp = item;
            temp.count=0;
            cartsBook.push(temp);       
        }
    })

    carts.forEach(function(item){
            cartsBook.find(i=>i.book.name===item.book.name).count+=1;
    })

    var sortCart = cartsBook.sort(function(a,b){
        if (a.count < b.count) {
            return 1;
          }
          if (a.count > b.count) {
            return -1;
          }

          return 0;
    })
    sortCart = sortCart.slice(0,5);
    return(
        <table>
            <caption>TOP 5 BOOKS</caption>
            {sortCart.map(item=>
            <tr>
                <td>{item.book.name}</td>
            </tr>
            )}
        </table>
    )
  }

  getTopVisitors(){
    var carts = this.state.carts;
    var cartsVisitor = [];

    carts.forEach(function(item){
        if(!cartsVisitor.find(i=>i.visitor.name===item.visitor.name)){
            var temp = item;
            temp.count=0;
            cartsVisitor.push(temp);       
        }
    })

    carts.forEach(function(item){
        cartsVisitor.find(i=>i.visitor.name===item.visitor.name).count+=1;
    })

    var sortCart = cartsVisitor.sort(function(a,b){
        if (a.count < b.count) {
            return 1;
          }
          if (a.count > b.count) {
            return -1;
          }

          return 0;
    })

    sortCart = sortCart.slice(0,5);
    
    return(
        <table>
            <caption>TOP 5 VISITORS</caption>
            {sortCart.map(item=>
            <tr>
                <td>{item.visitor.name}</td>
            </tr>
            )}
        </table>
    )
  }

  render() {
    return (     
      <div className="statistic-block">
        {this.getTopBooks()}
        {this.getTopVisitors()}
      </div>
    );
  }
}


export default StatisticBlock;
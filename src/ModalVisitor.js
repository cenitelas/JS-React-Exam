import React from 'react';
import './ModalVisitor.css';


class ModalVisitor extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        close:props.close,
        visitor:props.visitor,
        visitors:props.visitors,
        isNew:false
    }
    this.onChangeText=this.onChangeText.bind(this);
    this.saveVisitor = this.saveVisitor.bind(this);
    this.deleteVisitor = this.deleteVisitor.bind(this);
    this.addVisitor = this.addVisitor.bind(this);
  }

  componentDidMount(){
      if(!this.state.visitor.id)
      this.setState({isNew:true})
      else
      this.setState({isNew:false})
  }
  onChangeText(e,item){     
      var visitor = this.state.visitor;
      var num = /^\d+$/; 
      var space = /\s/; 
      var sub = /\W/; 
      var word = /^\D+$/;
      if(item!=='phone'){
        if(word.test(e.target.value)===true){
          visitor[item]=e.target.value;
          this.setState({visitor:visitor});
        }else{
          e.target.value=e.target.value.substring(0,e.target.value.length-1);
        }
      }else{
        if(num.test(e.target.value)===true || sub.test(e.target.value)===true){
          visitor[item]=e.target.value;
          this.setState({visitor:visitor});
        }else{
          e.target.value=e.target.value.substring(0,e.target.value.length-1);
        }
      }
  }

  saveVisitor(visitor){
    if(visitor.id){
    var visitors = this.state.visitors;
    for(let i=0;i<visitors.length;i++){
      if(visitors[i].id===visitor.id){
        visitors[i]=visitor;
      }
    }
    this.setState({visitors:visitors});
    localStorage.removeItem("visitors")
    localStorage.setItem('visitors', JSON.stringify(this.state.visitors));
    this.state.close();
    }
    else{
    this.addVisitor(visitor);
    }
  }

  deleteVisitor(visitor){
    var visitors = this.state.visitors;
    for(let i=0;i<visitors.length;i++){
      if(visitors[i].id===visitor.id){
        visitors.splice(i, 1);
      }
    }
    var carts = JSON.parse(localStorage.getItem('carts'));
    for(let i=0;i<carts.length;i++){
      if(carts[i].visitor.id===visitor.id){
        carts.splice(i, 1);
      }
    }
    this.setState({visitors:visitors});
    localStorage.removeItem("visitors")
    localStorage.setItem('visitors', JSON.stringify(visitors));
    localStorage.removeItem("carts")
    localStorage.setItem('carts', JSON.stringify(carts));
    this.state.close();
  }

  addVisitor(visitor){
    var visitors = this.state.visitors;

    var maxId = 0;
    visitors.forEach(function(item){
      if(maxId<parseInt(item.id))
          maxId=parseInt(item.id);
    });
    visitor.id=''+(maxId+1);
    visitors.push(visitor);
    this.setState({visitors:visitors});
    localStorage.removeItem("visitors")
    localStorage.setItem('visitors', JSON.stringify(visitors));
    this.state.close();
  }

  render() {
      const visitor = this.state.visitor;
    return (
      <div className="modal">
          <div className="field-close" onClick={this.state.close}></div>
          <div className="modal-context">
              <div className="header">
                  {this.state.isNew===false ? (
                  <h3>EDIT VISITOR</h3> 
                  ) : (
                  <h3>CREATE VISITOR</h3>
                  )}
                  <span onClick={this.state.close}>X</span>
              </div>
              <div className="content">
                <label>Name:</label>
                <input type="text" onChange={(e)=>this.onChangeText(e,'name')} value={visitor.name}/>
                <label>Phone:</label>
                <input type="text" onChange={(e)=>this.onChangeText(e,'phone')} value={visitor.phone}/>
                <div>
                    <button onClick={()=>this.saveVisitor(visitor)}>Save</button>
                    {this.state.isNew===false &&
                    <button onClick={()=>this.deleteVisitor(visitor)}>Delete</button>
                    }
                </div>
              </div>
          </div>
      </div>
    );
  }
}


export default ModalVisitor;

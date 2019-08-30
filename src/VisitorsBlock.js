import React from 'react';
import './VisitorsBlock.css';
import ModalVisitor from './ModalVisitor'

class VisitorsBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state={
        visitors:[],
        searchTag:'id',
        editView:false,
        modalContext:'',
        showEditVisitor:false,
        visitorEdit:{}
    }
    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.searchVisitor = this.searchVisitor.bind(this);
    this.showModalVisitor = this.showModalVisitor.bind(this);
    this.closeModalVisitor = this.closeModalVisitor.bind(this);
  }

  componentDidMount(){
    this.setState({visitors:JSON.parse(localStorage.getItem('visitors'))});
  }

  searchVisitor(e){
    var visitors = JSON.parse(localStorage.getItem('visitors'));
    if(e.target.value.length>0)
    visitors.forEach(function(item){
        if(!item.name.toUpperCase().startsWith(e.target.value.toUpperCase())){
            delete visitors[visitors.indexOf(item)];
        }
    });

    this.setState({visitors:visitors});
  }

  showModalVisitor(e){
    var visitors = {};
    this.state.visitors.forEach(function(item){
        if(item.id===e){
            visitors=item;
        }
    });
    this.setState({visitorEdit:visitors,showEditVisitor:true});
  }

  closeModalVisitor(){
    this.setState({showEditVisitor:false});
  }

  onChangeSelect(e){
    var visitors = this.state.visitors;
    visitors = visitors.sort(function (a, b) {
           return a[e.target.value].localeCompare(b[e.target.value]);
       })

    this.setState({visitors:visitors,searchTag:e.target.value});
  }

  render() {
    const visitors = this.state.visitors;
    return (     
      <div className="visitors-block">
         {this.state.showEditVisitor &&                   
          <ModalVisitor visitors={this.state.visitors} className="modal" visitor={JSON.parse(JSON.stringify(this.state.visitorEdit))} close={this.closeModalVisitor}/>
        }
          <div className="header">
              <h3>ALL VISITORS:</h3>
              <button onClick={()=>this.showModalVisitor({})}>New visitor</button>
          </div>
          <div className="middle">
              <div className="sort">
                  <label>Sort by:</label>
                  <select value={this.state.searchTag} onChange={(e)=>this.onChangeSelect(e)}>             
                    <option value="name">NAME</option>
                    <option value="id">ID</option>   
                    <option value="phone">PHONE</option>
                </select>
              </div>
              <div className="search">
                  <label>Search:</label>
                  <input type="text" onChange={this.searchVisitor}></input>
              </div>
          </div>
          <div className="bottom">
            <table>
                <th>ID</th>
                <th>NAME</th>
                <th>PHONE</th>
                <th>EDIT</th>
                {visitors.map(item=>
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.phone}</td>
                        <td><button key={item.id} onClick={()=>this.showModalVisitor(item.id)}>EDIT</button></td>
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


export default VisitorsBlock;
import React, { Component } from 'react';
import { HttpServiceEmp} from "../project1/httpserviceemp";
import { Link } from "react-router-dom";
class ListEmpComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            tableHeaders:[],
            employee:[],
            empcopy:[],
            column:'',
            columnVal:''
        };
        this.serv = new HttpServiceEmp();
    }
     
     componentDidMount(){
        this.serv.getData().then((resp)=>{
            this.setState({employee:resp.data.response});
            this.setState({empcopy:resp.data.response});
            this.setState({tableHeaders:Object.keys(resp.data.response[0])});
        }).catch((error)=>{
            this.setState({errorMessage: `Error Occured ${error.message}`});
        });
    }

    componentWillUnmount(){
        console.log('List Component of Employee is UnMounted');
    }
    handleChange(evt)
    {
        this.setState({[evt.target.name]:evt.target.value});
        console.log(evt.target.value);

    }

    deleteRecord(id){
        this.serv.deleteData(id).then((resp)=>{
            console.log('Deleted');
            // reload the window
            window.location.reload();
        }).catch((error)=>{
             console.log(`Error in Delete ${error}`);   
        });
    }
        search()
        {
            let col = this.state.column;
            let val = this.state.columnVal;
    
    
            if(col === "EmpNo" || col === "Salary" || col === "DeptNo") 
            {
                val = parseInt(val);
            }
    
            
    
            let result = this.state.empcopy.filter((obj)=>(
                    obj[col]===val
                ));
    
            if(result.length===0)
            {
                alert("No Search result found");
            }
    
            else
            {
                this.setState({employee:result});
            }
            
        }
    
    render() { 
        if(this.state.employee.length === 0) {
           return( <div>No recodrs</div>);
        } else {
        return (  
            <div className="container">
             <h2>List of Employees</h2>
             <div>
                 <select className="form-control" 
                         id="dropdown" 
                         name="column"
                         onChange={this.handleChange.bind(this)}
                         value={this.state.column}>
                          {
                            this.state.tableHeaders.map((val,idx)=>(
                                <option key={idx}>{val}</option>
                            ))
                        }
                          
              
                     
                       
                 </select>
                 
                 <div className="form-group" id="ip">
                    <label> Value</label>
                    <input className="form-control" 
                           name="columnVal" 
                           value={this.state.columnVal}
                           onChange={this.handleChange.bind(this)}/>

                 </div>
                 
                 <button className="btn btn-success" 
                         
                         onClick={this.search.bind(this)} >Search</button>
                 
             <br/>
             </div>
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>EmpNo</th>
                    <th>EmpName</th>
                    <th>Designation</th>
                    <th>Salary</th>
                    <th>DeptNo</th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {
                      this.state.employee.map((e,i)=>(
                          <tr key={i}>
                             <td>{e.EmpNo}</td>
                             <td>{e.EmpName}</td>
                             <td>{e.Designation}</td>
                             <td>{e.Salary}</td>
                             <td>{e.DeptNo}</td>
                            <td>
                               <button className="btn btn-warning">
                                 <Link to={`/editemp/${e.EmpNo}`}>Edit</Link>
                               </button>
                            </td>
                            <td>
                            <input type="button" value="Delete" className="alert alert-danger"
                             onClick={()=> {this.deleteRecord(e.EmpNo)}}/>
                          </td>
                          </tr>
                      ))
                  }
                </tbody>
              </table>
            </div>
        );}
    }
}
 
export default ListEmpComponent;
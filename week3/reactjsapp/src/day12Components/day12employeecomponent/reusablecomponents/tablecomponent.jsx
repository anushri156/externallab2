import React, { Component } from 'react'

class TableComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            
            
         }
    }
    render() {
        if(this.props.dataSource === undefined || this.props.dataSource.length <=0 ){
            return (
                 <div>No Records</div>
            )
        }  else {
        return (  
            <table className="table table-bordered table-striped table-dark">
            <thead>
              <tr>
               {
                Object.keys( this.props.dataSource[0]).map((col,idx)=>(
                       <th key={idx}>{col}</th>
                   ))
               }
              </tr>
            </thead>
            <tbody>
             {
                this.props.dataSource.map((data,index)=>(
                    <tr key={index} onClick ={()=>this.props.getSelectEmp(data)}  >
                    {
                        Object.keys( this.props.dataSource[0]).map((col,idx)=>(
                            <td key={idx}>{data[col]}</td>
                        ))
                    }
                   <input type="button" value="Delete" onClick={()=>this.props.deleteRow(index)} hidden={!this.props.canDelete}/>
                    </tr>
                ))
             }
            </tbody>
         </table>
         
        );
            }
    }
}
 
export default TableComponent;
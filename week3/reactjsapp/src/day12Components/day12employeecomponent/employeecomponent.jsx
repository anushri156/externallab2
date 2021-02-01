import React, { Component } from 'react';
import {Departments, Designations} from './../../day12Models/day12constants';
import { Logic } from "./../../day12Models/day12logic";
import DropDownComponent from './reusablecomponents/dropdowncomponent';
import TableComponent from './reusablecomponents/tablecomponent';


class EmployeeComponent extends Component {
    /**
     * @param {any} props
     */
    constructor(props) {
        super(props);
        this.state = {  
            EmpNo:0,
            EmpName: '',
            DeptName: '',
            Designation: '',
            Salary:0,
            departments: Departments, // store constant array
            designations: Designations, // store constant array
            employees:[],
            tableColumnHeaders:[]
        };
        // define an instance of Logic class
        this.logic = new Logic();
        // set the initial value of the state in Constructor thats why the render() method
        // will take the initial value for employees and rendering HTML Table 
        this.state.employees =  this.logic.getEmployees();
        // read all object keys for 0th record in employees array
        // this is the initial value for state so render() methdo will accept it
        // for generating HTML DOM
        this.state.tableColumnHeaders = Object.keys(this.state.employees[0]);
      
    }
    /**
     * @param {{ target: { name: any; value: any; }; }} evt
     */
    handleValueChange=(evt)=> {
        this.setState({[evt.target.name]: evt.target.value});
    };

    clear=()=>{
        this.setState({EmpNo:0});
        this.setState({EmpName:''});
        this.setState({DeptName:''});
        this.setState({Designation:''});
        this.setState({Salary:0});
         
    };

    save=()=>{
        let emp = {
            EmpNo: this.state.EmpNo,
            EmpName: this.state.EmpName,
            DeptName: this.state.DeptName,
            Designation: this.state.Designation,
            Salary: this.state.Salary
        };
        let emps = this.logic.addEmployee(emp);
            // direct state update not allows with new values for state properties
            // use setState()
        // this.state.employees = emps;

        // perform state mutation using setState()
        // since the collection state properties 
        // delays the execution for update, pass the callback parameter 
        // to setState() method so that the the setState() will execute the callback 
        // and during that time the collection will be updated asynchronously
        this.setState({employees: emps},()=>{});


        console.log(`EMployees = ${JSON.stringify(this.state.employees)}`);
        
    };

    getSelectedEmp=(e)=>{
      
        this.setState({EmpNo:e.EmpNo});
        this.setState({EmpName:e.EmpName});
        this.setState({DeptName:e.DeptName});
        this.setState({Designation:e.Designation});
        this.setState({Salary:e.Salary});
    };
    delRowEmp=(index)=>{
        this.state.employees.splice(index,1);
        this.setState({employees: this.state.employees});

    };  
    getSelectedDeptName=(val)=>{
        console.log(`DeptName ${val}`);
        this.setState({DeptName:val});
    };

    getSelectedDesignation=(val)=>{
        console.log(`Designation ${val}`);
        this.setState({Designation:val});
    };

    render() { 
        return ( 
            <div className="container">
            <h2>The Employee Infromation</h2>
                <div className="form-group">
                  <label>EmpNo</label>
                  <input type="text" className="form-control"
                  name="EmpNo"
                  value={this.state.EmpNo}
                   onChange={this.handleValueChange.bind(this)}/>
                </div>
                <div className="form-group">
                    <label>EmpName</label>
                    <input type="text" className="form-control"
                    name="EmpName"
                    value={this.state.EmpName}
                     onChange={this.handleValueChange.bind(this)}/>
              </div>
              <div className="form-group">
                <label>DeptName</label>
                {  /* generate the <option> in DOM Tree based on Collection 
                <select className="form-control"
                name="DeptName"
                value={this.state.DeptName}
                 onChange={this.handleValueChange.bind(this)}>
                   {
                      
                       this.state.departments.map((dept,index)=>(
                           <option key={index} value={dept}>{dept}</option>
                       ))
                   }
                 </select> */}
                 <DropDownComponent 
                  stateData={this.state.DeptName}
                 dataSource={this.state.departments}
                 selectedValue={this.getSelectedDeptName.bind(this)}></DropDownComponent>
            </div>
            <div className="form-group">
                <label>Designation</label>

               {  /* generate the <option> in DOM Tree based on Collection 
                 <select className="form-control"
                name="Designation"
                value={this.state.Designation}
                 onChange={this.handleValueChange.bind(this)}>
                 {
                   
                    this.state.designations.map((desig,index)=>(
                        <option key={index} value={desig}>{desig}</option>
                    ))
                }
            </select> */}
            <DropDownComponent 
            stateData={this.state.Designation}
            dataSource={this.state.designations}
            selectedValue={this.getSelectedDesignation.bind(this)}></DropDownComponent>
            </div>
            <div className="form-group">
                    <label>Salarys</label>
                    <input type="text" className="form-control"
                    name="Salary"
                    value={this.state.Salary}
                     onChange={this.handleValueChange.bind(this)}/>
              </div>
              <div className="form-group">
               <input type="button" value="Clear" onClick={this.clear.bind(this)} className="btn btn-warning"/>
               <input type="button" value="Save" onClick={this.save.bind(this)} className="btn btn-success"/>
        </div>
        <hr/>
        <h2>The Employee List</h2>
        {/* Heard Code HTML Table */}
       {/* <table className="table table-bordered table-striped table-dark">
          <thead>
               <tr>
                <th>EmpNo</th>
                <th>EmpName</th>
                <th>DeptName</th>
                <th>Designation</th>
                <th>Salary</th>
               </tr> 
          </thead>
          <tbody>
            {
                this.state.employees.map((emp,index)=>(
                    <tr key={index}>
                      <td>{emp.EmpNo}</td>
                      <td>{emp.EmpName}</td>
                      <td>{emp.DeptName}</td>
                      <td>{emp.Designation}</td>
                      <td>{emp.Salary}</td>
                    </tr>
                ))
            }
          </tbody>
        </table>*/}
         {/* Dynamic Table Generation */}
         {/* <h6>Dynamic Table</h6>
         <table className="table table-bordered table-striped table-dark">
            <thead>
              <tr>
               {
                   this.state.tableColumnHeaders.map((col,idx)=>(
                       <th key={idx}>{col}</th>
                   ))
               }
              </tr>
            </thead>
            <tbody>
             {
                this.state.employees.map((emp,index)=>(
                    <tr key={index} onClick={()=>this.getSelectedEmp(emp)}>
                    {
                        this.state.tableColumnHeaders.map((col,idx)=>(
                            <td key={idx}>{emp[col]}</td>
                        ))
                    }
                  
                    </tr>
                ))
             }
            </tbody>
         </table>
         <br/> */}
          <TableComponent dataSource={this.state.employees} canDelete={true} 
           deleteRow={(index)=>this.delRowEmp(index)}
           getSelectEmp={(data)=>this.getSelectedEmp(data)}
          ></TableComponent>
            </div>
         );
    }
}
 
export default EmployeeComponent;
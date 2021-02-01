import React, { Component } from 'react';
import ListDepartmentComponent from './listdepartmentcomponent';
import CreateDepartmentComponent from './createdepartmentcomponent';
import EditDepartmentComponent from './editdepartmentcomponent';
import ListEmpComponent from "./listempcomp";
import EmployeeComponent from "./employeecomponent";
import EditEmpComponent from './editempcomp';
// import the routing
import { Route, Link, Switch, Redirect } from "react-router-dom";

class MainComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return (  
            <div className="container">
              <h2>The MERN App</h2>

              <table className="table table-bordered table-striped">
                <tbody>
                  <tr>
                    <td>
                   
                      <Link to="/">List Department</Link>
                    </td>
                    <td>
                    <Link to="/create/department">Create Department</Link>
                  </td>
                  
                  <td>
                    <Link to="/create/employee">Create Employee</Link>
                  </td>
                  <td>
                    <Link to="/emplist">List Employee</Link>
                  </td>
                  <td></td>
                  
                  </tr>
                </tbody>
              </table>

            
              <Switch>
                <Route exact path="/" component={ListDepartmentComponent}></Route>
                <Route exact path="/create/department" component={CreateDepartmentComponent}></Route>
               
                <Route exact path="/edit/:id" component={EditDepartmentComponent}></Route>
                <Route exact path="/emplist" component={ListEmpComponent}></Route>
                <Route exact path="/create/employee" component={EmployeeComponent}></Route>
            
                <Route exact path="/editemp/:id" component={EditEmpComponent}></Route>
                <Redirect to="/emplist"></Redirect>
              </Switch>
            </div>
        );
    }
}
 
export default MainComponent;
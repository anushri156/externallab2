  
import React, {useState, useEffect} from 'react';
import {Route, Link, Switch, Redirect} from 'react-router-dom';
import ListComponent from './listcomponent';
import AddEmployeeComponent from './addempcomponent';
import UpdateEmployeeComponent from './updateempcomponent';


const MainComponent=()=>{

    return(
        <div className="container">
            
            <h2>Employee Details</h2>
            <table className="table table-bordered table-striped">
                <tbody>
                    <tr>
                        <td><Link to="/">Employee List</Link></td>
                        <td><Link to="/add">Add Employee</Link></td>
                        {/* <td><Link to="/updateEmp">Update Employee</Link></td> */}
                    </tr>
                </tbody>
            </table>
            <Switch>
                <Route exact path="/" component={ListComponent}></Route>
                <Route exact path="/add" component={AddEmployeeComponent}></Route>
                <Route exact path="/updateEmp/:id" component={UpdateEmployeeComponent}></Route>
                <Redirect to="/"></Redirect>
            </Switch>
        </div>
    );
};

export default MainComponent;
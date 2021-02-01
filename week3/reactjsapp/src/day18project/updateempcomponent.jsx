import React, {useState, useEffect} from 'react';
import { HttpSrevice } from '../mernapp/project1/httpservice';
import {HttpServiceEmp} from './../mernapp/project1/httpserviceemp';

const UpdateEmployeeComponent=(props)=>{

    let serv = new HttpServiceEmp();
    let serv2=new HttpSrevice;
    const [employee,addEmployee] = useState({EmpNo:0,EmpName:'',Designation:'',Salary:0,DeptNo:0});
    const [error, changeError] = useState({isEmpNoValid:false, isEmpNameValid:false, isSalaryValid:false, isDeptNoValid:false, isDesignationValid:false});
    let empArr = [];

    useEffect(()=>{
        console.log("Update employee component mounted");
        let id = props.match.params.id;

        serv.getData().then((resp)=>{
            empArr = resp.data.response;
            addEmployee(empArr[id]);
        }).catch((e)=>{
            console.log(e.message);
        });

       },[])

    function clr()
    {
        let emp1 = {
            EmpNo:0,
            EmpName:'',
            Salary:0,
            DeptNo:0,
            Designation:''
        }

        addEmployee({...emp1});
    }

    function handleChanges(evt)
    {
        const name = evt.target.name;
        const val = evt.target.value;
        
        if(name==="EmpNo")
        {
            if(val==="")
            {
                addEmployee({...employee, EmpNo:parseInt("0")});
                changeError({...error,isEmpNoValid:false});
                return;
            }

            addEmployee({...employee, EmpNo:parseInt(val)});

            
            if(val<0)
            {
                changeError({...error,isEmpNoValid:false});
            }

            else
            {
                changeError({...error,isEmpNoValid:true});

            }

        }

        if(name === "EmpName")
        {
            addEmployee({...employee, EmpName:val});

            console.log(name , val);
            if(val=="")
            {
                changeError({...error,isEmpNameValid:false});
            }

            else
            {
                changeError({...error,isEmpNameValid:true});

            }
        }

        if(name === "Designation")
        {
            addEmployee({...employee, Designation:val});

            console.log(name , val);
            if(val=="")
            {
                changeError({...error,isDesignationValid:false});
            }

            else
            {
                changeError({...error,isDesignationValid:true});

            }
        }

         if(name==="Salary")
        {
            if(val==="")
            {
                addEmployee({...employee, Salary:parseInt("0")});
                changeError({...error,isSalaryValid:false});
                return;
            }

            addEmployee({...employee, Salary:parseInt(val)});

            if(val<0)
            {
                changeError({...error,isSalaryValid:false});
            }
            else
            {
                changeError({...error,isSalaryValid:true});
            }

        }

        

        if(name=="DeptNo")
        {
            if(val==="")
            {
                addEmployee({...employee, DeptNo:parseInt("0")});
                changeError({...error,isDeptNoValid:false});
                return;
            }

            addEmployee({...employee, DeptNo:parseInt(val)});

        
         if(val<0)
            {
                changeError({...error,isDeptNoValid:false});
            }

            else
            {
                changeError({...error,isDeptNoValid:true});

            }

        }

        
    }

    function IsValid()
    {
        let allValid = Object.values(error);

        if(allValid.includes(false)){return false;}

        else{return true;}

    }

    function save()
    {
        console.log(employee);
        
        serv.putData(employee).then((resp)=>
            {
                alert(`Updated ${JSON.stringify(employee)}`);
                props.history.push("/");
            }
            ).catch((error)=>{
                console.log(error.message)
            });
    }

   

    return(
            <div className="container">
                <h2>Update Employee</h2>

            <div className="form-group">
                    <label>EmpNo</label>
                    <input type="text"
                           value={employee.EmpNo} 
                           className="form-control"
                           name="EmpNo" 
                           onChange={handleChanges.bind(this)} />
                    <div className="alert alert-danger" hidden={error.isEmpNoValid}>
                         Employee Number invalid
                    </div>
                </div>

                <div className="form-group">
                    <label>EmpName</label>
                    <input type="text"
                           value={employee.EmpName} 
                           className="form-control"
                           name="EmpName" 
                           onChange={handleChanges.bind(this)} />
                    <div className="alert alert-danger" hidden={error.isEmpNameValid}>
                         Employee Name invalid
                    </div>
                </div>

                <div className="form-group">
                    <label>Designation</label>
                    <input type="text"
                           value={employee.Designation} 
                           className="form-control"
                           name="Designation" 
                           onChange={handleChanges.bind(this)} />
                    <div className="alert alert-danger" hidden={error.isDesignationValid}>
                          Designation invalid
                    </div>
                </div>

                <div className="form-group">
                    <label>Salary</label>
                    <input type="text"
                           value={employee.Salary} 
                           className="form-control"
                           name="Salary" 
                           onChange={handleChanges.bind(this)} />
                    <div className="alert alert-danger" hidden={error.isSalaryValid}>
                          Salary invalid
                    </div>
                </div>

                <div className="form-group">
                    <label>DeptNo</label>
                    <input type="text"
                           value={employee.DeptNo} 
                           className="form-control"
                           name="DeptNo" 
                           onChange={handleChanges.bind(this)} />
                    <div className="alert alert-danger" hidden={error.isDeptNoValid}>
                         Dept Number invalid
                    </div>
                </div>

                <button className="btn btn-warning" onClick={clr}>Clear</button>

                <button className="btn btn-success"  
                        onClick={save}
                        disabled={!IsValid()}>

                        Save
                </button>
                
            </div>
    );


    
}

export default UpdateEmployeeComponent;
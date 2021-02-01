import React, {useState, useEffect} from 'react';
import {HttpServiceEmp} from './../mernapp/project1/httpserviceemp';
import{HttpSrevice} from './../mernapp/project1/httpservice';


const AddEmployeeComponent=(props)=>{

    let serv = new HttpServiceEmp();
    let serv2 = new HttpSrevice();
    const [employee,addEmployee] = useState({EmpNo:0,EmpName:'',Designation:'',Salary:0,DeptNo:0});
   
    const [error, changeerror] = useState({isEmpNoValid:false, isEmpNameValid:false, isSalaryValid:false, isDeptNoValid:false, isDesignationValid:false});

    useEffect(()=>{
        console.log("Add employee component mounted");
        
     },[])

    function clear()
    {
        let emp = {
            EmpNo:0,
            EmpName:'',
            Salary:0,
            DeptNo:0,
            Designation:''
        }

        addEmployee({...emp});
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
                changeerror({...error,isEmpNoValid:false});
                return;
            }

            addEmployee({...employee, EmpNo:parseInt(val)});

            
         
           if(val<0)
            {
                changeerror({...error,isEmpNoValid:false});
            }

            else
            {
                changeerror({...error,isEmpNoValid:true});

            }

        }
        if(name === "EmpName")
        {
            addEmployee({...employee, EmpName:val});

            console.log(name , val);
            if(val=="")
            {
                changeerror({...error,isEmpNameValid:false});
            }

            else
            {
                changeerror({...error,isEmpNameValid:true});

            }
        }

         if(name === "Designation")
        {
            addEmployee({...employee, Designation:val});

            console.log(name , val);
            if(val=="")
            {
                changeerror({...error,isDesignationValid:false});
            }

            else
            {
                changeerror({...error,isDesignationValid:true});

            }
        }

         if(name==="Salary")
        {
            if(val==="")
            {
                addEmployee({...employee, Salary:parseInt("0")});
                changeerror({...error,isSalaryValid:false});
                return;
            }

            addEmployee({...employee, Salary:parseInt(val)});

            if(val<0)
            {
                changeerror({...error,isSalaryValid:false});
            }
            else
            {
                changeerror({...error,isSalaryValid:true});
            }

        }

         if(name==="EmpNo")
        {
            if(val==="")
            {
                addEmployee({...employee, EmpNo:parseInt("0")});
                changeerror({...error,isEmpNoValid:false});
                return;
            }

            addEmployee({...employee, EmpNo:parseInt(val)});

            
         
           if(val<0)
            {
                changeerror({...error,isEmpNoValid:false});
            }

            else
            {
                changeerror({...error,isEmpNoValid:true});

            }

        }

        if(name=="DeptNo")
        {
            if(val==="")
            {
                addEmployee({...employee, DeptNo:parseInt("0")});
                changeerror({...error,isDeptNoValid:false});
                return;
            }

            addEmployee({...employee, DeptNo:parseInt(val)});

          
           if(val<0)
            {
                changeerror({...error,isDeptNoValid:false});
            }

            else
            {
                changeerror({...error,isDeptNoValid:true});

            }

        }

        
    }

    function IsValid()
    {
        let valid = Object.values(error);

        if(valid.includes(false)){return false;}

        else{return true;}

    }

    function save()
    {
        console.log(employee);
        
        serv.postData(employee).then((resp)=>
            {
                alert(`Added ${JSON.stringify(employee)}`);
                props.history.push("/");
            }
            ).catch((error)=>{
                console.log(error.message)
            });
    }

   

    return(
            <div className="container">
                <h2>Add Employee</h2>


                <div className="form-group">
                    <label>EmpNo</label>
                    <input type="text"
                           value={employee.EmpNo} 
                           className="form-control"
                           name="EmpNo" 
                           onChange={handleChanges.bind(this)} />
                    <div className="alert alert-danger" hidden={error.isEmpNoValid}>
                         Employee Number is invalid
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
                         Employee Name is invalid
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
                          Designation is invalid
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
                          Salary is invalid
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
                         Dept Number is invalid
                    </div>
                </div>

                <button className="btn btn-warning" onClick={clear}>Clear</button>

                <button className="btn btn-success"   onClick={save}  disabled={!IsValid()}>

                        Save
                </button>
                
            </div>
    );


    
}

export default AddEmployeeComponent;
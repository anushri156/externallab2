import React, { Component } from 'react';
import { HttpServiceEmp } from "../project1/httpserviceemp";
import {HttpSrevice} from  "../project1/httpservice";


class EmployeeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            EmpNo:0,
            EmpName: '',
            Designation: '',
            Salary:0,
            DeptNo:0,
            employee:[],
            departments:[],
          
            isEmpNoValid:true,
            isEmpNameValid:true,
            isDesignationValid:true,
            isSalaryValid:true,
            isDeptNoValid:true,
            isEmpNoExists:true,
            isDeptNoExists:true
         
           
        };
        this.serv = new HttpServiceEmp();
        this.serv1 = new HttpSrevice();
    }

    componentDidMount(){
        console.log("Add component of employee  mounted");
            this.serv1.getData().then((resp)=>{
                this.setState({departments:resp.data.response});
                console.log(resp.data.response);
            }).catch((error)=>{
                this.setState({errorMessage: `Error Occured ${error.message}`});
            });
        
        this.serv.getData().then((resp)=>{
            this.setState({employee:resp.data.response});
            console.log(resp.data.response);
        }).catch((error)=>{
            this.setState({errorMessage: `Error Occured ${error.message}`});
        });
    }

    handleChanges(evt){
        this.setState({[evt.target.name]:evt.target.value});
        this.validateForm(evt.target.name, evt.target.value);
    }
    isFormValid1()
    {

       
        if(this.state.isDeptNoValid && this.state.isDesignationValid && this.state.isEmpNameValid && this.state.isEmpNoValid && this.state.isSalaryValid && this.state.isDeptNoExists && this.state.isEmpNoExists)
        return true;
        else return false;
    }
    
    validateForm(name,value){
         if(name === "EmpNo")
        {
            
                  
            let res = this.state.employee.filter((obj)=>(

                obj["EmpNo"]===value
            ));
            if(res.lenth>0)
            {
                this.setState({isEmpNoExists:false});
            }
            
      else  if (value==="")
            {
                this.setState({isEmpNoValid:false});

            }
            else 
            {
            this.setState({isEmpNoValid:true});
            this.setState({isEmpNoExists:true});
            }
        }
        
 
    
        
        
            if(name==="DeptNo")
        {
           


          if(value==='')
            {
                this.setState({isDeptNoValid:false});
            }

            else
            {
                this.setState({isDeptNoValid:true});
            }
        }

         if(name === "Salary")
        {
            if(parseInt(value)<0 || value==="")
            {
                this.setState({isSalaryValid:false});
            }

            else
            {
                this.setState({isSalaryValid:true});
            }
        }

       
        

         if(name === "Designation")
        {
            if(value==="")
            {
                this.setState({isDesignationValid:false});

            }

            else
            {
                this.setState({isDesignationValid:true});

            }
        }

        if(name==="EmpName")
        {
            if(value==="")
            {
                this.setState({isEmpNameValid:false});

            }
            else
            {
                this.setState({isEmpNameValid:true});

            }
        }


        
    }


    
   

    save(){
        let emps= {
            EmpNo:this.state.EmpNo,
            EmpName: this.state.EmpName,
            Designation: this.state.Designation,
            Salary: this.state.Salary,
            DeptNo:this.state.DeptNo
        };
        this.serv.postData(emps).then((resp)=>{
             console.log(JSON.stringify(resp.data));
             this.props.history.push('/emplist');
        }).catch((error)=>{
            this.setState({errorMessage: `Error Occured ${error.message}`});
        });
    }

    clear(){
        this.setState({EmpNo:0});
        this.setState({EmpName:''});
        this.setState({Designation:''});
        this.setState({salary:0});
        this.setState({DeptNo:0});
    }
    componentWillUnmount(){
        console.log('Add Emp Component is UnMounted');
    }
    render() { 
        return (  
            <div className="container">
            <h2>The Employee Information</h2>
            <div className="form-group">
              <label>EmpNo</label>
              <input type="text" className="form-control"
              name="EmpNo"
              value={this.state.EmpNo}
              onChange={this.handleChanges.bind(this)}
              
              />
               <div className="alert alert-danger" hidden={this.state.isEmpNoValid}>
                      EmpNo must be Positive Numeric and not empty
                   </div>
                   <div className="alert alert-danger" hidden={this.state.isEmpNoExists}>
                      EmpNo already exists
                   </div>
            </div>
            <div className="form-group">
                <label>EmpName</label>
                <input type="text" className="form-control"
                name="EmpName"
                value={this.state.EmpName}
                onChange={this.handleChanges.bind(this)}
                  />
                  <div className="alert alert-danger" hidden={this.state.isEmpNameValid}>
                     EmpName cannot be empty
                  </div>
          </div>
          <div className="form-group">
          <label>Designation</label>
          <input type="text" className="form-control"
          name="Designation"
          value={this.state.Designation}
          onChange={this.handleChanges.bind(this)}
            />
             <div className="alert alert-danger"
                         hidden={this.state.isDesignationValid}>
                         
                        Designation should be non-empty :(
                    </div>
        </div>
        <div className="form-group">
        <label>Salary</label>
        <input type="text" className="form-control"
        name="Salary"
        value={this.state.Salary}
        onChange={this.handleChanges.bind(this)}
          />
           <div className="alert alert-danger"
                         hidden={this.state.isSalaryValid}>
                         
                        Salary should be positive and non-empty 
                    </div>
      </div>
      <div className="form-group">
        <label>DeptNo</label>
        <input type="text" className="form-control"
        name="DeptNo"
        value={this.state.DeptNo}
        onChange={this.handleChanges.bind(this)}
          />
          
          <div className="alert alert-danger" hidden={this.state.isDeptNoValid}>

                        Dept No should not be empty 
                    </div>
          <div className="alert alert-danger" hidden={this.state.isDeptNoExists}>

                        Dept No already exists
             </div>                
      </div>
      <input type="button" value="Clear"  onClick={this.clear.bind(this)}  className="btn btn-warning"/>
      <input type="button" value="Save" onClick={this.save.bind(this)} disabled={!this.isFormValid1()}  className="btn btn-success"/>
<hr/>
{/* <ValidationSummaryComponent messages={this.state.errorMessages}></ValidationSummaryComponent> */}

  
   
          </div>

        );
    }
}
 
export default EmployeeComponent;
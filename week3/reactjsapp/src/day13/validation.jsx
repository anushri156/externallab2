import React, { Component } from 'react';
import {Logic} from './../day12Models/day12logic';
import  ValidationSummaryComponent from './validationsummary';
class ValidationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            EmpNo:'',
            EmpName: '',
            isEmpNoValid:true,
            isEmpNoExists: false,
            isEmpNameValid:true,
           
            errorMessages:[],
            f:false,
            f1:false
            
         };
         this.logic = new Logic();
    }
    handleValueChange=(evt)=>{
        this.setState({[evt.target.name]:evt.target.value});
        this.validateForm(evt.target.name, evt.target.value);
    }
    isFormValid()
    {

        if(this.state.isEmpNoValid && this.state.isEmpNameValid)
        return true;
        else return false;
    }
    validateForm=(name,value)=>{
        let tempArr = [];
        if(name === "EmpNo"){
            if(parseInt(value) <= 0 || value.length >= 10){
                    this.setState({isEmpNoValid:false});
                    
                    this.setState({f:true});
                    tempArr.push('EmpNo is mandaory, must be +, must be max 10 in length');
                    this.setState({errorMessages:tempArr});
                    
                    console.log(this.state.errorMessages);
                    if(this.state.f1){
                        tempArr.push('EmpName is mandaory, must be min 5 characters, must be max 20 characters');
                        this.setState({errorMessages:tempArr});}
                
            } 
           
            else {
                this.setState({isEmpNoValid:true});
                
                this.setState({f:false});
                this.setState({errorMessages:tempArr.pop()});
                if(this.state.f1){
                    tempArr.push('EmpName is mandaory, must be min 5 characters, must be max 20 characters');
                    this.setState({errorMessages:tempArr});}
                
            }
        } 
         
        if(name === "EmpName"){
            if(value.length < 5 || value.length > 20 ){
                this.setState({isEmpNameValid:false});
               
                this.setState({f1:true});
                tempArr.push('EmpName is mandaory, must be min 5 characters, must be max 20 characters');
                this.setState({errorMessages:tempArr});
                console.log(this.state.errorMessages);
                if(this.state.f){
                        tempArr.push('EmpNo is mandaory, must be +, must be max 10 in length');
                        this.setState({errorMessages:tempArr});}
              } else {
                this.setState({isEmpNameValid:true});
               
                this.setState({f1:false});
                this.setState({errorMessages:tempArr.pop()});
                if(this.state.f){
                    tempArr.push('EmpNo is mandaory, must be +, must be max 10 in length');
                    this.setState({errorMessages:tempArr});
                }
               
                
                
            }
        }
    }


    save=()=>{
        alert('Submitted');    
    }
    render() { 
        return (
            <div className="container">
              <form onSubmit={this.save.bind(this)}>
              <div className="form-group">
                  <label>EmpNo</label>
                  <input type="text" className="form-control"
                  name="EmpNo"  
                  value={this.state.EmpNo}
                   onChange={this.handleValueChange.bind(this)}/>
                   <div className="alert alert-danger" hidden={this.state.isEmpNoValid}>
                      EmpNo must be Positive Numeric
                   </div>
                   <div className="alert alert-danger" hidden={!this.state.isEmpNoExists}>
                   EmpNo  is alreay present in array
                </div>
                </div>
                <div className="form-group">
                    <label>EmpName</label>
                    <input type="text" className="form-control"
                    name="EmpName" 
                    value={this.state.EmpName}
                     onChange={this.handleValueChange.bind(this)}/>
                     <div className="alert alert-danger" hidden={this.state.isEmpNameValid}>
                     EmpName must be min 5 char upto max 20 characters
                  </div>
              </div>
                <div className="form-group">
                    
                    <input type="submit" value="submit" disabled={!this.isFormValid()}  className="btn btn-success"/>
                </div>
                 
              </form>
              <ValidationSummaryComponent messages={this.state.errorMessages}></ValidationSummaryComponent>
            </div>
        );
    }
}
 
export default ValidationComponent;
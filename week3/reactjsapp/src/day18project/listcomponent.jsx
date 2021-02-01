import React, {useState, useEffect, useCallback} from 'react';

import {HttpServiceEmp} from './../mernapp/project1/httpserviceemp';
import{HttpSrevice} from './../mernapp/project1/httpservice';

import {Link} from 'react-router-dom';


const ListComponent=(props)=>{

    let serv = new HttpServiceEmp();
    let serv2=new HttpSrevice();
    const [employee,emps] = useState([]);

    useEffect(()=>{
        console.log("List component is mounted");

        serv.getData().then((resp)=>{
            emps(resp.data.response)})
            .catch((error)=>{console.log(error.message)});


    },[])

    const deleteEmp = useCallback(
        (evt) => {

            let id = evt.target.value;
            console.log(employee[id].EmpNo);

            serv.deleteData(employee[id].EmpNo).then((resp)=>{
                window.location.reload();
            }).catch((e)=>{console.log(e.message)});
        },
        [employee]
    );


    if(employee == undefined || employee.length==0)
    {
        return(<h2>No Records found :( </h2>);
    }

    else
    {
        let tableData = employee;
        let tableHeaders = Object.keys(employee[0]);

        return(
            <div>

                <table className="table table-bordered table-striped ">
                    <thead>
                        <tr>
                            {
                                tableHeaders.map((val,idx)=>(
                                    <th key={idx}>{val}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tableData.map((obj,idx)=>(
                                <tr>
                                    {
                                        tableHeaders.map((val,idx)=>(
                                            <td key={idx}>{obj[val]}</td>
                                        ))
                                    
                                        
                                    }

                                    <td>
                                        <button className="btn btn-light">
                                            <Link to={`/updateEmp/${idx}`}>Edit</Link>
                                        </button>
                                    </td>

                                    <td>
                                        <button className="btn btn-light" 
                                                onClick={deleteEmp}
                                                value={idx}>

                                                    Delete

                                        </button>
                                    </td>

                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        );
    }
    
    
}

export default ListComponent;
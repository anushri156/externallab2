import axios from  'axios';

export class HttpServiceEmp {
    constructor(){
        this.url = "http://localhost:6060";
    }

    getData(){
        let response = axios.get(`${this.url}/emp`);
        return response;
    }

    // gettng single record based on id
    getDatabyid(id){
        let response = axios.get(`${this.url}/emp/${id}`);
        return response;
    }
    postData(emp){
        let response = axios.post(`${this.url}/emp`,emp, {
            // @ts-ignore
            'Content-Type': 'application/json'
        } );
        return response;
    }

    putData(emp){
        let response = axios.put(`${this.url}/emp/${emp.EmpNo}`,emp, {
            // @ts-ignore
            'Content-Type': 'application/json'
        } );
        return response;
    }

    deleteData(id){
        let response = axios.delete(`${this.url}/emp/${id}`);
        return response;
    }
}
import axios from  'axios';

export class HttpSrevice {
    constructor(){
        this.url = "http://localhost:8787";
    }

    getData(){
        let response = axios.get(`${this.url}/api/departments`);
        return response;
    }
    

    // gettng single record based on id
    getDatabyid(id){
        let response = axios.get(`${this.url}/api/departments/${id}`);
        return response;
    }
    postData(dept){
        let response = axios.post(`${this.url}/api/departments`,dept, {
            // @ts-ignore
            'Content-Type': 'application/json'
        } );
        return response;
    }

    putData(dept){
        let response = axios.put(`${this.url}/api/departments/${dept.DeptNo}`,dept, {
            // @ts-ignore
            'Content-Type': 'application/json'
        } );
        return response;
    }

    deleteData(id){
        let response = axios.delete(`${this.url}/api/departments/${id}`);
        return response;
    }
    
    
}
const express = require('express');
const bodyParser =  require('body-parser');
const cors = require('cors');
const path = require('path');
const { Sequelize, Model, DataTypes } = require('sequelize');
let instance = express();
instance.use(bodyParser.json());
instance.use(bodyParser.urlencoded({ extended: false }));
instance.use(cors({
    origin: "*", // all origins
    methods: "*", // all http methods
    allowedHeaders: "*" // all headers in HTTP request
}));



const sequelize = new Sequelize("Company", "root", "anushri123", {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    define: {
        timestamps: false 
    }
});

async function getTax(){
             
    let r = await sequelize.query(`SELECT EmpNo,EmpName,Salary,if(Salary>=500000,salary*0.30,if(Salary>=200000,Salary*0.20,Salary*0.10)) as tax FROM employee;`);
    console.log(`Result of Tax is ${JSON.stringify(r)}`);
    return r;
}

getTax().then((r)=>{console.log(JSON.stringify(r));}).catch((e)=>{
    console.log(`error ${e}`);
}); 
async function getDepartments(){
     
        let r = await sequelize.query('CALL getEmployees("Manager");');
        console.log(`Result is ${JSON.stringify(r)}`);
        return r;
} 
getDepartments().then((r)=>{console.log(JSON.stringify(r));}).catch((e)=>{
    console.log(`error ${e}`);
});


async function insertDepartent(){
    let r = await sequelize.query("CALL sp_insertdept(101, 'Transport', 'Pune', 30);");
        console.log(`Result is ${JSON.stringify(r)}`);
        return r;
}
insertDepartent().then((r)=>{console.log(JSON.stringify(r));}).catch((e)=>{
    console.log(`error ${e}`);
});





const dept = require(path.join(__dirname,'./models/department'))(sequelize, Sequelize.DataTypes);
const emp = require(path.join(__dirname, './models/employee'))(sequelize, Sequelize.DataTypes);






instance.get("/emp",(request,response)=>{
    sequelize.sync({
        force:false
    }) .then(()=>
           emp.findAll() 
        )
   
    .then((data) => {
                    response.json({ stausCode: 200, rowCount: data.length, response: data });
                     response.end();
             })
   
    .catch((err)=>{
        response.status(504).send(err)
        response.end()
    })

})

instance.get("/emp/:id",(request,response)=>{
    let id = request.params.id
    sequelize.sync({
        force:false
    }).then(()=>{
        return emp.findOne({where:{EmpNo:id}})
    }).then((resp)=>{
        response.status(200).send(resp)
    }).catch((err)=>{
        console.log(err)
        response.status(500).send(err)
    })

})
instance.post("/emp",(request,response)=>{
    let data = {}
    Object.keys(request.body).forEach((v,i)=>{
        data[v] = request.body[v]
    })
    console.log(data)
    
    sequelize.sync({
        force:false
    }).then(()=>{
        return dept.findOne({where:{DeptNo:data.DeptNo}})
    }).then((resp)=>{
        if (resp!=null){
            return emp.create(data)
        }
        else{
            throw new Error('Foriegn Key error')
        }
    })
    
    .then((resp2)=>{
        response.status(200).send(resp2)
        response.end()
    })
    .catch((err)=>{
        response.status(500).send({status:500, msg:String(err)})
        response.end()
    })
})

instance.put("/emp/:id",(request,response)=>{
    let data = {}
    let id = request.params.id
    Object.keys(request.body).forEach((v,i)=>{
        data[v] = request.body[v]
    })
    sequelize.sync({
        force:false
    }).then(()=>{
            return emp.update(data,{where:{EmpNo:id}})
    })
    .then((resp)=>{
        console.log(resp)
        if (resp[0]==0){
            response.status(504).send({msg:'Did not updated'})
            response.end()
        }
        else{

            response.status(201).send(resp)
            response.end()
        }
    }).catch((err)=>{
        
        response.status(500).send({status:500, msg:String(err)})
        response.end()
    })
})

instance.delete("/emp/:id",(request,response)=>{
    let id = request.params.id
    sequelize.sync({
        force:false
    }).then(()=>{
        return emp.destroy({where:{EmpNo:id}})
    }).then((resp)=>{
        response.status(200).send({status:200,msg:resp})
        response.end()
    }).catch((err)=>{
        response.status(500).send({status:500, msg:String(err)})
        response.end()
    })
})
instance.listen(6060, () => {
    console.log('Express Server Started on port 6060');
});

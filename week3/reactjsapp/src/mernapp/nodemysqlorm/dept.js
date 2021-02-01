
let express  =require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let path = require('path');



const {Sequelize, DataTypes, Model}  =  require('sequelize');

let instance = express();
instance.use(bodyParser.urlencoded({extended:false})); 
instance.use(bodyParser.json());
instance.use(cors({
    origin: "*", // all origins
    methods: "*", // all http methods
    allowedHeaders: "*" // all headers in HTTP request
}));


const sequelize = new Sequelize("Company", "root", "anushri123", {
     host: 'localhost', // database hosting machine-name / ip address / localhost 
     dialect:'mysql', // the database provider engine / service
     pool: { 
        max:5,   // max 5 connection object for the current application
        min: 0,  // default is no connection , it has to be requested
        idle: 10000  // connection idle time in milliseconds for timeout to wait for connection object
     },
     define: { // defining the Model mapping policies(?) to database table
           timestamps:false  // supress the timestamp i.e. used for connecurrency
     }
});


const dept = require(path.join(__dirname, './models/Department'))(sequelize, Sequelize.DataTypes);


instance.get("/api/departments", (req,resp)=>{
    sequelize.sync({
        force:false
    })
        .then(()=>
           dept.findAll() // select all recodrs from Department table
        )
        .then((data)=>{
            resp.json({
                statusCode:200,
                rowsCount: data.length,
                response:data
            });
             
            resp.end();
        })
        .catch((error)=> {
            resp.status(500).send(error.message);
        });
});



 

instance.get("/api/departments/:id",(req,resp)=>{
    let id = parseInt(req.params.id);
    sequelize.sync({
            force: false // default is true to create a table
        })
        .then(() =>
           dept.findOne(
               {
                   where : {DeptNo:id}
               }
           )
        )
        .then((data) => {
            resp.json({ statusCode: 200, data: data })
            resp.end();
        })
        .catch((error) => resp.send({ statusCode: 500, data: error }));
});

// the post request
instance.post("/api/departments", (req,resp)=> {
    // create a JS object that has same schema like Department model
    let newDept = {
        DeptNo: req.body.DeptNo,
        DeptName: req.body.DeptName,
        Location: req.body.Location,
        Capacity: req.body.Capacity
    };

    // sync with database
    sequelize.sync({force:false})
    .then(()=>
        // create a record and return the commited record from database to API
        {
            return dept.create(newDept);
        } 
      ).then((data)=>{
        resp.json({ statusCode: 200, data: data });
        resp.end();
      }).catch((error) => resp.send({ statusCode: 500, data: error }));
});
// update
instance.put("/api/departments/:id", (req,resp)=> {
    // read the id from the URL parameter
    let id = req.params.id; 
    // sync with database
    sequelize.sync({force:false})
    .then(()=>
        // logic for the update
        dept.update({
            DeptName: req.body.DeptName,
            Location: req.body.Location,
            Capacity: req.body.Capacity
        }, {where:{DeptNo:id}})
      ).then((data)=>{
        resp.json({ statusCode: 200, data: data });
        resp.end();
      }).catch((error) => resp.send({ statusCode: 500, data: error }));
});

// delete
instance.delete("/api/departments/:id",(req,resp)=>{
    let id = parseInt(req.params.id);
    sequelize.sync({
            force: false // default is true to create a table
        })
        .then(() =>
           dept.destroy({where:{DeptNo:id}})
        )
        .then((data) => {
            resp.json({ statusCode: 200, data: data })
            resp.end();
        })
        .catch((error) => resp.send({ statusCode: 500, data: error }));
});


// start listening

instance.listen(8787, ()=>{
    console.log('REST API is listening on port 8787');
});
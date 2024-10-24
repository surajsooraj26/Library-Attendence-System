const { response } = require("express");

const adminCredentials = {
    username:'name',
    password:'pass'
};

fetch('http:localhost:3500/register',{
    method:'POST',
    headers:{
        'Content-Type': 'application/json'
    },
    body:JSON.stringify(adminCredentials)
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error=> console.error(error));
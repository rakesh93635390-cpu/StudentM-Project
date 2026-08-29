const {Pool}=require('pg')
require('dotenv').config()

const pool=new Pool({
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    host:process.env.DB_HOST,
    database:process.env.DB_DATABASE,
    port: Number(process.env.DB_PORT),
     ssl: {
    rejectUnauthorized: false
  }
})

module.exports=pool;
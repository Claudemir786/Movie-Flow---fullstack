
//conexão com o banco de dados 
import mysql from 'mysql2'

const MYSQL = mysql;


const pool = MYSQL.createPool({
    host:'localhost',
    port:'3306',
    user:'root',
    password:'',
    database:'movieflow'

}).promise();


export default pool;
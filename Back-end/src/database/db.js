
//conexão com o banco de dados 
import mysql from 'mysql2'

const MYSQL = mysql;


const pool = MYSQL.createPool({
    host:'localhost',
    port:'3307',
    user:'root',
    password:'4723',
    database:'movieflow'

}).promise();




export default pool;
import mysql from 'mysql2/promise';
import 'dotenv/config';



class DatabaseFunctions {
    constructor() {
        this.pool = mysql.createPool({
            host: 'localhost',
            user: 'root',
            password: process.env.SQL_PASSWORD,
            database: 'bite_kneset_tg'
        });
    }

   
}
// const dbFunctions = new DatabaseFunctions();
export default DatabaseFunctions;
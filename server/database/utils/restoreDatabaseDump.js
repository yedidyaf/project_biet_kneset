const { exec } = require('child_process');
require('dotenv').config();


// MySQL database configuration
const dbConfig = {
   host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME,
};


// Backup directory
const backupDir = process.env.BACKUP_DIR;
 const restoreDatabaseDump = (backupFile) => {
   const restoreCommand = `"C:/Program Files/MySQL/MySQL Server 8.0/bin/mysqldump.exe" --host=${dbConfig.host} --user=${dbConfig.user} --password=${dbConfig.password} ${dbConfig.database} < ${backupDir}/${backupFileName}`;


   exec(command, (error, stdout, stderr) => {
       if (error) {
           console.error(`Error restoring database: ${error.message}`);
           return;
       }
       console.log('Database restored successfully');
   });
};


// Usage
const backupFile = process.argv[2];
restoreDatabaseDump(backupFile);



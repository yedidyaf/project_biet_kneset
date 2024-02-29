import { exec } from 'child_process';
import fs from 'fs'
import path from 'path';
import 'dotenv/config'
import { config } from 'dotenv';
config({ path: '../../.env' });


// MySQL database configuration
const dbConfig = {
 host: process.env.DB_HOST,
 user: process.env.DB_USER,
 password: process.env.DB_PASSWORD,
 database: process.env.DB_NAME,
};


// Backup directory
const backupDir = process.env.BACKUP_DIR;


// Generate backup file name with current date and time
const currentDate = new Date().toISOString().replace(/:/g, '-').slice(0, 19);
const backupFileName = `backup_${currentDate}.sql`;


// Command to create database dump
const dumpCommand = `"C:/Program Files/MySQL/MySQL Server 8.0/bin/mysqldump.exe" --host=${dbConfig.host} --user=${dbConfig.user} --password=${dbConfig.password} ${dbConfig.database} > ${backupDir}/${backupFileName}`;


// Execute the command
exec(dumpCommand, (error, stdout, stderr) => {
 if (error) {
   console.error(`Error creating database dump: ${error.message}`);
   return;
 }
 console.log('Database dump created successfully');


 // Delete old backup files
 fs.readdir(backupDir, (err, files) => {
   if (err) {
     console.error(`Error reading backup directory: ${err.message}`);
     return;
   }


   const backupFiles = files.filter((file) => file.startsWith('backup_')).sort();
   const filesToDelete = backupFiles.slice(0, -7);


   filesToDelete.forEach((file) => {
     fs.unlink(path.join(backupDir, file), (err) => {
       if (err) {
         console.error(`Error deleting backup file: ${err.message}`);
       } else {
         console.log(`Backup file ${file} deleted successfully`);
       }
     });
   });
 });
});

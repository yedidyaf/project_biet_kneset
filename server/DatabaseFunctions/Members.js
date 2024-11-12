import DatabaseFunctions from './DatabaseFunctions.js';

class Members extends DatabaseFunctions {
    async getMembers() {
        try {
            const [result] = await this.pool.query(`SELECT * FROM members`);
            return result;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
    async setMember(member) {
        try {
            // בדיקה אם כבר קיים חבר עם אותה כתובת מייל
            const [existingMember] = await this.pool.query(`
                SELECT id FROM members
                WHERE email = ?`,
                [member.email]);
    
            if (existingMember.length > 0) {
                throw new Error(`Member with email ${member.email} already exists`);
            }
    
            // הוספת החבר למסד הנתונים
            const res = await this.pool.query(`
                INSERT INTO members (first_name, last_name, email, address, phone, is_v) 
                VALUES (?, ?, ?, ?, ?, ?)`,
                [member.first_name, member.last_name, member.email, member.address, member.phone, member.is_v]);
    
            return { ...member, id: res[0].insertId };
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    

    async putMember(id) {
        try {
            const res = await this.pool.query(`
                UPDATE members 
                SET is_v = 1
                WHERE id = ?`,
                [id]);
            
            if (res[0].affectedRows === 0) {
                throw new Error(`Member with ID ${id} not found`);
            }
            
            const [updatedMember] = await this.pool.query(`
                SELECT * FROM members
                WHERE id = ?`,
                [id]);
            
            return updatedMember[0];
        } catch (error) {
            console.error(error);
            return error;
        }
    }
    
    
    async deleteMember(id) {
        try {
            const [updatedMember] = await this.pool.query(`
                SELECT * FROM members
                WHERE id = ?`,
                [id]);
            
            const res = await this.pool.query(`DELETE FROM members WHERE id = ?`, [id]);
    
            if (res.affectedRows === 0) {
                throw new Error(`Member with ID ${id} not found`);
            }
            
            return updatedMember[0];
        } catch (error) {
            console.error(error);
            return error;
        }
    }
}

export default new Members();
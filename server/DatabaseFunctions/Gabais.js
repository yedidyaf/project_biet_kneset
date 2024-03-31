import DatabaseFunctions from './DatabaseFunctions.js';

class Gabais extends DatabaseFunctions {
    async addGabai(gabai) {
        try {
            // בדיקה אם יש חבר עם השם והסיסמה שהתקבלו
            const [memberResult] = await this.pool.query(`
                SELECT id FROM members
                WHERE  email = ?`,
                [ gabai.email]);
    
            if (memberResult.length === 0) {
                throw new Error(`Member with name ${gabai.name} and email ${gabai.email} not found`);
            }
    
            const memberId = memberResult[0].id;
    console.log(memberId);
            const [existingGabai] = await this.pool.query(`
            SELECT member_id FROM gabais
            WHERE member_id = ?`,
            [memberId]);

        if (existingGabai.length > 0) {
            throw new Error(`הגבאי רשום במערכת כבר`);
        }
            // במקרה שיש חבר כזה, נעדכן את הגבאי
            const updateRes = await this.pool.query(`
            INSERT INTO gabais (member_id , user_id , password) 
            VALUES (?, ?, ?)`,
                [memberId, gabai.name, gabai.password]);
    
            if (updateRes.affectedRows === 0) {
                throw new Error(`Gabai with ID ${gabai.id} not found`);
            }
            return { ...gabai, member_id: updateRes[0].insertId };
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    
    
    async deleteGabaiByEmail(id) {
        try {
         
            const gabaiResult = await this.pool.query('DELETE FROM gabais WHERE member_id = ?', [id]);
    
            if (gabaiResult.affectedRows === 0) {
                throw new Error(`Gabai with id ${id} not found in gabais`);
            }
    
            return { success: true, message: `Gabai with id ${id} deleted successfully!` };
        } catch (error) {
            console.error(error);
            throw { success: false, message: error.message };
        }
    }
    
    async getGabais() {
        try {
            const [result] = await this.pool.query(`
            SELECT gabais.user_id, members.email, members.first_name, members.last_name, members.id
            FROM gabais
            JOIN members ON gabais.member_id = members.id
        `);
            return result;
        } catch (error) {
            throw error;
            
        }
    }
    async checkGabai(credentials) {
    
        console.log(credentials);
        try {
            const [result] = await this.pool.query(`
                SELECT * FROM gabais
                WHERE user_id = ? AND password = ?`,
                [credentials.user_id, credentials.password]);
            if (result.length > 0) {
                
                return result[0];
            } else {
                
                return null;
            }
        } catch (error) {
            console.error(error);
            return error;
        }
    }
}

export default new Gabais();
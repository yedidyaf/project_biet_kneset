import DatabaseFunctions from './DatabaseFunctions.js';

class Donations extends DatabaseFunctions {
    async getDonations() {
        try {
            const [result] = await this.pool.query(`SELECT * FROM donations`);
            return result;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
    async addDonation(donation){
        try {
            const res = await this.pool.query(`
                INSERT INTO donations (title, content, how ,images) 
                VALUES (?, ?, ?, ?)`,
                [donation.title, donation.content,donation.how, donation.image]);

            return { ...donation, id: res.insertId };
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    async putDonation(id, donation){
        try {
            const res = await this.pool.query(`
            UPDATE donations
            SET  title =?, content = ? ,how = ?  ,images = ? 
                WHERE id = ?`,
                [donation.title, donation.content, donation.how, donation.image,  id]);

            return { ...donation, id: res.insertId };
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    async deleteDonation(id) {
        try {
            const res = await this.pool.query(`DELETE FROM donations WHERE id = ?`, [id]);
    
            if (res.affectedRows === 0) {
                throw new Error(`Donation with ID ${id} not found`);
            }
    
            return `Donation with ID ${id} deleted successfully!`;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
    
}

export default new Donations();
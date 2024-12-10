import DatabaseFunctions from './DatabaseFunctions.js';

class Donations extends DatabaseFunctions {
    // קבלת כל הקטגוריות עם סכומי ברירת מחדל
    async getDonations() {
        try {
            const [result] = await this.pool.query(`
            SELECT id, title, content, images, default_amount 
            FROM donations
        `);
            return result;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    // הוספת קטגוריה חדשה
    async addDonation(donation) {
        try {
            const [result] = await this.pool.query(`
                INSERT INTO donations (title, content, images, default_amount) 
                VALUES (?, ?, ?, ?)`,
                [
                    donation.title,
                    donation.content,
                    donation.images, // וידוא שיש כאן ערך
                    donation.defaultAmount
                ]
            );

            return {
                id: result.insertId,
                ...donation
            };
        } catch (error) {
            console.error('Error in addDonation with data:', donation);
            throw error;
        }
    }
    // תיעוד תרומה חדשה
    async addDonationTransaction(transaction) {
        console.log("הגיעה תרומה");

        try {
            const [result] = await this.pool.query(`
            INSERT INTO donation_transactions 
            (category_id, amount, payment_id) 
            VALUES (?, ?, ?)`,
                [transaction.categoryId, transaction.amount, transaction.paymentId]
            );
            return { ...transaction, id: result.insertId };
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    // קבלת היסטוריית תרומות לקטגוריה
    async getDonationTransactions(categoryId) {
        try {
            const [result] = await this.pool.query(`
            SELECT * FROM donation_transactions 
            ORDER BY donation_date DESC`
            );
            return result;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }


    async putDonation(id, donation) {
        try {
            const res = await this.pool.query(`
            UPDATE donations
            SET  title =?, content = ?  ,images = ? 
                WHERE id = ?`,
                [donation.title, donation.content, donation.image, id]);

            return { ...donation, id: res.insertId };
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    async deleteDonation(id) {
        try {
            // יצירת טרנזקציה להבטחת עקביות הנתונים
            const connection = await this.pool.getConnection();
            await connection.beginTransaction();

            try {
                await connection.query(
                    'DELETE FROM donation_transactions WHERE category_id = ?',
                    [id]
                );
                const [result] = await connection.query(
                    'DELETE FROM donations WHERE id = ?',
                    [id]
                );

                if (result.affectedRows === 0) {
                    throw new Error(`קטגוריית תרומה עם מזהה ${id} לא נמצאה`);
                }
                await connection.commit();
                connection.release();

                return `קטגוריית תרומה עם מזהה ${id} נמחקה בהצלחה!`;
            } catch (error) {
                await connection.rollback();
                connection.release();
                throw error;
            }

        } catch (error) {
            console.error('שגיאה במחיקת קטגוריית תרומה:', error);
            throw error;
        }
    }
}

export default new Donations();
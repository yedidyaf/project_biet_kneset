import DatabaseFunctions from './DatabaseFunctions.js';

class ArticalHome extends DatabaseFunctions {
    async getArticalHome() {
        try {
            const [[result]] = await this.pool.query(`SELECT * FROM artical_home`);
            return result;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
    async putArticalHome( article) {
        try {
            const res = await this.pool.query(`
                UPDATE artical_home 
                SET title = ?, content = ?, images = ?
                WHERE id = ?`,
                [article.title, article.content, article.images, 2]);
    
            if (res.affectedRows === 0) {
                throw new Error(`Article with ID ${id} not found`);
            }
    
            return { ...article, id:res.insertId };
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    
    async deleteArticalHome(id) {
        try {
            const res = await this.pool.query(`DELETE FROM artical_home WHERE id = ?`, [id]);
    
            if (res.affectedRows === 0) {
                throw new Error(`Article with ID ${id} not found`);
            }
    
            return `Article with ID ${id} deleted successfully!`;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
    
    async addArticalHome(article) {
        try {
            const res = await this.pool.query(`
                INSERT INTO artical_home (  title, content ,images) 
                VALUES (?, ?, ?)`,
                [article.title, article.content, article.images]);

            return { ...article, id: res.insertId };
        } catch (error) {
            console.log(error);
            return error;
        }
    }
}

export default new ArticalHome();
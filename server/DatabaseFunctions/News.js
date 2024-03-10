import DatabaseFunctions from './DatabaseFunctions.js';

class News extends DatabaseFunctions {

    async getNews() {
        try {
            const [result] = await this.pool.query(`SELECT * FROM news`);
            return result;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
    async addArticalNews(article) {
        console.log("ooo"+article.date);
        try {
            const res = await this.pool.query(`
                INSERT INTO news ( date, title, content, author,images) 
                VALUES (?, ?, ?, ?, ?)`,
                [article.date, article.title, article.content, article.author, article.images]);

            return { ...article, id: res[0].insertId };
        } catch (error) {
            console.log(error);
            return error;
        }
    }


    async putArticleNews(id, article) {
        try {
            const res = await this.pool.query(`
                UPDATE news 
                SET date = ?, title = ?, content = ?, author = ?, images = ?
                WHERE id = ?`,
                [article.date, article.title, article.content, article.author, article.images, id]);

            if (res.affectedRows === 0) {
                throw new Error(`Article with ID ${id} not found`);
            }

            return { ...article, id };
        } catch (error) {
            console.log(error);
            return error;
        }
    }


    async deleteArticleNews(id) {
        try {
            const res = await this.pool.query(`DELETE FROM news WHERE id = ?`, [id]);
    
            if (res.affectedRows === 0) {
                throw new Error(`Article with ID ${id} not found`);
            }
    
            return `Article with ID ${id} deleted successfully!`;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
}

export default new News();
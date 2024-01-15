import mysql from 'mysql2/promise';
import 'dotenv/config'
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password:process.env.SQL_PASSWORD,
    database: 'bite_kneset_tg'
});

class DatabaseFunctions {
    constructor(pool) {
        this.pool = pool;
    }

    async getArticalHome() {
        try {
            const [[result]] = await this.pool.query(`SELECT * FROM artical_home`);
            console.log(result);
            return result;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
    async putArticalHome( article) {
        console.log("ooooooooooo"+article);
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
    async getNews() {
        try {
            const [result] = await this.pool.query(`SELECT * FROM news`);
            console.log(result);
            return result;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
    async getTimes() {
        try {
            const [result] = await this.pool.query(`SELECT * FROM times`);
            console.log(result);
            return result;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    async getMembers() {
        try {
            const [result] = await this.pool.query(`SELECT * FROM members`);
            console.log(result);
            return result;
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    async getDonations() {
        try {
            const [result] = await this.pool.query(`SELECT * FROM donations`);
            console.log(result);
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
                SET  is_v = 1
                WHERE id = ?`,
                [ id]);
    
            if (res[0].affectedRows === 0) {
                throw new Error(`Member with ID ${id} not found`);
            }
    
            return { ...member, id };
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    
    async deleteMember(id) {
        try {
            const res = await this.pool.query(`DELETE FROM members WHERE id = ?`, [id]);
    
            if (res.affectedRows === 0) {
                throw new Error(`Member with ID ${id} not found`);
            }
    
            return `Member with ID ${id} deleted successfully!`;
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


    
    async addTime(times) {
        try {
            const res = await this.pool.query(`
                INSERT INTO times (name, time, is_sabbath) 
                VALUES (?, ?, ?)`,
                [times.name, times.time, times.is_sabbath]);
    
            return { ...times, id: res.insertId };
        } catch (error) {
            console.log(error);
            return error;
        }
    }


    async putTimes(id, times) {
        console.log(id);
        console.log(times);
        try {
            const res = await this.pool.query(`
                UPDATE times 
                SET name = ?, time = ?, is_sabbath = ?
                WHERE id = ?`,
                [times.name, times.time, times.is_sabbath, id]);

            if (res.affectedRows === 0) {
                throw new Error(`Article with ID ${id} not found`);
            }

            return { ...times, id };
        } catch (error) {
            console.log(error);
            return error;
        }
    }


    async deleteTime(id) {
        try {
            const res = await this.pool.query(`DELETE FROM times WHERE id = ?`, [id]);
    
            if (res.affectedRows === 0) {
                throw new Error(`Times with ID ${id} not found`);
            }
    
            return `Times with ID ${id} deleted successfully!`;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
    async addDonation(donation){
        console.log(donation.image);
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
         
            // מחק את הגבאי בטבלת gabais לפי ה-ID של החבר
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
            console.log(result);
            return result;
        } catch (error) {
            console.error(error);
            return error;
        }
    }
    async checkGabai(credentials) {
        console.log(credentials);
        try {
            // בדיקה האם יש גבאי עם שם משתמש וסיסמה כפי שהתקבלו מהאובייקט
            const [result] = await pool.query(`
                SELECT * FROM gabais
                WHERE user_id = ? AND password = ?`,
                [credentials.user_id, credentials.password]);
    console.log(result);
            // אם יש גבאי עם השם משתמש והסיסמה, תחזיר את הגבאי
            if (result.length > 0) {
                
                return result[0];
            } else {
                
                // אחרת, תחזיר `null` או הודעה שאין גבאי כזה
                return null;
            }
        } catch (error) {
            console.error(error);
            // במקרה של שגיאה, תחזיר את השגיאה
            return error;
        }
    }



    async addDayTimes(data) {
        try {
            const res = await this.pool.query(`
                INSERT INTO day_times 
                (alotHaShachar, misheyakir, sunrise, sofZmanShma, sofZmanShmaMGA, 
                 sofZmanTfilla, sofZmanTfillaMGA, chatzot, sunset, tzeit7083deg) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    data.alotHaShachar,
                    data.misheyakir,
                    data.sunrise,
                    data.sofZmanShma,
                    data.sofZmanShmaMGA,
                    data.sofZmanTfilla,
                    data.sofZmanTfillaMGA,
                    data.chatzot,
                    data.sunset,
                    data.tzeit7083deg
                ]);

            return { ...data, id: res.insertId };
        } catch (error) {
            console.error(error);
            return error;
        }
    }

    async getDayTimes() {
        try {
            const [result] = await this.pool.query(`
                SELECT * FROM day_times`);
    
            if (result.length === 0) {
                throw new Error('No day times data found');
            }
    
            // החזרת הנתונים מהשאילתה
            return result[0];
        } catch (error) {
            console.error(error);
            return error;
        }
    }
}


const dbFunctions = new DatabaseFunctions(pool);


export default dbFunctions;






// async addUser(user) {
    //     try {
    //         const res = await this.pool.query(`
    //         INSERT INTO users (user_name, first_name, last_name, password, email) 
    //         VALUES (?, ?, ?, ?, ?)`,
    //             [user.user_name, user.first_name, user.last_name, user.password, user.email]);

    //         return { ...user, id: res.insertId };
    //     } catch (error) {
    //         console.log(error);
    //         return error;
    //     }
    // }

    // async addPost(post) {
    //     try {
    //         const res = await this.pool.query(`
    //         INSERT INTO posts (user_id, title, body) 
    //         VALUES (?, ?, ?)`, [post.user_id, post.title, post.body]);
    //         return { ...post, id: res.insertId };
    //     } catch (error) {
    //         console.log(error);
    //         return error;
    //     }
    // }

    // async addComment(comment) {
    //     try {
    //         const res = await this.pool.query(`
    //         INSERT INTO comments (post_id, name, email, body)
    //          VALUES (?, ?, ?, ?)`,
    //             [comment.post_id, comment.name, comment.email, comment.body]);

    //         return { ...comment, id: res.insertId };
    //     } catch (error) {
    //         console.log(error);
    //         return error;
    //     }
    // }

    // async addTodo(todo) {
    //     try {
    //         const res = await this.pool.query(`
    //         INSERT INTO todos (user_id, title, is_completed)
    //          VALUES (?, ?, ?)`, [todo.user_id, todo.title, todo.is_completed]);
    //         return { ...todo, id: res.insertId };
    //     } catch (error) {
    //         console.log(error);
    //         return error;
    //     }
    // }


    // async getUser(user) {
    //     try {
    //         const [[result]] = await this.pool.query(`
    //         SELECT * FROM users
    //         WHERE user_name = ? AND password = ?`,
    //             [user.user_name, user.password]);
    //        console.log(result);
           
    //             return result;

    //     } catch (error) {
    //         console.error(error);
    //         return error;
    //     }
    // }

    // async checkUser(user_id) {
    //     try {
    //         const [result] = await this.pool.query(`SELECT * FROM users
    //          WHERE id = ${user_id}`);
    //         return result;
    //     } catch (error) {
    //         console.error(error);
    //         return "error, Unregistered user!!";
    //     }
    // }
    // async getComments(post_id) {
    //     try {
    //         const [result] = await this.pool.query(`SELECT * FROM comments
    //          WHERE post_id = ${post_id}`);
    //         return result;
    //     } catch (error) {
    //         console.error(error);
    //         return "error, dont have comments for this post";
    //     }
    // }
    // async getTodosByUserId(userId) {
    //     try {
    //         const [result] = await this.pool.query(`SELECT * FROM todos WHERE user_id = ?`, [userId]);
    //         return result;
    //     } catch (error) {
    //         console.error(error);
    //         return error;
    //     }
    // }
    // async getPostsByUserId(userId) {
    //     try {
    //         const [result] = await this.pool.query(`SELECT * FROM posts WHERE user_id = ?`, [userId]);
    //         return result;
    //     } catch (error) {
    //         console.error(error);
    //         return error;
    //     }
    // }
    // //
    // async changeStatusTodo( taskId) {
    //     try {
    //         const res = await this.pool.query(
    //             `UPDATE todos 
    //         SET is_completed = NOT is_completed 
    //         WHERE id = ? `,
    //             [ taskId]);
    //             return res;
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    // async deleteById(id, table) {
    //     try {
    //         const res = await this.pool.query(`DELETE FROM ${table} WHERE id = ?`, [id]);
    //         return `Record with ID ${id} deleted successfully!`;
    //     } catch (error) {
    //         console.error(error);
    //         return error;
    //     }
    // }
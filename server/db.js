// import mysql from 'mysql2/promise';

// class DatabaseFunctions {
//     constructor(pool) {
//         this.pool = pool;
//     }

//     async getArticalsHome() {
//         try {
//             const [[result]] = await this.pool.query(`SELECT * FROM home`);
//             console.log(result);
//             return result;
//         } catch (error) {
//             console.error(error);
//             return error;
//         }
//     }

//     async getTimes() {
//         try {
//             const [[result]] = await this.pool.query(`SELECT * FROM times`);
//             console.log(result);
//             return result;
//         } catch (error) {
//             console.error(error);
//             return error;
//         }
//     }

//     async getMembers() {
//         try {
//             const [[result]] = await this.pool.query(`SELECT * FROM members`);
//             console.log(result);
//             return result;
//         } catch (error) {
//             console.error(error);
//             return error;
//         }
//     }

//     async getDonations() {
//         try {
//             const [[result]] = await this.pool.query(`SELECT * FROM donations`);
//             console.log(result);
//             return result;
//         } catch (error) {
//             console.error(error);
//             return error;
//         }
//     }

//     async setMember(member) {
//         try {
//             const res = await this.pool.query(`
//                 INSERT INTO members (name, email, phone) 
//                 VALUES (?, ?, ?)`,
//                 [member.name, member.email, member.phone]);

//             return { ...member, id: res.insertId };
//         } catch (error) {
//             console.log(error);
//             return error;
//         }
//     }
// }

// const dbFunctions = new DatabaseFunctions(pool);

// export default dbFunctions;






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
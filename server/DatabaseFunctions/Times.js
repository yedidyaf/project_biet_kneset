import DatabaseFunctions from './DatabaseFunctions.js';

class Times extends DatabaseFunctions {
    async getTimes() {
        try {
            const [result] = await this.pool.query(`SELECT * FROM times`);
            return result;
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
    async updateDayTimes(data) {
        try {
          const res = await this.pool.query(`
            UPDATE day_times 
            SET 
              alotHaShachar = ?,
              misheyakir = ?,
              sunrise = ?,
              sofZmanShma = ?,
              sofZmanShmaMGA = ?,
              sofZmanTfilla = ?,
              sofZmanTfillaMGA = ?, 
              chatzot = ?,
              sunset = ?,
              tzeit7083deg = ?  
            WHERE id = ?`,
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
              data.tzeit7083deg,
              1
            ]
          );
      
          return {...data};
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
            return result[0];
        } catch (error) {
            console.error(error);
            return error;
        }
    }
}

export default new Times();
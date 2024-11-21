import DatabaseFunctions from './DatabaseFunctions.js';
import { DateTime } from 'luxon';

class Times extends DatabaseFunctions {
    async getTimes() {
        try {
            const [times] = await this.pool.query('SELECT * FROM times');
            const dayTimes = await this.getDayTimes();
            
            console.log('Day times:', dayTimes); // לוג של זמני היום
    
            return Promise.all(times.map(async (time) => {
                const processedTime = {
                    ...time,
                    is_fixed_time: Boolean(time.is_fixed_time),
                    is_sabbath: Boolean(time.is_sabbath),
                    is_before: Boolean(time.is_before)
                };
    
                if (!processedTime.is_fixed_time && processedTime.reference_time) {
                    const referenceTime = dayTimes[processedTime.reference_time];
                    console.log('Reference time:', processedTime.reference_time, referenceTime); // לוג של זמן הייחוס
                    
                    if (referenceTime) {
                        try {
                            const refDateTime = DateTime.fromISO(referenceTime);
                            console.log('Parsed reference time:', refDateTime.toString()); // לוג של הזמן אחרי פרסור
                            
                            const calculatedTime = processedTime.is_before
                                ? refDateTime.minus({ minutes: processedTime.minutes_offset || 0 })
                                : refDateTime.plus({ minutes: processedTime.minutes_offset || 0 });
                            
                            console.log('Calculated time:', calculatedTime.toString()); // לוג של הזמן המחושב
                            
                            processedTime.calculated_time = calculatedTime.toFormat('HH:mm');
                        } catch (error) {
                            console.error('Error calculating time:', error);
                            processedTime.calculated_time = null;
                        }
                    } else {
                        console.log('Reference time not found:', processedTime.reference_time);
                        processedTime.calculated_time = null;
                    }
                }
    
                return processedTime;
            }));
        } catch (error) {
            console.error('Error in getTimes:', error);
            throw error;
        }
    }

    async addTime(times) {
        try {
            const query = `
                INSERT INTO times (
                    name, 
                    time,
                    is_sabbath,
                    is_fixed_time,
                    reference_time,
                    minutes_offset,
                    is_before
                ) 
                VALUES (?, ?, ?, ?, ?, ?, ?)`;

            const values = [
                times.name,
                times.is_fixed_time ? times.time : null,
                times.is_sabbath ? 1 : 0,
                times.is_fixed_time ? 1 : 0,
                times.is_fixed_time ? null : times.reference_time,
                times.is_fixed_time ? null : parseInt(times.minutes_offset || 0),
                times.is_before ? 1 : 0
            ];

            const [res] = await this.pool.query(query, values);
            return { ...times, id: res.insertId };
        } catch (error) {
            console.error('Error in addTime:', error);
            throw error;
        }
    }

    async putTimes(id, times) {
        try {
            const query = `
                UPDATE times 
                SET 
                    name = ?,
                    time = ?,
                    is_sabbath = ?,
                    is_fixed_time = ?,
                    reference_time = ?,
                    minutes_offset = ?,
                    is_before = ?
                WHERE id = ?`;

            const values = [
                times.name,
                times.is_fixed_time ? times.time : null,
                times.is_sabbath ? 1 : 0,
                times.is_fixed_time ? 1 : 0,
                times.is_fixed_time ? null : times.reference_time,
                times.is_fixed_time ? null : parseInt(times.minutes_offset || 0),
                times.is_before ? 1 : 0,
                id
            ];

            const [res] = await this.pool.query(query, values);
            if (res.affectedRows === 0) {
                throw new Error(`Time with ID ${id} not found`);
            }

            return { ...times, id };
        } catch (error) {
            console.error('Error in putTimes:', error);
            throw error;
        }
    }

    async deleteTime(id) {
        try {
            const [res] = await this.pool.query('DELETE FROM times WHERE id = ?', [id]);
            
            if (res.affectedRows === 0) {
                throw new Error(`Time with ID ${id} not found`);
            }
            
            return `Time with ID ${id} deleted successfully`;
        } catch (error) {
            console.error('Error in deleteTime:', error);
            throw error;
        }
    }

    async updateDayTimes(data) {
        try {
            const query = `
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
                WHERE id = 1`;  // תמיד נעדכן את השורה הראשונה

            const values = [
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
            ];

            const [result] = await this.pool.query(query, values);
            
            if (result.affectedRows === 0) {
                // אם אין שורה, ניצור אחת חדשה
                const insertQuery = `
                    INSERT INTO day_times (
                        alotHaShachar, misheyakir, sunrise, 
                        sofZmanShma, sofZmanShmaMGA,
                        sofZmanTfilla, sofZmanTfillaMGA,
                        chatzot, sunset, tzeit7083deg
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

                await this.pool.query(insertQuery, values);
            }

            return { ...data };
        } catch (error) {
            console.error('Error in updateDayTimes:', error);
            throw error;
        }
    }

    async getDayTimes() {
        try {
            const [rows] = await this.pool.query('SELECT * FROM day_times LIMIT 1');
            
            if (rows.length === 0) {
                throw new Error('No day times found');
            }

            // המרת כל השעות לפורמט ISO
            const dayTimes = rows[0];
            const currentDate = DateTime.now().toFormat('yyyy-MM-dd');
            
            const formattedTimes = {};
            for (const [key, value] of Object.entries(dayTimes)) {
                if (value && key !== 'id') {
                    formattedTimes[key] = `${currentDate}T${value}`;
                }
            }

            return formattedTimes;
        } catch (error) {
            console.error('Error in getDayTimes:', error);
            throw error;
        }
    }

}



export default new Times();
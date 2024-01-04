import fs from 'fs/promises';
import path from 'path';

// נתיב לתיקיית השמירה
const imageUploadPath = 'C:/Users/user/Desktop/project_biet_kneset/server/images/';

const handleImages = async (imagePaths) => {
    console.log(imagePaths);
  try {
    const savedPaths = [];

    for (const imagePath of imagePaths) {
      // קביעת שם קובץ ייחודי
      const uniqueFileName = Date.now() + '-' + path.basename(imagePath);
      const destinationPath = path.join(imageUploadPath, uniqueFileName);

      // קריאה מהנתיב הנתון ושמירה בתיקייה
      const imageBuffer = await fs.readFile(imagePath);
      await fs.writeFile(destinationPath, imageBuffer);

      // הוספת נתיב לתמונה שנשמרה למערך התוצאה
      savedPaths.push(destinationPath);
    }

    return savedPaths;
  } catch (error) {
    console.error('שגיאה בטיפול בתמונות:', error);
    throw error;
  }
};

export default handleImages;

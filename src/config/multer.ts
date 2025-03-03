import crypto from 'crypto';
import multer from 'multer'

import { extname, resolve } from 'path'

export default {
    upload(folder: string) {
        
        return {
            storage: multer.diskStorage({
                destination: (req, file, cb) => {
                    cb(null, resolve(__dirname, '..', '..', folder));
                },
                filename: (req, file, cb) => {
                    const fileHash = crypto.randomBytes(16).toString("hex");
                    const fileName = `${fileHash}-${file.originalname}`;
                    
                    cb(null, fileName);
                }
            }),
            fileFilter: (req, file, cb) => {
                console.log('Received file:', file.originalname); // Debug
                const allowedMimes = [
                    'image/jpeg',
                    'image/jpg',
                    'image/png'
                ];

                if (allowedMimes.includes(file.mimetype)) {
                    cb(null, true);
                } else {
                    cb(new Error(`Invalid file type: ${file.mimetype}`));
                }
            },
            limits: {
                fileSize: 5 * 1024 * 1024 // 5MB
            }
        }
    }
}
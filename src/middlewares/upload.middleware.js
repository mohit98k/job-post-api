import multer from "multer";
import AppError from "../utils/AppError.js"

const storage = multer.memoryStorage();//using ram of the

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);//accepting it 
    } else {
        cb(new AppError('Only PDF files are allowed!', 400), false);//rejecting it 
    }
};

export const upload=multer({
    storage:storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: fileFilter
})
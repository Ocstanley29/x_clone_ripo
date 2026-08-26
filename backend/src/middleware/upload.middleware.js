import multer from "multer";            

const storage = multer.memoryStorage();

const filter = (req, file, cb)=> {
    if ( file.mimeType.startWith("image/")) {
        cb(null, true);
    }else{
        cb(new Error("only image files is allowed"),false)
    }
};

const upload = multer({
    storage:storage,
    fileFilter:fileFilter,
    limits: {fileSize:5 * 1024*1024}, //5MB

});

export default upload
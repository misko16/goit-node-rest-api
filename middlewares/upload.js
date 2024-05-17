const multer = require("multer");
const path = require("path");

const destination = path.resolve("public", "avatars");

const storage = multer.diskStorage({
    destination: destination,
    filename:(req, file, cb) => {
        const uniqPrefix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
        const fileName = `${uniqPrefix}_${file.originalname}`;
        cb(null, fileName);
    },
});

const limits = {
    fileSize: 5 * 1024 * 1024,
}

const fileFilter = (req, file, cb) => {
    if(file.originalname.split('.').pop() === 'exe'){
        cb(new Error("File extention not allow"));
    }
    cb(null, true);
}

const upload = multer({
    storage,
    limits,
    fileFilter,
})

module.exports = { upload }
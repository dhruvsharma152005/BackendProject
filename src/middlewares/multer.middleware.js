import multer from "multer"


//give full control on storing file to disk
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/temp')   //callback
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  export const upload = multer
  (
    { storage: storage }
  ).single('file') //single file upload   
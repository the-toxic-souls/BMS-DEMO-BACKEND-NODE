import util from "util";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import { dbConnection } from "@/database";

var storage = new GridFsStorage({
  url: dbConnection,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-nazim-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: 'movies_photos',
      filename: `${Date.now()}-nazim_test-${file.originalname}`
    };
  }
});

var uploadFiles = multer({ storage: storage }).array("files", 10);
// var uploadFiles = multer({ storage: storage }).single("file");
var uploadFilesMiddleware = util.promisify(uploadFiles);
export default uploadFilesMiddleware;
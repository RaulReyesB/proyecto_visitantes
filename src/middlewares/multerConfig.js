// middlewares/multerConfig.js
import multer from "multer";
import path from "path";

// Configuración de almacenamiento de multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/public/uploads/"); // Carpeta donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para cada archivo
  },
});

// Inicializar multer con la configuración de almacenamiento
const upload = multer({ storage: storage });

export default upload;

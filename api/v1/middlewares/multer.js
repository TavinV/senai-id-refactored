import multer from 'multer';
import path from 'path'
import { fileURLToPath } from 'url';


// Para utilizar o __filename e __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../../db/fotos_perfil'))
    },
    filename: (req, file, cb) => {
        console.log(req.body)
        const chavePrimaria = req.body.matricula || req.body.nif;
        if (!chavePrimaria) {
            return cb(new Error("Matrícula é necessária para nomear o arquivo"));
        }
        cb(null, `${chavePrimaria}_pfp${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });


export default upload;
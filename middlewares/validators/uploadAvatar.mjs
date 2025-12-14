import multer from "multer";
import path from "path";
import fs from "fs";

const AVATAR_PATH = "public/uploads/avatars";

if (!fs.existsSync(AVATAR_PATH)) {
  fs.mkdirSync(AVATAR_PATH, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, AVATAR_PATH);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, name);
  }
});

const uploadAvatar = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp"];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Formato no permitido"));
    }
    cb(null, true);
  }
});

export default uploadAvatar;
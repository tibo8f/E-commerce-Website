import path from "path";
import fs from "fs/promises";
// import { storeImageDetails } from "./script.ts";
import { useSearchParams } from "next/navigation.js";
import { PrismaClient } from "@prisma/client";
import { cookies } from 'next/headers'

function extractEmailFromCookie(cookie: string): string | undefined {
  const parts = cookie.split(';')
  if (parts.length > 0) {
      return parts[0].trim()
  }
  return undefined
}

export const dynamic = "force-dynamic"; // defaults to auto
export async function POST(request: Request) {
  const formData = await request.formData();
  console.log(formData);

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;
  const price = formData.get("price") as string;
  const file = formData.get("imageData") as File;
  const fileContent = Buffer.from(await file.arrayBuffer());
  const hash = title // hasher le titre utiliser uui ou  un hashage pour que le titre soit sur d'etre correct et differents pour chaque fichier

  const dir = "public/images/" + hash + ".jpg"; // carefull tilte can be unapropiate replace test by title
  let filename = path.join(dir, file.name);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(filename, fileContent);
  console.log(filename);
  const [extension, ...name] = filename.split(".").reverse();


  // Mettre en DB
  const prisma = new PrismaClient()
  const cookieStore = cookies()
  const userEmailCookie = cookieStore.get('email')?.value
  const userEmail = userEmailCookie ? extractEmailFromCookie(userEmailCookie) : undefined
  console.log(userEmail);

  const existingUser = await prisma.user.findUnique({
      where: {
        email: userEmail, 
      },
    });
    
    if (existingUser) {
      const newArticle = await prisma.article.create({
        data: {
          title: title,
          authorId: existingUser.id,
          content: content,
          price: parseInt(price),
          image: filename.replace("public/", ""),
        },
      });
      
      console.log('New article created:', newArticle);
    } else {
      console.log('User not found');
    }
    
  // View what's inside the database
    const dataArticle = await prisma.article.findMany() // Affiche les posts
    console.log(dataArticle)

  return Response.json({ title, file });
}
















// export async function POST(request: Request) {
//   console.log('POST request');
//   const formData = await request.formData();
//   console.log(formData);
//   // return Response.json("post request for image", formData)
// }






// const express = require('express');
// const cors = require("cors");

// const path = require('path');
// const multer = require('multer');

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './public/images');
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + path.extname(file.originalname));
//     },
//   });
  
//   const upload = multer({
//     storage: storage,
//     fileFilter: (req, file, cb) => {
//       if (
//         file.mimetype == 'image/png' ||
//         file.mimetype == 'image/jpg' ||
//         file.mimetype == 'image/jpeg'
//       ) {
//         cb(null, true);
//       } else {
//         cb(null, false);
//         return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//       }
//     },
//   });
//   const app = express();

//   app.use(express.json());
//   app.use(express.urlencoded({extends:true}));
//   app.use(cors());

//   // const uploadImages = upload.array('image');

//   app.post("/api/images", upload.single("image"), (req, res) => {
//     res.json({files: req.files});
//   });

//   app.listen(3000, () => {
//     console.log('Server is running');
//   });






  // app.post('/files').post(async (req: any, res: any) => {
  //   uploadImages(req, res, function (err: any) {
  //     if (err) {
  //       return res.status(400).send({ message: err.message });
  //     }
  //     // Everything went fine.
  //     const files = req.files;
  //     res.json(files);
  //   });
  // });
  




// const express = require('express')
// const app = express()
// const port = 3000
// const cors = require('cors')
// const multer = require('multer')

// const storage = multer.diskStorage({
//   destination: (req: any, file: any, callback: (arg0: null, arg1: string) => void) => {
//     callback(null, ("./public/images") );  // ->("./uploads")  this is the destination where files will save in the HArdDisk Storage 
//   },
//   filename: (req: any, file: { originalname: any }, callback: (arg0: null, arg1: any) => void) => {
//     callback(null, file.originalname);
//   },
// });

// const upload = multer({ storage: storage })

// app.use(cors())

// app.post('/image', upload.single('file'), async (req: any, res: any) => {
//   res.json({})
// })

// app.listen(port, () => {
//   console.log(`listening at http://localhost:${port}`)
// })



// export async function POST(request: Request) {
//   console.log('POST request image');
//   // Get the json file with the form data filed on the front-end
//   const formData = await request.json();
//   console.log(formData);
// }
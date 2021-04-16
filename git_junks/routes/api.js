const express = require('express');
const movie = require('../models/movies');
const account = require('../models/accounts');
const slide = require('../models/slide');
const multer = require('multer');
const router = express.Router();
const fs = require('fs')
const path = require('path')
require('dotenv').config()
require('./cloudinary')
const cloudinary = require('cloudinary')

const nodemailer = require('nodemailer')
const hbs = require('nodemailer-express-handlebars')
const nodemailMailgun = require("nodemailer-mailgun-transport")

const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;

//IMAGE STORAGE







const storage = multer.diskStorage({



    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }

});

//VIDEO STORAGE
const videoStorage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, './uploads')

    },

    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }

});

//IMAGE FILTER
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'video/mp4') {
        cb(null, true);
    } else {
        cb(null, false);
       
    }

}

//VIDEO FILTER
const videoFilter = (req, file, cb) => {
    if (file.mimetype === 'video/mp4') {
        cb(null, true);
    } else {
        cb(null, false);
       
    }

}

//IMAGE UPLOAD 
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 20 },
    fileFilter: fileFilter,
})

//VIDEO UPLOAD 
const videos = multer({
    storage: videoStorage,
    limits: { fileSize: 1024 * 1024 * 20 },
    fileFilter: videoFilter,
})




//PHOTO ROUTER WITH MELTER
router.post('/photos', upload.single('file'), async (req, res, next) => {

    cloudinary.v2.uploader.upload(req.file.path, { tags: 'basic_sample' }, function (err, image) {
       
        if (err) { console.warn(err); }
        res.json({ path: `${image.url}` });
      });


/*
    const file = await cloudinary.v2.uploader.upload(req.file.path)

    const filePath = { path: `${file.secure_url}` }


    if (file === null) {
      

    }
    else {
        res.json(filePath);
    }*/
})


//VIDEO ROUTER WITH MELTER
router.post('/videos', videos.single('file'), (req, res, next) => {


    const file = req.file

    const filePath = { path: `${file.filename}` }
   

    if (req.file === null) {
     
    }
    else {
        res.json(filePath);
    }
})


//VIDEO STREAM
router.get('/videostream/:id', (req, res, error) => {

    const filename = { file: req.params.id }
    const paths = `./uploads/${filename.file}`

    const streams = (path) => {
        const stat = fs.statSync(path)


        const fileSize = stat.size
        const range = req.headers.range

        if (range) {
            const parts = range.replace(/bytes=/, "").split("-")
            const start = parseInt(parts[0], 10)
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1
            const chunkSize = (end - start) + 1
            const file = fs.createReadStream(path, { start, end })
            const head = {
                'Content-Range': `bytes ${start} - ${end} / ${fileSize}`,
                'Content-Ranges': 'bytes',
                'Content-Length': chunkSize,
                'content-Type': 'video/mp4'
            }
            res.writeHead(206, head)
            file.pipe(res)

        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4'
            }
            res.writeHead(200, head)
            fs.createReadStream(path).pipe(res)
        }

    }


    fs.exists(paths, (file) => {
        if (file) {
            const path = `./uploads/${filename.file}`
            streams(path)
          
        }
        else {
            const path = `./uploads/1610498552154-manh.mp4`
            streams(path)
          
        }
    })



})

//MOVIES ROUTER
router.get('/movieget', (req, res) => {
    movie.find({}).then(commenter => {
      
        res.json(commenter)
    }).catch(error => {
        if (error) {
          
        }
    })

})

router.post('/moviepost', (req, res, next) => {
    const data = req.body;
    const newMovies = new movie(data);

   

    newMovies.save((error) => {
        if (error) {
        
        }
        else {
          
            res.json('movie added')
        }
    });

})



router.put('/movieput/:id', (req, res, next) => {
   
    movie.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
        movie.findOne({ _id: req.params.id }).then(movie => {
            res.json(movie)
          
        }).catch(next, () => { console.log('if not send') })

    })
})


//ACCOUNT ROUTER
router.get('/accountget', (req, res) => {
    account.find({}).then(myAccount => {
       
        res.json(myAccount)
    }).catch(error => {
        if (error) {
           
        }
    })

})


const myOAuth2Client = new OAuth2(
    "197031445043-fb9g1erl4uisdthicjhdcvf4pp0m1542.apps.googleusercontent.com",
    "9aYCyB1nMlJn1MKU4kNjdryo",
    "https://developers.google.com/oauthplayground"
    )


    myOAuth2Client.setCredentials({
        refresh_token:"1//04XKe3cjv_jjqCgYIARAAGAQSNwF-L9IrWWjL0kUs4dNf2YOwQ2n6uMh9xc6thM2jfWqWDX1IHrr7BwhOhokEcdnV3n7zZGTxRjo"
    });
        

router.post('/accountpost', (req, res, next) => {
    const data = req.body;


    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            type: "OAuth2",
            user: process.env.EMAIL, 
            clientId:"197031445043-fb9g1erl4uisdthicjhdcvf4pp0m1542.apps.googleusercontent.com",
            clientSecret: "9aYCyB1nMlJn1MKU4kNjdryo",
            refreshToken: "1//04XKe3cjv_jjqCgYIARAAGAQSNwF-L9IrWWjL0kUs4dNf2YOwQ2n6uMh9xc6thM2jfWqWDX1IHrr7BwhOhokEcdnV3n7zZGTxRjo",
            accessToken: myOAuth2Client 
        }
    })

   

       transporter.use('compile', hbs({
        viewEngine: {
            extname: ".hbs",
            partialsDir: path.resolve(__dirname, "views"),
            defaultLayout: false
          },
          viewPath: path.resolve(__dirname, "views"),
          extname: ".hbs"
    }))

   
   


    const { email } = data

    console.log(email)

    let mailOptons = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Cloudfoud Rest-Api',
        text: 'you QR CODE Adress was successfully made, now you can enjoy unlimited pull-request',
         template: 'index'

    }

    transporter.sendMail(mailOptons, (err, data) => {
        if (err) {
            err
        } else {
            console.log('email sent!')
        }
    })



    /*  const newAccount = new account(data);
      console.log('ACCOUNT', data)
      newAccount.save((error) => {
          if (error) {
              console.log('Ooops something went wrong on account');
          }
          else {
              console.log('data has been save on account');
          }
      });*/

})

router.put('/accountput/:id', (req, res, next) => {
   
    account.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
        account.findOne({ _id: req.params.id }).then(myAccount => {
            res.json(myAccount)
          
        }).catch(next, () => {})

    })
})

//SLIDE BAR ROUTER
router.get('/slideget', (req, res) => {
    slide.find({}).then(mySlide => {
       
        res.json(mySlide)
    }).catch(error => {
        if (error) {
          
        }
    })

})

router.put('/slideput/:id', (req, res, next) => {
    
    slide.findByIdAndUpdate({ _id: req.params.id }, req.body).then(() => {
        slide.findOne({ _id: req.params.id }).then(mySlide => {
            res.json(mySlide)
           
        }).catch(next, () => {  })

    })
})


router.post('/slidepost', (req, res, next) => {
    const data = req.body;
    const newSlide = new slide(data);
    
    newSlide.save((error) => {
        if (error) {
          
        }
        else {
           
        }
    })



})




module.exports = router;


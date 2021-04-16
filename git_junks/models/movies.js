const mongoose = require('mongoose');




const Movie = mongoose.Schema;



const moviesSchema = new Movie({

    name: String,
    video: String,
    icon: String,
    thumbnail: String,
    genre:String,
    duration: {
        hour: Number,
        min: Number
    },
    rate: [Object],

    info: String,
    photo: [String],



    comments: [{
        id: Number,
        date: String,
        user: [Object],

        comment: String,
        rate: [Object],

        replys: [{
            id: Number,
            date: String,
            user: [Object],
            reply: String,

        }],
    }]

});

const movie = mongoose.model('movies', moviesSchema);

/*const movies = {

    name: 'mulan',
    video: 'xxxxxx',
    icon: 'xxxxxx',
    thumbnail: 'xxxxxxx',
    duration: {
        hour: 2,
        min: 30
    },
    rate: 2,

    info: '',
    photo: ['1xxxx', '2xxxxx', '3xxxxxxxx'],
    videos: ['1xxxxxx', '2xxxxx', '3xxxxx'],
   

    comments: [{
        id: 13,
        date: 1591104458232,
        user: [{
            image: 'xxxxxx',
            user_name: 'siphosethu',
            user_lastname: 'nhapho',
            user_email: 'nophora.nn@gmail.com',
            user_password: '728220145',
            date: 1243465654
        }],

        comment: 'this is my first comment on movies',
        rate: 5,

        replys: [{
            id: 16,
            date: 1591104458239,
            user: [{
                image: 'xxxxxx',
                user_name: 'john',
                user_lastname: 'mosh',
                user_email: 'mosh@gmail.com',
                user_password: '12345mosh',
                date: 1243465654
            }],
            reply: 'you realy have develop you have develop you skills boy ',

        }],



    }]

};

const newMovies = new movie(movies);

newMovies.save((error) => {
    if (error) {
        console.log('Ooops something went  wrong  on movies');
    }
    else {
        console.log('data has been save on movies');
    }
});*/

module.exports = movie;






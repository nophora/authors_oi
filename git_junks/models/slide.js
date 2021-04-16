const mongoose = require('mongoose');



const Slide = mongoose.Schema;

const slideSchema = new Slide({
    slideImage1: String,
    slideImage2: String,
    slideImage3: String,
    slideInfo1: String,
    slideInfo2: String,
    slideInfo3: String,
});



const slide = mongoose.model('slide', slideSchema);

/*const mySlide = {
    slideImage1: '1xxxxx',
    slideImage2: '2xxxxxx',
    slideImage3: '3xxxxxxx',
    slideInfo1: 's111111',
    slideInfo2: 's222222',
    slideInfo3: 's333333',
};
https://cloudinary.com/console/lui#

const slides = new slide(mySlide);

slides.save((error) => {
    if (error) {
        console.log('Ooops something went wrong on slide');
    }
    else {
        console.log('data has been save on slide');
    }
});*/

module.exports = slide;
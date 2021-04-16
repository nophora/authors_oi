const mongoose = require('mongoose');



const Account = mongoose.Schema;

const accountSchema = new Account({
    image: String,
    user_name: String,
    user_lastname: String,
    user_email: String,
    user_password: String,
    date: String,
});


const account = mongoose.model('account', accountSchema);

/*const myAccount = {
    image: 'xxxxxx',
    user_name: 'siphosethu',
    user_lastname: 'nhapho',
    user_email: 'nophora.nn@gmail.com',
    user_password: '728220145',
    date: 1243465654,

};


const accounts = new account(myAccount);

accounts.save((error) => {
    if (error) {
        console.log('Ooops something went wrong on accounts');
    }
    else {
        console.log('data has been save on accounts');
    }
});*/

module.exports = account;
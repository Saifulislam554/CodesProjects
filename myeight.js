var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'email',
    auth:{
        user: "yourusername@gmail.com";
        pass: "yourpassword";

    }

})
let mailoptions = {
    from: 'yourusername@gmail.com',
    to: 'receiver@gmail.com;
    subject: 'Assignment';
    text: 'Assignment will be sent to your email address';
};
transporter.sendMail(mailoptions, function(err, info){
    if (err) throw err;
    console.log('Email sent', info.response);
})

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
       auth: {
            user: 'charlywandja@gmail.com',
            pass: 'jffslnbtgnecafwv',
         },
    secure: true,
    });

exports.send = (req, res) => {
    console.log("send")
    const mailData = {
        to : "charlywandja@gmail.com",
        from: "charlywandja@gmail.com",
        subject : "site internet",
        html: req.body.text
    }

    transporter.sendMail(mailData, (err, info) => {
        if(err){
            console.log(err)
        }
        else{
            console.log('Email sent: ' + info);
            res.status(200).json({error:req.body.text});
        }
        
    } )
    
}

const fetch = require('node-fetch')

exports.validateHuman = async (req,res,next) =>{
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    console.log(process.env.RECAPTCHA_SECRET_KEY)
    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${req.body.captchaToken}`)
    const data = await response.json()
    data.success ? next() : res.status(400).json({message:"robot"})

    
}
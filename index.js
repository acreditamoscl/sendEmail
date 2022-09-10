const express = require("express");
const cors = require('cors')
const nodemailer = require("nodemailer");

const app = express()
// middlewares
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.set('port', process.env.PORT || 8040);

function main(obj) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // use TLS
        //FreeMail
        //wihetkheeqvhytza
        auth: {
          user: "acreditamos.cl@gmail.com",
          pass: "hermanito123",
        }
      });
    let message = {
      from: "acreditamos.cl@gmail.com",
      ...obj
    };
    // send mail with defined transport object
    transporter.sendMail(message, (err, info)=>err?console.log(err):console.log(info));
}
app.post("/email", (req, res)=>{
  
  main(req.body)
  console.log('new cliente')
  res.send("enviado")
})

app.listen(app.get('port'), ()=>{
  console.log("iniciado en el puerto: "+app.get('port'))
})

// {
//   to: "jvrbanquez@gmail.com",
//   subject: "Message title",
//   text: "Plaintext version of the message",
//   html: "<p>HTML version of the message</p>"
// }

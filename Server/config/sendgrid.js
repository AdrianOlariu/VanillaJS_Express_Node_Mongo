const path = require('path');
require('dotenv').config({path: path.join(__dirname,'..','.env')});
const client = require('@sendgrid/mail');
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

client.setApiKey(process.env.SENDGRID_API_KEY);
console.log('Sendgrid API Key:', process.env.SENDGRID_API_KEY)

const msg = {
  to: 'adyyo93@gmail.com', // Change to your recipient
  from: 'adrian.olariu93@gmail.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}

// sendgrid
//   .send(msg)
//   .then(() => {
//     console.log('Email sent')
//   })
//   .catch((error) => {
//     console.error(error)
//   })

function sendEmail(object){
    const email = {
        to: object.to,
        from: object.from, 
        subject: object.subject,
        text: object.text,
        html: object.html,
      }

return () => {
  client.send(email)
    .then(
        ()=>console.log('email sent'))
    .catch(
        (err) =>{
    console.error(err);
    });
  }
}

// sendEmail({
//     to: 'adyyo93@gmail.com', // Change to your recipient
//     from: 'adrian.olariu93@gmail.com', // Change to your verified sender
//     subject: 'test again',
//     text: 'exposing the sendgrid send email function - with nodeJS',
//     html: `<pre>
//     function sendEmail(object){
//         const msg = {
//             to: object.to,
//             from: object.from, 
//             subject: object.subject,
//             text: object.text,
//             html: object.html,
//           }
    
//         return () =>{
//             sendgrid
//       .send(msg)
//       .then(() => {
//         console.log('Email sent')
//       })
//       .catch((error) => {
//         console.error(error)
//       })
    
//         };
//     }

//     //calling the function:
//     sendEmail({email object});
//     </pre>`,
//   })();


module.exports = {sendEmail, client};
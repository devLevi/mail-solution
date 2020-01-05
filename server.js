// 'use-strict';
const fs = require('fs'); // https://nodejs.org/api/fs.html
const nodemailer = require('nodemailer');
const mjml = require('mjml');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const mjmlTemplate = fs.readFileSync('./email/index.mjml', 'utf8');
const html = mjml(mjmlTemplate).html;

app.use(express.static('public'));

// Start the Express server
app.listen(port, () => console.log(`Server running on port ${port}!`));

const gmailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'levichristianbernard@gmail.com',
    pass: 'tebzobdudvmbqjfs'
  }
});

const message = {
  from: 'levichristianbernard@gmail.com', // Sender address
  to: ['lbernard.dev@gmail.com', 'lbernard.dev@yahoo.com'], // List of recipients
  subject: 'Check out my updated mail solution using MJML!', // Subject line
  html: html
};
gmailTransporter.sendMail(message, function(err, info) {
  if (err) {
    console.log(err);
  } else {
    console.log(info);
  }
});

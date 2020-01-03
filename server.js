// 'use-strict';
const fs = require('fs'); // https://nodejs.org/api/fs.html
const nodemailer = require('nodemailer');
// const mjml = require('mjml');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile('./emails/pet-email/index.html', { root: __dirname });
});

// Start the Express server
app.listen(port, () => console.log(`Server running on port ${port}!`));

const gmailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'levichristianbernard@gmail.com',
    pass: 'tebzobdudvmbqjfs'
  }
});

const htmlRaw = fs.readFileSync('./emails/pet-email/index.html', 'utf8');
const cssRaw = fs.readFileSync('./emails/pet-email/styles.css', 'utf8');

const emailHtml = `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />

      <link rel="stylesheet" type="text/css" href="styles.css" />

      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.5.0/css/all.css"
        integrity="sha384-B4dIYHKNBt8Bc12p+WXckhzcICo0wtJAoU8YZTY5qE0Id1GSseTk6S+L3BlXeVIU"
        crossorigin="anonymous"
      />
      <title>Mail Solution</title>
    </head>
    <body>
      ${htmlRaw}
      <style>
        ${cssRaw}
      </style>
    </body>
  </html>
`;

fs.writeFileSync('./output.html', emailHtml);

const message = {
  from: 'levichristianbernard@gmail.com', // Sender address
  to: [
    'lbernard.dev@gmail.com',
    'homenowtest@gmail.com',
    'homenowtest@outlook.com',
    'homenowtest@yahoo.com',
    'homenowtest@aol.com',
    'homenowtest@homenow.io'
  ], // List of recipients
  subject: 'Check out my mail solution!', // Subject line
  html: emailHtml
};
gmailTransporter.sendMail(message, function(err, info) {
  if (err) {
    console.log(err);
  } else {
    console.log(info);
  }
});

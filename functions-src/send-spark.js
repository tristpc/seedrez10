//based on https://css-tricks.com/netlify-functions-for-sending-emails/
//need to confirm sending domain, https://app.sparkpost.com/account/sending-domains/edit/email.speedrez.com

const SparkPost = require('sparkpost');
const client = new SparkPost(process.env.SPARKPOST);

exports.handler = function(event, context, callback) {
  console-log(event)
    client.transmissions
    .send({
      content: {
        from: 'paul@speedrez.com',
        subject: 'Hello, World!',
        html:
          "<html><body><p>An email from paul@speedrez.com via SparkPost.</p></body></html>"
      },
    recipients: [{ address: 'paulcardwell@gmail.com' }]
  })
    .then(data => {
        callback(null, {
            statusCode: 200,
            body: 'Something has happened, what?'
        })
    })
}
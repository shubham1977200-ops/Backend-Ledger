
const nodemailer = require('nodemailer');
//SMTP servers-sends email to users
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});



// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Backend Ledger" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

async function sendRegistrationEmail(userEmail,name) {
    const subject ='Welcome to Backend Ledger!';
    const text = `Hello ${name}, \n\nThank you for registering at Backend Ledger.
    We are excited to have  you on board!\n\nBest regards,\nThe Backend Ledger Team`;
    const html= `<p>Hello ${name},</p> <p>Thank you for registering at Backend Ledger.
    We are excited to have  you on board!</p><p>Best regards,<br>The Backend Ledger Team</p>`;

    await sendEmail(userEmail,subject,text,html)
    
}
async function sendTransactionEmail(userEmail, name, amount, toAccount) {
    const subject = "Transaction Successful - Backend Ledger";
    const text = `Hello ${name},\n\nYour transaction of $${amount} to account ${toAccount} was successful.\n\nThank you for banking with us!`;
    const html = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #2b6cb0;">Transaction Successful</h2>
            <p>Hello <strong>${name}</strong>,</p>
            <p>Your transfer has been processed successfully. Below are the details:</p>
            <table style="border-collapse: collapse; width: 100%; max-width: 400px; margin: 16px 0;">
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd; background-color: #f7fafc;"><strong>Amount</strong></td>
                    <td style="padding: 8px; border: 1px solid #ddd;">$${amount}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd; background-color: #f7fafc;"><strong>Recipient Account</strong></td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${toAccount}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd; background-color: #f7fafc;"><strong>Status</strong></td>
                    <td style="padding: 8px; border: 1px solid #ddd; color: #38a169;"><strong>Completed</strong></td>
                </tr>
            </table>
            <p>Thank you for using Backend Ledger!</p>
        </div>
    `;

    await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionFailureEmail(userEmail, name, amount, toAccount) {
    const subject = "Transaction Failed - Backend Ledger";
    const text = `Hello ${name},\n\nWe were unable to process your transaction of $${amount} to account ${toAccount}. Please verify your details and try again.`;
    const html = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2 style="color: #e53e3e;">Transaction Failed</h2>
            <p>Hello <strong>${name}</strong>,</p>
            <p>Your transaction of <strong>$${amount}</strong> to account <strong>${toAccount}</strong> could not be processed.</p>
            <table style="border-collapse: collapse; width: 100%; max-width: 400px; margin: 16px 0;">
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd; background-color: #f7fafc;"><strong>Attempted Amount</strong></td>
                    <td style="padding: 8px; border: 1px solid #ddd;">$${amount}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd; background-color: #f7fafc;"><strong>Target Account</strong></td>
                    <td style="padding: 8px; border: 1px solid #ddd;">${toAccount}</td>
                </tr>
                <tr>
                    <td style="padding: 8px; border: 1px solid #ddd; background-color: #f7fafc;"><strong>Status</strong></td>
                    <td style="padding: 8px; border: 1px solid #ddd; color: #e53e3e;"><strong>Failed</strong></td>
                </tr>
            </table>
            <p>If any funds were deducted, they will automatically be reversed to your account within 24 to 48 hours.</p>
            <p>Regards,<br/>Backend Ledger Support</p>
        </div>
    `;

    await sendEmail(userEmail, subject, text, html);
}




module.exports = {sendRegistrationEmail,sendTransactionEmail,sendTransactionFailureEmail};
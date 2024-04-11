import nodemailer from 'nodemailer';

const sendMail = async (to: string[], subject: string, message: string) => {
  const transporter = nodemailer.createTransport({
    service: 'Outlook365',
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const options = {
    from: process.env.EMAIL_USERNAME,
    to,
    subject,
    text: message,
  };

  try {
    await new Promise((resolve, reject) => {
      transporter.sendMail(options, (err, info) => {
        if (err) {
          reject(err);
        } else {
          resolve(info);
        }
      });
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};

export default sendMail;

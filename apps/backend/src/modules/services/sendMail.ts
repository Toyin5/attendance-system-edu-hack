import { TEMPLATES } from '@common/constants/templates';
import { MailOptions } from 'nodemailer/lib/json-transport';
import transporter from '@common/utils/transport';
import { logger } from '@src/server';
import { verificationData } from '@common/templates/verificationEmail';

export const sendVerification = async (to: string, body: verificationData) => {
  try {
    const mailOption: MailOptions = {
      from: 'Attendance team',
      to: to,
      subject: 'Verify email',
      html: TEMPLATES['verify'].template(body),
    };
    const dispatch = await transporter.sendMail(mailOption);
    logger.info('Mail sent successfully....' + dispatch.envelope);
  } catch (error) {
    logger.error(error);
  }
};

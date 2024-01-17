import verification from '@common/templates/verificationEmail';
import welcome from '@common/templates/welcomeEmail';

export const TEMPLATES = {
  verify: {
    subject: 'Verify your account',
    from: 'Attendance Customer Support',
    template: verification,
  },
  welcome: {
    template: welcome,
  },
} as const;

import verification from '@common/templates/verificationEmail';

export const TEMPLATES = {
  verify: {
    subject: 'Verify your account',
    from: 'Attendance Customer Support',
    template: verification,
  },
} as const;

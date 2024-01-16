export interface ICommonFields {
  to: string;
  priority?: string;
}

export interface WelcomeEmail extends ICommonFields {
  name: string;
}
export interface VerificationEmail extends ICommonFields {
  name: string;
  token: string;
}

export type EmailData = { type: 'welcome'; data: WelcomeEmail } | { type: 'verify'; data: VerificationEmail };

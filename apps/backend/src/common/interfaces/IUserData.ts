export interface IUSerData {
  id: string;
  firstName: string;
  lastName: string;
  title: string;
  avatar: string;
  intro: string;
  qualifications: string[];
  verified?: boolean;
  isOnboardingCompleted?: boolean;
}

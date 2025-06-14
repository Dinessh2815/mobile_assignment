export interface User {
  name: string;
  email: string;
}

export interface HealthData {
  steps: number;
  bmi: number;
  sleep: number;
}

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Home: undefined;
  Account: undefined;
  AppointmentDetails: undefined;
  StepsEntry: undefined;
  BMIEntry: undefined;
  SleepEntry: undefined;
};

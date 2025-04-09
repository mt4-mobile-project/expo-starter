import { BaseInputConfig } from '@/utils/generator/input-generator';

export const LOGIN_INPUT_CONFIGS: BaseInputConfig[] = [
  {
    name: 'username',
    placeholder: 'Username',
    icon: 'account',
    variant: 'outline',
    autoCapitalize: 'none',
    validation: {
      required: 'Username is required',
    },
  },
  {
    name: 'password',
    placeholder: 'Password',
    icon: 'lock',
    variant: 'outline',
    secureTextEntry: true,
    validation: {
      required: 'Password is required',
    },
  },
];

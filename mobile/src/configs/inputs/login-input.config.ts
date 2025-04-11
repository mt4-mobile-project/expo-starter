import { BaseInputConfig } from '@/utils/generator/input-generator';

export const LOGIN_INPUT_CONFIGS: BaseInputConfig[] = [
  {
    name: 'email',
    placeholder: 'Email',
    icon: 'email',
    variant: 'outline',
    keyboardType: 'email-address',
    autoCapitalize: 'none',
    validation: {
      required: "L'email est requis",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Email invalide',
      },
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

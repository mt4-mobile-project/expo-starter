import { BaseInputConfig } from '@/utils/generator/input-generator';

export const REGISTER_INPUT_CONFIGS: BaseInputConfig[] = [
  {
    name: 'lastName',
    placeholder: 'Nom',
    icon: 'account',
    variant: 'outline',
    validation: {
      required: 'Le nom est requis',
      minLength: { value: 2, message: 'Le nom doit contenir au moins 2 caractères' }
    }
  },
  {
    name: 'firstName',
    placeholder: 'Prénom',
    icon: 'account-outline',
    variant: 'outline',
    validation: {
      required: 'Le prénom est requis',
      minLength: { value: 2, message: 'Le prénom doit contenir au moins 2 caractères' }
    }
  },
  {
    name: 'email',
    placeholder: 'Email',
    icon: 'email',
    variant: 'outline',
    keyboardType: 'email-address',
    autoCapitalize: 'none',
    validation: {
      required: 'L\'email est requis',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Email invalide'
      }
    }
  },
  {
    name: 'password',
    placeholder: 'Mot de passe',
    icon: 'lock',
    variant: 'outline',
    secureTextEntry: true,
    autoCapitalize: 'none',
    validation: {
      required: 'Le mot de passe est requis',
      minLength: { value: 6, message: 'Le mot de passe doit contenir au moins 6 caractères' }
    }
  }
];
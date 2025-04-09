import { BaseInputConfig } from '@/utils/generator/input-generator';

export const PROFILE_INPUT_CONFIGS: BaseInputConfig[] = [
  {
    name: 'fullName',
    placeholder: 'Nom complet',
    icon: 'account',
    variant: 'outline',
    validation: {
      required: 'Le nom est requis',
      minLength: { value: 2, message: 'Le nom doit contenir au moins 2 caractères' }
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
    name: 'phone',
    placeholder: 'Téléphone',
    icon: 'phone',
    variant: 'outline',
    keyboardType: 'phone-pad',
    validation: {
      required: 'Le téléphone est requis'
    }
  },
  {
    name: 'address',
    placeholder: 'Adresse',
    icon: 'map-marker',
    variant: 'outline',
    validation: {
      required: 'L\'adresse est requise'
    }
  }
];
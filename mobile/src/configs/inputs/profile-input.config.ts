import { BaseInputConfig } from '@/utils/generator/input-generator';

export const PROFILE_INPUT_CONFIGS: BaseInputConfig[] = [
  {
    name: 'fullName',
    placeholder: 'Entrez votre pseudo',
    icon: 'account',
    maxLength: 24,
  },
  {
    name: 'description',
    placeholder: 'Ajoutez une description',
    icon: 'text-box-outline',
    maxLength: 70,
  },
  {
    name: 'instruments',
    placeholder: 'Listez les instruments joués',
    icon: 'music',
    maxLength: 50,
  },
  {
    name: 'influences',
    placeholder: 'Ajoutez vos influences musicales',
    icon: 'star',
    maxLength: 50,
  },
];

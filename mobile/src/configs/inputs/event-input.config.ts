import { BaseInputConfig } from '@/utils/generator/input-generator';

export const EVENT_INPUT_CONFIGS: BaseInputConfig[] = [
  {
    name: 'name',
    placeholder: "Nom de l'événement",
    icon: 'format-title',
    validation: {
      required: 'Le nom est requis',
    },
  },
  {
    name: 'description',
    placeholder: 'Description',
    icon: 'text-box-outline',
    validation: {
      required: 'La description est requise',
    },
  },
  {
    name: 'start_date',
    placeholder: 'Date de début (YYYY-MM-DDTHH:mm:ss)',
    icon: 'calendar-start',
    validation: {
      required: 'La date de début est requise',
    },
  },
  {
    name: 'end_date',
    placeholder: 'Date de fin (YYYY-MM-DDTHH:mm:ss)',
    icon: 'calendar-end',
    validation: {
      required: 'La date de fin est requise',
    },
  },
  {
    name: 'street',
    placeholder: 'Adresse',
    icon: 'map-marker',
    validation: {
      required: "L'adresse est requise",
    },
  },
  {
    name: 'city',
    placeholder: 'Ville',
    icon: 'city',
    validation: {
      required: 'La ville est requise',
    },
  },
];

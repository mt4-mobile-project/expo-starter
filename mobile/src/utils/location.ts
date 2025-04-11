import * as Localization from 'expo-localization';

export function formatMessageDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

  if (diffInMinutes < 60) {
    return `${diffInMinutes}m`; // Ex : "10m"
  } else if (diffInMinutes < 1440) {
    return `${Math.floor(diffInMinutes / 60)}h`; // Ex : "10h"
  } else {
    return date.toLocaleDateString(Localization.locale, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }); // Ex : "10 avr. 2025"
  }
}

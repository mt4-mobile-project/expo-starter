import { Button } from './button';
import { useLogout } from '@/hooks/auth/useLogout';

interface LogoutButtonProps {
  variant?: 'default' | 'outline' | 'destructive';
  size?: 'default' | 'sm' | 'lg';
}

export const LogoutButton = ({ variant = 'destructive', size = 'lg' }: LogoutButtonProps) => {
  const { logout } = useLogout();

  return (
    <Button variant={variant} size={size} onPress={logout}>
      Se déconnecter
    </Button>
  );
};

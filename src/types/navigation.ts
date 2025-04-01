import { ReactNode } from 'react';

export interface NavItem {
  title: string;
  href: string;
  icon?: ReactNode;
  isAdmin?: boolean;
  active?: boolean;
} 
// types/navigation.ts
import { StackNavigationProp } from '@react-navigation/stack';

// Parametry ekranów w Twojej aplikacji
export type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
  ColonyManagement: undefined;
  PaymentScreen: undefined;
};

// Typy nawigacji dla każdego ekranu
export type DashboardNavigationProp = StackNavigationProp<RootStackParamList, 'Dashboard'>;
export type ColonyManagementNavigationProp = StackNavigationProp<RootStackParamList, 'ColonyManagement'>;
export type PaymentScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PaymentScreen'>;

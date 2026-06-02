import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from './src/context/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';

class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <ScrollView contentContainerStyle={{ padding: 20, backgroundColor: '#fff', flex: 1, justifyContent: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#D03E3E', marginBottom: 10 }}>
            ¡Ups! Ha ocurrido un error en la aplicación.
          </Text>
          <Text style={{ fontFamily: 'monospace', backgroundColor: '#f8d7da', color: '#721c24', padding: 15, borderRadius: 8, marginBottom: 10 }}>
            {this.state.error ? this.state.error.toString() : 'Error desconocido'}
          </Text>
          <Text style={{ fontSize: 12, color: '#555', fontFamily: 'monospace' }}>
            {this.state.error?.stack}
          </Text>
        </ScrollView>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

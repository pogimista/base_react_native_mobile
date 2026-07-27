import { Component, ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '../ui/Button';
// Rendered outside ThemeProvider (see app/_layout.tsx) so it stays available
// even if theme setup itself throws — sticks to the static light palette.
import { lightColors as colors } from '../theme/colors';
import { captureException } from '../../lib/sentry';

type Props = {
  children: ReactNode;
};

type State = {
  error: Error | null;
};

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.error('Unhandled error caught by ErrorBoundary:', error);
    captureException(error);
  }

  reset = () => this.setState({ error: null });

  render() {
    if (this.state.error) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>Something went wrong</Text>
          <Text style={styles.message}>{this.state.error.message}</Text>
          <Button title="Try again" onPress={this.reset} />
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 12,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  message: {
    fontSize: 14,
    color: colors.textMuted,
    textAlign: 'center',
  },
});

import { useEffect } from 'react';
import {
  Alert,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import codePush from 'react-native-code-push';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    codePush.sync(
      {
        installMode: codePush.InstallMode.IMMEDIATE,
        mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
      },
      (status) => {
        switch (status) {
          case codePush.SyncStatus.CHECKING_FOR_UPDATE:
            console.log('[CodePush] Checking for update...');
            break;
          case codePush.SyncStatus.DOWNLOADING_PACKAGE:
            console.log('[CodePush] Downloading update bundle...');
            break;
          case codePush.SyncStatus.INSTALLING_UPDATE:
            console.log('[CodePush] Installing update...');
            break;
          case codePush.SyncStatus.UP_TO_DATE:
            console.log('[CodePush] App is up to date.');
            break;
          case codePush.SyncStatus.UPDATE_INSTALLED:
            Alert.alert('CodePush', 'Update installed! Restarting...');
            break;
          case codePush.SyncStatus.UNKNOWN_ERROR:
            Alert.alert('CodePush Error', 'Sync failed. Check connection.');
            break;
        }
      }
    );
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: safeAreaInsets.top }]}>
      <View style={styles.content}>
        {/* Subtle Status Pill */}
        <View style={styles.statusPill}>
          <View style={styles.pulseDot} />
          <Text style={styles.statusText}>Build v2.1 • Live OTA</Text>
        </View>

        {/* Minimal Hero Header */}
        <Text style={styles.headerTitle}>System Updated</Text>
        <Text style={styles.headerSubtitle}>
          The remote JavaScript bundle was delivered and mounted without a full binary compile.
        </Text>

        {/* Clean Spec Panel */}
        <View style={styles.panel}>
          <View style={styles.panelRow}>
            <Text style={styles.panelLabel}>Runtime Channel</Text>
            <Text style={styles.panelValue}>Staging</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.panelRow}>
            <Text style={styles.panelLabel}>Delivery Protocol</Text>
            <Text style={styles.panelValue}>Direct Cloud Proxy</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.panelRow}>
            <Text style={styles.panelLabel}>Installation State</Text>
            <Text style={styles.panelValueSuccess}>Synchronized</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0d12',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#111722',
    borderWidth: 1,
    borderColor: '#1e293b',
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 20,
  },
  pulseDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#34d399',
    marginRight: 8,
  },
  statusText: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '500',
    letterSpacing: 0.2,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: '700',
    color: '#f8fafc',
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 15,
    color: '#64748b',
    lineHeight: 22,
    marginBottom: 32,
  },
  panel: {
    backgroundColor: '#0f141c',
    borderWidth: 1,
    borderColor: '#1a2230',
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 4,
  },
  panelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  divider: {
    height: 1,
    backgroundColor: '#161f2e',
  },
  panelLabel: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '400',
  },
  panelValue: {
    fontSize: 13,
    color: '#cbd5e1',
    fontWeight: '500',
  },
  panelValueSuccess: {
    fontSize: 13,
    color: '#34d399',
    fontWeight: '600',
  },
});

  const codePushOptions = {
    // Use Staging key directly for testing releases
    deploymentKey: 'miPrEUAWEUu4pGbfJLyvJxpNlMZENyKYNJ12Ng',
    checkFrequency: codePush.CheckFrequency.ON_APP_START,
    installMode: codePush.InstallMode.IMMEDIATE,
  };

  export default codePush(codePushOptions)(App);
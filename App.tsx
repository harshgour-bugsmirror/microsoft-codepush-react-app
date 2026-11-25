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

const DEPLOYMENT_KEY = 'miPrEUAWEUu4pGbfJLyvJxpNlMZENyKYNJ12Ng';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    codePush.sync(
      {
        deploymentKey: DEPLOYMENT_KEY,
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
            console.log('[CodePush] Update installed! Restarting...');
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
        {/* Updated Status Pill */}
        <View style={styles.statusPill}>
          <View style={styles.pulseDot} />
          <Text style={styles.statusText}>Build v13.0 • Wireless OTA Verified</Text>
        </View>

        {/* Hero Header */}
        <Text style={styles.headerTitle}>OTA Pipeline Active 13.0</Text>
        <Text style={styles.headerSubtitle}>
          This bundle was pushed over the air without rebuilding the Android APK.
        </Text>

        {/* Spec Panel */}
        <View style={styles.panel}>
          <View style={styles.panelRow}>
            <Text style={styles.panelLabel}>Active Release</Text>
            <Text style={styles.panelValueAccent}>v13.0 (Latest)</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.panelRow}>
            <Text style={styles.panelLabel}>Runtime Channel</Text>
            <Text style={styles.panelValue}>Staging</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.panelRow}>
            <Text style={styles.panelLabel}>Connection Mode</Text>
            <Text style={styles.panelValueSuccess}>No ADB / Pure Cloud</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0e14',
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
    backgroundColor: '#161b26',
    borderWidth: 1,
    borderColor: '#f59e0b',
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 20,
  },
  pulseDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#f59e0b',
    marginRight: 8,
  },
  statusText: {
    color: '#fbbf24',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.3,
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
    color: '#94a3b8',
    lineHeight: 22,
    marginBottom: 32,
  },
  panel: {
    backgroundColor: '#111622',
    borderWidth: 1,
    borderColor: '#1e293b',
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
    backgroundColor: '#1e293b',
  },
  panelLabel: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '500',
  },
  panelValue: {
    fontSize: 13,
    color: '#cbd5e1',
    fontWeight: '500',
  },
  panelValueAccent: {
    fontSize: 13,
    color: '#fbbf24',
    fontWeight: '700',
  },
  panelValueSuccess: {
    fontSize: 13,
    color: '#34d399',
    fontWeight: '600',
  },
});

const codePushOptions = {
  deploymentKey: DEPLOYMENT_KEY,
  checkFrequency: codePush.CheckFrequency.MANUAL,
};

export default codePush(codePushOptions)(App);
import { useEffect } from 'react';
import {
  Alert,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
  Platform,
  Image,
} from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import codePush from 'react-native-code-push';

const DEPLOYMENT_KEY_ANDROID = 'miPrEUAWEUu4pGbfJLyvJxpNlMZENyKYNJ12Ng';
const DEPLOYMENT_KEY_IOS = 'DF8LUmKSPGUmeUxWDJBv8z_TAPHeNyKYNJ12Ng';

const DEPLOYMENT_KEY =
  Platform.OS === 'ios' ? DEPLOYMENT_KEY_IOS : DEPLOYMENT_KEY_ANDROID;

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
            console.log('[CodePush Error]', 'Sync failed. Check connection.');
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
  const isIOS = Platform.OS === 'ios';

  return (
    <View style={[styles.container, { paddingTop: safeAreaInsets.top }]}>
      <View style={styles.content}>
        {/* Top Status Row */}
        <View style={styles.topRow}>
          <View style={styles.statusPill}>
            <View style={styles.pulseDot} />
            <Text style={styles.statusText}>Build v28.0 • Live OTA</Text>
          </View>
          <View style={styles.platformBadge}>
            <Text style={styles.platformBadgeText}>
              {isIOS ? 'iOS' : 'Android'}
            </Text>
          </View>
        </View>

        {/* Hero Card */}
        <View style={styles.heroCard}>
          <Image
            source={require('./src/assets/surfIcon.jpeg')}
            style={styles.testImage}
            resizeMode="cover"
          />
          <View style={styles.heroTextGroup}>
            <Text style={styles.headerTitle}>OTA Pipeline 28.0</Text>
            <Text style={styles.headerSubtitle}>
              Delivered wirelessly without rebuilding the{' '}
              {isIOS ? 'iOS IPA' : 'Android APK'}.
            </Text>
          </View>
        </View>

        {/* Spec Panel */}
        <View style={styles.panel}>
          <View style={styles.panelRow}>
            <Text style={styles.panelLabel}>Active Release</Text>
            <Text style={styles.panelValueAccent}>v28.0 (Latest)</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.panelRow}>
            <Text style={styles.panelLabel}>Target Platform</Text>
            <Text style={styles.panelValue}>
              {isIOS ? 'iOS (UIScene)' : 'Android'}
            </Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.panelRow}>
            <Text style={styles.panelLabel}>Runtime Channel</Text>
            <Text style={styles.panelValue}>Staging</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.panelRow}>
            <Text style={styles.panelLabel}>Delivery Mode</Text>
            <Text style={styles.panelValueSuccess}>Pure Cloud OTA</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070b12',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f1f1c',
    borderWidth: 1,
    borderColor: '#10b981',
    borderRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  pulseDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#10b981',
    marginRight: 8,
  },
  statusText: {
    color: '#34d399',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  platformBadge: {
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#38bdf8',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  platformBadgeText: {
    color: '#38bdf8',
    fontSize: 12,
    fontWeight: '700',
  },
  heroCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f1623',
    borderWidth: 1,
    borderColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  testImage: {
    width: 72,
    height: 72,
    borderRadius: 14,
    marginRight: 16,
  },
  heroTextGroup: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#f8fafc',
    letterSpacing: -0.4,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#94a3b8',
    lineHeight: 19,
  },
  panel: {
    backgroundColor: '#0f1623',
    borderWidth: 1,
    borderColor: '#1e293b',
    borderRadius: 16,
    paddingHorizontal: 18,
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
    color: '#e2e8f0',
    fontWeight: '500',
  },
  panelValueAccent: {
    fontSize: 13,
    color: '#38bdf8',
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
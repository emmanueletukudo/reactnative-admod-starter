/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button
} from 'react-native';
import {TestIds, BannerAd, BannerAdSize} from '@react-native-firebase/admob';

const App = () => {
  showInterstitialAd = () => {
    interstitialAd.onAdEvent((type, error) => {
      if (type === AdEventType.LOADED) {
        interstitialAd.show();
      }
    });
    interstitialAd.load();
  };

  showRewardAd = () => {
    // Create a new instance
    const rewardAd = RewardedAd.createForAdRequest(TestIds.REWARDED);
    // Add event handlers
    rewardAd.onAdEvent((type, error) => {
      if (type === RewardedAdEventType.LOADED) {
        rewardAd.show();
      }

      if (type === RewardedAdEventType.EARNED_REWARD) {
        console.log('User earned reward of 3 stars');
        Alert.alert(
          'New Reward',
          'You just earned a reward of 3 stars',
          [{text: 'OK', onPress: () => console.log('OK Pressed')}],
          {cancelable: true},
        );
      }
    });

    // Load a new advert
    rewardAd.load();
  };

  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View>
          <Text>Interstitial Ads</Text>
          <Button
            title="Show Reward Ad"
            color="white"
            onPress={() => showInterstitialAd()}
            style={styles.btn}
          />
        </View>
        <View>
          <Text>Reward Ads </Text>
          <Button
            title="Show Reward Ad"
            color="white"
            onPress={() => showRewardAd()}
            style={styles.btn}
          />
        </View>
        <View>
          <BannerAd
            unitId={TestIds.BANNER}
            size={BannerAdSize.SMART_BANNER}
            requestOptions={{
              requestNonPersonalizedAdsOnly: true,
            }}
            onAdLoaded={() => {
              console.log('Advert loaded');
            }}
            onAdFailedToLoad={error => {
              console.error('Advert failed to load: ', error);
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;

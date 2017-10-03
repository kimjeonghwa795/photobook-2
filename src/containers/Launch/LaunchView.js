/**
 * Launch Screen
 *  - Shows a nice loading screen whilst:
 *    - Preloading any specified app content
 *    - Checking if user is logged in, and redirects from there
 *
 * Gotcha React Native Starter
 * https://bitbucket.org/teamgotcha/gc
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  Alert,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

// Consts and Libs
import { AppStyles, AppSizes } from '@theme/';

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  launchImage: {
    width: AppSizes.screen.width,
    height: AppSizes.screen.height,
  },
});

/* Component ==================================================================== */
class AppLaunch extends Component {
  static componentName = 'AppLaunch';

  static propTypes = {
    login: PropTypes.func.isRequired,
    getTemplates: PropTypes.func.isRequired,
    getTabs: PropTypes.func.isRequired,
  }

  constructor() {
    super();
    console.ignoredYellowBox = ['Setting a timer'];
  }

  componentDidMount = () => {
    // Show status bar on app launch
    StatusBar.setHidden(false, true);

    // Preload content here
    Promise.all([
      this.props.getTabs(),
      this.props.getTemplates(),
    ]).then(() => {
      // Once we've preloaded basic content,
      // - Try to authenticate based on existing token
      this.props.login()
        // Logged in, show index screen
        .then(() => Actions.app({ type: 'reset' }))
        // Not Logged in, show Login screen
        .catch(() => Actions.authenticate({ type: 'reset' }));
    }).catch(err => Alert.alert(err.message));
  }

  render = () => (
    <View style={[AppStyles.container]}>
      <Image
        source={require('../../images/launch.jpg')}
        style={[styles.launchImage, AppStyles.containerCentered]}
      >
        <ActivityIndicator
          animating
          size={'large'}
          color={'#C1C5C8'}
        />
      </Image>
    </View>
  );
}

/* Export Component ==================================================================== */
export default AppLaunch;

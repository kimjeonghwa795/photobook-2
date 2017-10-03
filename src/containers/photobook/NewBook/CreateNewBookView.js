/**
 * Receipe Tabs Screen
 *  - Shows tabs, which contain receipe listings
 *
 * Gotcha React Native Starter
 * https://bitbucket.org/teamgotcha/gc
 */
import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Image,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

// Components
import { Button } from '@ui/';

// Consts and Libs
import { AppStyles, AppSizes } from '@theme/';

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
    height: undefined,
    width: AppSizes.screen.width,
    backgroundColor:'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  createButton: {
    width: AppSizes.screen.width*0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

/* Component ==================================================================== */
class NewBook extends Component {
  static componentName = 'CreateNewBook';

  constructor(props) {
    super(props);
  }

  render = () => {
    return (
      <View style={[AppStyles.containerCentered, AppStyles.container, styles.background]}>
        <Image source={require('../../../images/landing-bg.png')} style={styles.backgroundImage}>
        <View style={[AppStyles.row, styles.createButton]}>
            <View style={[AppStyles.flex1]}>
              <Button
                onPress={Actions.templateList}
                title={'Create Photobook'}
                backgroundColor={'#16214d'}
              />
            </View>
          </View>
        </Image>
      </View>
    );
  }
}

/* Export Component ==================================================================== */
export default NewBook;

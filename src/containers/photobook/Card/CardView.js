/**
 * Recipe View Screen
 *  - The individual recipe screen
 *
 * Gotcha React Native Starter
 * https://bitbucket.org/teamgotcha/gc
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Icon } from 'react-native-elements';

// Consts and Libs
import { AppStyles } from '@theme/';

// Components
import { Card, Text } from '@ui/';

/* Styles ==================================================================== */
const styles = StyleSheet.create({
});

/* Component ==================================================================== */
class TemplateCard extends Component {
  static componentName = 'TemplateCard';

  static propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    onPress: PropTypes.func,
  }

  static defaultProps = {
    onPress: null,
  }

  render = () => {
    const { title, body, image, onPress } = this.props;

    return (
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <Card image={image && { uri: image }}>
          <View style={[AppStyles.paddingBottomSml]}>
            <Text h3>{title}</Text>
            <Text>{body}</Text>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
}

/* Export Component ==================================================================== */
export default TemplateCard;

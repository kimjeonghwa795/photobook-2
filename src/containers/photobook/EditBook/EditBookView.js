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
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-picker';
import CropImagePicker from 'react-native-image-crop-picker';

// Components
import { Button, Text } from '@ui/';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Consts and Libs
import { AppStyles, AppSizes } from '@theme/';

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  canvas: {
    backgroundColor: 'white',
    height: AppSizes.screen.width,
    width: AppSizes.screen.width,
    marginTop: -30,
  },
  image: {
    height: AppSizes.screen.width-80,
    width: AppSizes.screen.width-80,
  },
});

/* Component ==================================================================== */
class EditBook extends Component {
  static componentName = 'EditBook';

  constructor(props) {
    super(props);

    const { images } = this.props;    

    this.state = {
      photoSource: { uri: images[0].path },
      photoTitle: null,
    };
  }

  importPhoto = () => {
    const options = {
      title: 'Select Photo',
      customButtons: [
        {name: 'fb', title: 'Choose Photo from Facebook'},
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };

    ImagePicker.showImagePicker(options, (response)  => {
        console.log('Response = ', response);
      
        if (response.didCancel) {
          console.log('User cancelled image picker');
        }
        else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        }
        else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        }
        else {
          let source = { uri: response.uri };
          
          this.setState({
            photoSource: source,
            photoTitle: response.fileName,
          });
          
        }
    });
  }

  cropPhoto = () => {
    if (this.state.photoSource !== null){
      CropImagePicker.openCropper({
        path: this.state.photoSource.uri,
        width: 300,
        height: 400
      }).then(image => {
        this.setState({
          photoSource: { uri: image.path }
        });
      });
    }
  }

  deletePhoto = () => {
    this.setState({
      photoSource: null,
    });
  }

  render = () => {
    return (
      <View style={[AppStyles.containerCentered, AppStyles.container, styles.background]}>
        <TouchableOpacity onPress={this.cropPhoto}>
          <View style={[AppStyles.containerCentered, styles.canvas]}>
            <View style={[AppStyles.row]}>
              <Text>{this.state.photoTitle}</Text>
            </View>
            <Image source={this.state.photoSource} style={[styles.image]}/>
          </View>
        </TouchableOpacity>
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#9b59b6' title="Import Photo" onPress={this.importPhoto}>
            <Icon name="add" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Remove Photo" onPress={this.deletePhoto}>
            <Icon name="remove" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="Save" onPress={() => {}}>
            <Icon name="save" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}

/* Export Component ==================================================================== */
export default EditBook;

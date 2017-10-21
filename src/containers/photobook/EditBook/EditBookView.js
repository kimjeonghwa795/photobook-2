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
import CropImagePicker from 'react-native-image-crop-picker';
import Carousel from 'react-native-snap-carousel';

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
  },
  image: {
    height: AppSizes.screen.width-50,
    width: AppSizes.screen.width-50,
  },
  carousel: {
    marginTop: 0,
  },
  pageIndicator: {
    marginTop: -50,
  },
  right: {
    textAlign: 'right',
    marginRight: 40,
  },
  left: {
    textAlign: 'left',
    marginLeft: 40,
  },
});

/* Component ==================================================================== */
class EditBook extends Component {
  static componentName = 'EditBook';

  constructor(props) {
    super(props);

    this.state = {
      index: 0,
    };
  }

  importPhoto = () => {
    const { addImage, dispatch } = this.props; 
    CropImagePicker.openPicker({
      mediaType: 'photo',
      includeExif: true,
    }).then(image => {
      dispatch(addImage(image, this._carousel.currentIndex));
    });
  }

  editPhoto = () => {
    const { editImage, dispatch } = this.props; 
    if (this.props.images !== null){
      CropImagePicker.openCropper({
        path: this.props.images[this._carousel.currentIndex].path,
        includeExif: true,
      }).then(image => {
        dispatch(editImage(image, this._carousel.currentIndex));
      });
    }
  }

  deletePhoto = () => {
    const { removeImage, dispatch } = this.props; 
    dispatch(removeImage(this._carousel.currentIndex));
  }

  _renderItem ({item, index}) {
    let date='';
    let location='';

    /*if (item.exif['{IPTC}'] !== null){
      const dateStr = item.exif['{IPTC}'].DateCreated;
      date = dateStr.substring(6,8)+'/'+dateStr.substring(4,6)+'/'+dateStr.substring(0,4);
      location = item.exif['{IPTC}'].City;
    }*/
    
    return (
      <View style={[AppStyles.containerCentered, styles.canvas]}>
        <View style={[AppStyles.row]}>
          <Text style={[AppStyles.flex1, styles.left]}>{location}</Text>
          <Text style={[AppStyles.flex1, styles.right]}>{date}</Text>
        </View>
        <Image source={ {uri: item.path} } style={[styles.image]}/>
      </View>
    );
  }

  onScroll = (e) => {
    this.setState({
      index: this._carousel.currentIndex,
    });
  }

  render = () => {
    return (
      <View style={[AppStyles.containerCentered, AppStyles.container, styles.background]}>
        <View style={[AppStyles.row, styles.pageIndicator]}>
          <Text> {this.state.index+1} / {this.props.images.length}</Text>
        </View>
        <View style={[AppStyles.row, styles.carousel]}>
          <Carousel
            ref={(c) => { this._carousel = c; }}
            data={this.props.images}
            renderItem={this._renderItem}
            sliderWidth={AppSizes.screen.width}
            itemWidth={AppSizes.screen.width}
            onScroll={this.onScroll}
          />
        </View>
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item buttonColor='#9b59b6' title="Import Photo" onPress={this.importPhoto}>
            <Icon name="add" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#3498db' title="Remove Photo" onPress={this.deletePhoto}>
            <Icon name="remove" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor='#1abc9c' title="Edit Photo" onPress={this.editPhoto}>
            <Icon name="edit" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}

/* Export Component ==================================================================== */
export default EditBook;

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
    height: AppSizes.screen.width-40,
    width: AppSizes.screen.width-40,
  },
  carousel: {
    marginTop: 0,
  },
  pageIndicator: {
    marginTop: -50,
  }
});

/* Component ==================================================================== */
class EditBook extends Component {
  static componentName = 'EditBook';

  constructor(props) {
    super(props);

    const { images } = this.props;    

    this.state = {
      images: images,
      index: 0,
      pageNum: images.length,
      photoTitle: null,
    };
  }

  importPhoto = () => {
    /*CropImagePicker.openPicker({
    }).then(image => {
      this.setState({
        photoSource: { uri: image.path },
        photoTitle: image.filename,
      });
    });*/
  }

  cropPhoto = () => {
    /*if (this.state.photoSource !== null){
      CropImagePicker.openCropper({
        path: this.state.photoSource.uri,
        width: 300,
        height: 400
      }).then(image => {
        this.setState({
          photoSource: { uri: image.path }
        });
      });
    }*/
  }

  deletePhoto = () => {
    this.setState({
      images: this.state.images.filter((image) => {
        return this.state.images.indexOf(image)!=this._carousel.currentIndex; 
      }),
    }, () => {
      this.setState({
        pageNum: this.state.images.length,
        index: this._carousel.currentIndex,
      })
    });
  }

  _renderItem ({item, index}) {
    return (
      <View style={[AppStyles.containerCentered, styles.canvas]}>
        <View style={[AppStyles.row]}>
          <Text>{item.filename}</Text>
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
          <Text> {this.state.index+1} / {this.state.pageNum}</Text>
        </View>
        <View style={[AppStyles.row, styles.carousel]}>
          <Carousel
            ref={(c) => { this._carousel = c; }}
            data={this.state.images}
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
          <ActionButton.Item buttonColor='#1abc9c' title="Edit Photo" onPress={this.cropPhoto}>
            <Icon name="edit" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}

/* Export Component ==================================================================== */
export default EditBook;

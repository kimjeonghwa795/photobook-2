/**
 * Style Guide
 *
 * Gotcha React Native Starter
 * https://bitbucket.org/teamgotcha/gc
 */
import React, { Component } from 'react';
import {
  View,
  ListView,
  ScrollView,
} from 'react-native';
import { SocialIcon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux';

// Consts and Libs
import { AppStyles } from '@theme/';

// Components
import {
  List,
  ListItem,
} from '@components/ui/';

// Example Data
const dummyData1 = [
  { title: 'Settings', icon: 'build' },
  { title: 'Payment', icon: 'payment' },
  { title: 'Address', icon: 'map' },
  { title: 'Help', icon: 'help' },
];

/* Component ==================================================================== */
class Profile extends Component {
  static componentName = 'Profile';

  constructor(props) {
    super(props);

    // Setup ListViews
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: ds.cloneWithRows(dummyData1),
    };
  }

  /**
    * Each List Item
    */
  renderRow = (data, sectionID) => (
    <ListItem
      key={`list-row-${sectionID}`}
      onPress={Actions.comingSoon}
      title={data.title}
      subtitle={data.role || null}
      leftIcon={data.icon ? { name: data.icon } : null}
      avatar={data.avatar ? { uri: data.avatar } : null}
      roundAvatar={!!data.avatar}
    />
  )

  render = () => {
    return (
      <View style={AppStyles.container}>
        <ScrollView
          automaticallyAdjustContentInsets={false}
          style={[AppStyles.container]}
        >
          <List>
            <ListView
              renderRow={this.renderRow}
              dataSource={this.state.dataSource}
            />
          </List>
        </ScrollView>
      </View>
    );
  }
}

/* Export Component ==================================================================== */
export default Profile;

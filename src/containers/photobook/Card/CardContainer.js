/**
 * Individual template Card Container
 *
 * Gotcha React Native Starter
 * https://bitbucket.org/teamgotcha/gc
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import ImagePicker from 'react-native-image-crop-picker';

// Actions
import * as templateActions from '@redux/photobook/actions';

// Components
import TemplateCardRender from './CardView';

/* Redux ==================================================================== */
// What data from the store shall we send to the component?
const mapStateToProps = state => ({
});

// Any actions to map to the component?
const mapDispatchToProps = {
};

/* Component ==================================================================== */
class TemplateCard extends Component {
  static componentName = 'TemplateCard';

  static propTypes = {
    template: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      image: PropTypes.string,
    }).isRequired,
  }

  constructor(props) {
    super(props);
    this.state = { template: props.template };
  }

  componentWillReceiveProps(props) {
    if (props.template) {
      this.setState({ template: props.template });
    }
  }

  /**
    * On Press of Card
    */
  onPressCard = () => {
    ImagePicker.openPicker({
      multiple: true
    }).then(images => {
      Actions.EditBook({
        images: images,
      });
    });
  }

  render = () => {
    const { template } = this.state;
    const { user } = this.props;

    return (
      <TemplateCardRender
        title={template.title}
        body={template.body}
        image={template.image}
        onPress={this.onPressCard}
      />
    );
  }
}

/* Export Component ==================================================================== */
export default connect(mapStateToProps, mapDispatchToProps)(TemplateCard);

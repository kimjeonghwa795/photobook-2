/**
 * Individual Recipe Card Container
 *
 * Gotcha React Native Starter
 * https://bitbucket.org/teamgotcha/gc
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

// Actions
import * as RecipeActions from '@redux/photobook/actions';

// Components
import TemplateCardRender from './CardView';

/* Redux ==================================================================== */
// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  user: state.user,
});

// Any actions to map to the component?
const mapDispatchToProps = {
};

/* Component ==================================================================== */
class TemplateCard extends Component {
  static componentName = 'TemplateCard';

  static propTypes = {
    recipe: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      image: PropTypes.string,
    }).isRequired,
    user: PropTypes.shape({
      uid: PropTypes.string,
    }),
  }

  static defaultProps = {
    user: null,
  }

  constructor(props) {
    super(props);
    this.state = { recipe: props.recipe };
  }

  componentWillReceiveProps(props) {
    if (props.recipe) {
      this.setState({ recipe: props.recipe });
    }
  }

  /**
    * On Press of Card
    */
  onPressCard = () => {
    Actions.EditBook();
  }

  render = () => {
    const { recipe } = this.state;
    const { user } = this.props;

    return (
      <TemplateCardRender
        title={recipe.title}
        body={recipe.body}
        image={recipe.image}
        onPress={this.onPressCard}
      />
    );
  }
}

/* Export Component ==================================================================== */
export default connect(mapStateToProps, mapDispatchToProps)(TemplateCard);

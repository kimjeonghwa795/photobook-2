/**
 * List of Templates for a Meal Container
 *
 * Gotcha React Native Starter
 * https://bitbucket.org/teamgotcha/gc
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Actions
import * as RecipeActions from '@redux/photobook/actions';

// Components
import Loading from '@components/general/Loading';
import TemplateListRender from './TemplateListView';

/* Redux ==================================================================== */
// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  templates: state.photobook.templates || [],
});

// Any actions to map to the component?
const mapDispatchToProps = {
  getTemplates: RecipeActions.getTemplates,
};

/* Component ==================================================================== */
class TemplateList extends Component {
  static componentName = 'TemplateList';

  static propTypes = {
    templates: PropTypes.arrayOf(PropTypes.object),
    getTemplates: PropTypes.func.isRequired,
  }

  static defaultProps = {
    templates: [],
  }

  state = {
    loading: false,
    templates: [],
  }

  componentDidMount = () => this.getThisTemplates(this.props.templates);
  componentWillReceiveProps = props => this.getThisTemplates(props.templates);

  /**
    * Pick out templates that are in the current meal
    * And hide loading state
    */
  getThisTemplates = (allTemplates) => {
    if (allTemplates.length > 0) {
      const templates = allTemplates;

      this.setState({
        templates,
        loading: false,
      });
    }
  }

  /**
    * Fetch Data from API
    */
  fetchTemplates = () => this.props.getTemplates()
    .then(() => this.setState({ error: null, loading: false }))
    .catch(err => this.setState({ error: err.message, loading: false }))

  render = () => {
    if (this.state.loading) return <Loading />;

    return (
      <TemplateListRender
        templates={this.state.templates}
        reFetch={this.fetchTemplates}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplateList);

/**
 * List of Recipes for a Meal Container
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
import RecipeListingRender from './ListingView';

/* Redux ==================================================================== */
// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  recipes: state.photobook.recipes || [],
});

// Any actions to map to the component?
const mapDispatchToProps = {
  getTemplates: RecipeActions.getTemplates,
};

/* Component ==================================================================== */
class MealListing extends Component {
  static componentName = 'MealListing';

  static propTypes = {
    recipes: PropTypes.arrayOf(PropTypes.object),
    meal: PropTypes.string.isRequired,
    getTemplates: PropTypes.func.isRequired,
  }

  static defaultProps = {
    recipes: [],
  }

  state = {
    loading: false,
    recipes: [],
  }

  componentDidMount = () => this.getThisMealsRecipes(this.props.recipes);
  componentWillReceiveProps = props => this.getThisMealsRecipes(props.recipes);

  /**
    * Pick out recipes that are in the current meal
    * And hide loading state
    */
  getThisMealsRecipes = (allRecipes) => {
    if (allRecipes.length > 0) {
      const recipes = allRecipes.filter(recipe =>
        recipe.category.toString() === this.props.meal.toString(),
      );

      this.setState({
        recipes,
        loading: false,
      });
    }
  }

  /**
    * Fetch Data from API
    */
  fetchRecipes = () => this.props.getTemplates()
    .then(() => this.setState({ error: null, loading: false }))
    .catch(err => this.setState({ error: err.message, loading: false }))

  render = () => {
    if (this.state.loading) return <Loading />;

    return (
      <RecipeListingRender
        recipes={this.state.photobook}
        reFetch={this.fetchRecipes}
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MealListing);

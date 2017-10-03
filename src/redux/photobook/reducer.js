/**
 * Recipe Reducer
 *
 * Gotcha React Native Starter
 * https://bitbucket.org/teamgotcha/gc
 */
import Store from './store';

// Set initial state
export const initialState = Store;

export default function recipeReducer(state = initialState, action) {
  switch (action.type) {
    case 'FAVOURITES_REPLACE': {
      return {
        ...state,
        favourites: action.data || [],
      };
    }
    case 'TABS_REPLACE': {
      return {
        ...state,
        tabs: action.data,
      };
    }
    case 'TEMPLATES_REPLACE': {
      let templates = [];

      // Pick out the props I need
      if (action.data && typeof action.data === 'object') {
        templates = action.data.map(item => ({
          id: item.id,
          title: item.title,
          body: item.body,
          category: item.category,
          image: item.image,
          author: item.author,
          ingredients: item.ingredients,
          method: item.method,
        }));
      }

      return {
        ...state,
        templates,
      };
    }
    default:
      return state;
  }
}

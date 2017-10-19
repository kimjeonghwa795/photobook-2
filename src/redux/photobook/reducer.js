/**
 * Recipe Reducer
 *
 * Gotcha React Native Starter
 * https://bitbucket.org/teamgotcha/gc
 */
import Store from './store';

// Set initial state
export const initialState = Store;

export default function photobookReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_IMAGE': {
      return {
        ...state,
        images: [
          ...state.images.slice(0,action.index+1),
          action.image,
          ...state.images.slice(action.index+1)
        ],
      };
    }
    case 'REMOVE_IMAGE': {
      return {
        ...state,
        images: [
          ...state.images.slice(0,action.index), 
          ...state.images.slice(action.index+1)
        ],
      };
    }
    case 'EDIT_IMAGE': {
      return {
        ...state,
        images: [
          ...state.images.slice(0,action.index),
          action.image,
          ...state.images.slice(action.index+1)
        ],
      };
    }
    case 'IMPORT_IMAGES': {
      return {
        ...state,
        images: action.images,
      };
    }
    case 'RESET_IMAGES': {
      return {
        ...state,
        images: [],
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

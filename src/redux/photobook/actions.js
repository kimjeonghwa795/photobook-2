/**
 * Recipe Actions
 *
 * Gotcha React Native Starter
 * https://bitbucket.org/teamgotcha/gc
 */
import { Firebase, FirebaseRef } from '@constants/';

/**
  * Get this User's Favourite Recipes
  */
export function getFavourites(dispatch) {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  const UID = Firebase.auth().currentUser.uid;
  if (!UID) return false;

  const ref = FirebaseRef.child(`favourites/${UID}`);

  return ref.on('value', (snapshot) => {
    const favs = snapshot.val() || [];

    return dispatch({
      type: 'FAVOURITES_REPLACE',
      data: favs,
    });
  });
}

/**
  * Reset a User's Favourite Recipes in Redux (eg for logou)
  */
export function resetFavourites(dispatch) {
  return dispatch({
    type: 'FAVOURITES_REPLACE',
    data: [],
  });
}

/**
  * Update My Favourites Recipes
  */
export function replaceFavourites(newFavourites) {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  const UID = Firebase.auth().currentUser.uid;
  if (!UID) return false;

  return () => FirebaseRef.child(`favourites/${UID}`).set(newFavourites);
}

/**
  * Get Tabs
  */
export function getTabs() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  return dispatch => new Firebase.Promise((resolve) => {
    const ref = FirebaseRef.child('tabs');

    return ref.once('value').then((snapshot) => {
      const tabs = snapshot.val() || {};

      return resolve(dispatch({
        type: 'TABS_REPLACE',
        data: tabs,
      }));
    });
  });
}

/**
  * Get Templates
  */
export function getTemplates() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  return dispatch => new Firebase.Promise((resolve) => {
    const ref = FirebaseRef.child('templates');

    return ref.on('value', (snapshot) => {
      const templates = snapshot.val() || {};

      return resolve(dispatch({
        type: 'TEMPLATES_REPLACE',
        data: templates,
      }));
    });
  });
}

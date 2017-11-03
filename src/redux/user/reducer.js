/**
 * User Reducer
 *
 * Gotcha React Native Starter
 * https://bitbucket.org/teamgotcha/gc
 */

// Set initial state
const initialState = {};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case 'USER_LOGIN': {
      if (action.data && action.loginType) {
        const input = action.data;
        return {
          ...state,
          uid: input.uid,
          email: input.email,
          emailVerified: input.emailVerified,
          loginType: action.loginType,
        };
      }
      return {};
    }
    case 'USER_DETAILS_UPDATE': {
      if (action.data) {
        const input = action.data;
        return {
          ...state,
          firstName: input.firstName,
          lastName: input.lastName,
          signedUp: input.signedUp,
          role: input.role,
        };
      }
      return {};
    }
    case 'USER_LOGOUT': {
      return {};
    }
    default:
      return state;
  }
}

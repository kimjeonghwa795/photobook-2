/**
 * Sign Up Container
 *
 * Gotcha React Native Starter
 * https://bitbucket.org/teamgotcha/gc
 */
import { connect } from 'react-redux';

// Actions
import * as UserActions from '@redux/user/actions';

// The component we're mapping to
import FormRender from './FormView';

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  user: state.user,
  formType: 'updateProfile',
  formFields: ['Email', 'FirstName', 'LastName', 'Address1', 'Address2'],
  buttonTitle: 'Update',
  successMessage: 'Great, that\'s been updated!',
});

// Any actions to map to the component?
const mapDispatchToProps = {
  submit: UserActions.updateProfile,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormRender);

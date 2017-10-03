/**
 * Launch Screen Container
 *
 * Gotcha React Native Starter
 * https://bitbucket.org/teamgotcha/gc
 */
import { connect } from 'react-redux';

// Actions
import * as UserActions from '@redux/user/actions';
import * as RecipeActions from '@redux/photobook/actions';

// The component we're mapping to
import AppLaunchRender from './LaunchView';

// What data from the store shall we send to the component?
const mapStateToProps = () => ({
});

// Any actions to map to the component?
const mapDispatchToProps = {
  login: UserActions.login,
  getTemplates: RecipeActions.getTemplates,
  getTabs: RecipeActions.getTabs,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppLaunchRender);

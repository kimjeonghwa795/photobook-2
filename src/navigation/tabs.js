/**
 * Tabs Scenes
 *
 * Gotcha React Native Starter
 * https://bitbucket.org/teamgotcha/gc
 */
import React from 'react';
import { Scene } from 'react-native-router-flux';

// Consts and Libs
import { AppConfig } from '@constants/';
import { AppStyles, AppSizes } from '@theme/';

// Components
import { TabIcon } from '@ui/';
import { NavbarMenuButton } from '@containers/ui/NavbarMenuButton/NavbarMenuButtonContainer';

// Scenes
import Placeholder from '@components/general/Placeholder';
import Error from '@components/general/Error';
import Profile from '@containers/ProfileView';
import Photobook from '@containers/photobook/NewBook/NewBookContainer';
import TemplateList from '@containers/photobook/Template/TemplateListContainer';
import RecipeView from '@containers/photobook/RecipeView';

const navbarPropsTabs = {
  ...AppConfig.navbarProps,
  renderLeftButton: () => <NavbarMenuButton />,
  sceneStyle: {
    ...AppConfig.navbarProps.sceneStyle,
    paddingBottom: AppSizes.tabbarHeight,
  },
};

/* Routes ==================================================================== */
const scenes = (
  <Scene key={'tabBar'} tabs tabBarIconContainerStyle={AppStyles.tabbar} pressOpacity={0.95}>
    <Scene
      {...navbarPropsTabs}
      key={'photobook'}
      component={Photobook}
      title={'Photobook'}
      icon={props => TabIcon({ ...props, icon: 'photo-album' })}
    />

    <Scene
      {...navbarPropsTabs}
      key={'templateList'}
      component={TemplateList}
      title={'Choose a template'}
      analyticsDesc={'Choose a template'}
    />
    
    <Scene
      key={'timeline'}
      {...navbarPropsTabs}
      title={'Coming Soon'}
      component={Placeholder}
      icon={props => TabIcon({ ...props, icon: 'timeline' })}
      analyticsDesc={'Placeholder: Coming Soon'}
    />

    <Scene
      key={'error'}
      {...navbarPropsTabs}
      title={'Example Error'}
      component={Error}
      icon={props => TabIcon({ ...props, icon: 'error' })}
      analyticsDesc={'Error: Example Error'}
    />

    <Scene
      key={'Profile'}
      {...navbarPropsTabs}
      title={'Profile'}
      component={Profile}
      icon={props => TabIcon({ ...props, icon: 'person' })}
      analyticsDesc={'Profile: Profile'}
    />
  </Scene>
);

export default scenes;

/**
 * Authenticate Screen
 *  - Entry screen for all authentication
 *  - User can tap to login, forget password, signup...
 *
 * Gotcha React Native Starter
 * https://bitbucket.org/teamgotcha/gc
 */
import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import FormValidation from 'tcomb-form-native';
import TcombTextInput from '@components/tcomb/TextInput';
import stylesheet from 'tcomb-form-native/lib/stylesheets/bootstrap';
import GoogleSignIn from 'react-native-google-sign-in';

// Consts and Libs
import { AppStyles, AppSizes, AppColors } from '@theme/';

// Components
import { Spacer, Text, Button } from '@ui/';

// Actions
import * as UserActions from '@redux/user/actions'

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  user: state.user,
  formType: 'login',
  formFields: ['EMAIL', 'PASSWORD'],
  buttonTitle: 'Login',
  successMessage: 'Awesome, you\'re now logged in',
});

// Any actions to map to the component?
const mapDispatchToProps = {
  submit: UserActions.login,
};

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  background: {
    backgroundColor: '#fff',
    height: AppSizes.screen.height,
    width: AppSizes.screen.width,
  },
  loginLogo: {
    marginLeft: 5,
    marginRight: 5,
  },
  logo: {
    width: AppSizes.screen.width * 0.5,
    resizeMode: 'contain',
  },
  whiteText: {
    color: '#FFF',
  },
});

/* Component ==================================================================== */
class Authenticate extends Component {
  static componentName = 'Authenticate';

  constructor(props){
    super(props);

    formFields = {
      Email: this.validEmail,
      Password: this.validPassword,
    }

    this.state = {
      resultMsg: {
        status: '',
        success: '',
        error: '',
      },
      form_fields: FormValidation.struct(formFields),
      form_values: {
        Email: (props.user && props.user.email) ? props.user.email : '',
      },
      options: {
        fields: {
          Email: {
            template: TcombTextInput,
            error: 'Please enter a valid email',
            autoCapitalize: 'none',
            clearButtonMode: 'while-editing',
          },
          Password: {
            template: TcombTextInput,
            error: 'Passwords must be more than 8 characters and contain letters and numbers',
            clearButtonMode: 'while-editing',
            secureTextEntry: true,
          },
        },
      },
    };

    this.googleLogin = this.googleLogin.bind(this);
  }

  /**
  * Email Validation
  */
  validEmail = FormValidation.refinement(
    FormValidation.String, (email) => {
      const regularExpression = /^.+@.+\..+$/i;

      return regularExpression.test(email);
    },
  );

  /**
    * Password Validation - Must be 6 chars long
    */
  validPassword = FormValidation.refinement(
    FormValidation.String, (password) => {
      if (password.length < 8) return false; // Too short
      if (password.search(/\d/) === -1) return false; // No numbers
      if (password.search(/[a-zA-Z]/) === -1) return false; // No letters
      return true;
    },
  );
  
  async googleLogin() {
    await GoogleSignIn.configure({
      // iOS
      clientID: '1033924302442-sb2fi6lupc6stdju3e7eqqv8e309qpk2.apps.googleusercontent.com',
  
      // iOS, Android
      // https://developers.google.com/identity/protocols/googlescopes
      scopes: ['openid', 'email', 'profile'],
  
      // iOS, Android
      // Whether to request email and basic profile.
      // [Default: true]
      // https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a06bf16b507496b126d25ea909d366ba4
      shouldFetchBasicProfile: true,
    });
  
    const googleUser = await GoogleSignIn.signInPromise().then(() => {
      Actions.app();
    });
  }

  render = () => {
    const Form = FormValidation.form.Form;
    
    return (
      <View style={[AppStyles.containerCentered, AppStyles.container, styles.background]}>
        <View style={[AppStyles.containerCentered, AppStyles.flex1]}>
          <Text p style={[AppStyles.textCenterAligned, AppStyles.h2]}>
            Photobook
          </Text>
          
          <Image
            source={require('../../images/logo.png')}
            style={[styles.logo]}
          />

          <Spacer size={10} />

          <View style={[AppStyles.row, AppStyles.paddingHorizontal]}>
            <TouchableHighlight onPress={this.googleLogin}>
              <Image
                source={require('../../images/google-login.png')}
                style={[styles.loginLogo]}
              />
            </TouchableHighlight>
            <Image
              source={require('../../images/facebook-login.png')}
              style={[styles.loginLogo]}
            />

            <Image
              source={require('../../images/wechat-login.png')}
              style={[styles.loginLogo]}
            />
          </View>

          <Spacer size={10} />

          <Text p style={[AppStyles.textCenterAligned,]}>
            - OR -
          </Text>

          <Form
            ref={(b) => { this.form = b; }}
            type={this.state.form_fields}
            value={this.state.form_values}
            options={this.state.options}
          />

          <Spacer size={20} />

          <View style={[AppStyles.row, AppStyles.paddingHorizontal]}>
            <View style={[AppStyles.flex1]}>
              <Button
                title={'Login'}
                icon={{ name: 'lock' }}
                onPress={Actions.login}
                backgroundColor={'#16214d'}
              />
            </View>
          </View>

          <Spacer size={10} />
        </View>

        <View style={[AppStyles.row, AppStyles.footer]}>
          <View style={[AppStyles.flex1]}>
            <Button
              title={'Sign up'}
              onPress={Actions.signUp}
              raised={false}
              backgroundColor={'#fff'}
              color={'#808080'}
            />
          </View>
          <View style={[AppStyles.flex1]}>
            <Button
              title={'Skip'}
              onPress={Actions.app}
              raised={false}
              backgroundColor={'#fff'}
              color={'#808080'}
            />
          </View>
        </View>

      </View>
    )
  }
}

/* Export Component ==================================================================== */
export default connect(mapStateToProps, mapDispatchToProps)(Authenticate);

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
  TouchableOpacity,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import FormValidation from 'tcomb-form-native';
import TcombTextInput from '@components/tcomb/TextInput';
import stylesheet from 'tcomb-form-native/lib/stylesheets/bootstrap';
import GoogleSignIn from 'react-native-google-sign-in';
import { SocialIcon } from 'react-native-elements';
import { FBLogin, FBLoginManager } from 'react-native-facebook-login';

// Consts and Libs
import { AppStyles, AppSizes, AppColors } from '@theme/';

// Components
import { Spacer, Button } from '@ui/';

// Actions
import * as UserActions from '@redux/user/actions'

// What data from the store shall we send to the component?
const mapStateToProps = state => ({
  user: state.user,
  formType: 'login',
  formFields: ['Email', 'Password'],
  buttonTitle: 'Login',
  successMessage: 'Awesome, you\'re now logged in',
});

// Any actions to map to the component?
const mapDispatchToProps = {
  submit: UserActions.login,
  emailLogin: UserActions.login,
  googleLogin: UserActions.googleLogin,
  fbLogin: UserActions.fbLogin,
};

/* Styles ==================================================================== */
const styles = StyleSheet.create({
  background: {
    backgroundColor: '#fff',
    height: AppSizes.screen.height,
    width: AppSizes.screen.width,
  },
  title1: {
    color: '#fff',
    backgroundColor: '#39babd',
    fontSize: 40,
  },
  title2: {
    color: '#39babd',
    backgroundColor: '#fff',
    fontSize: 40,
  },
  thinFont: {
    fontWeight:'300',
  },
  whiteText: {
    color: '#FFF',
  },
  socialIcon: {
    height: 52,
    width: 52,
  },
  container: {
    margin: 7,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  
  googleLogin = async () => {
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
  
    const googleUser = await GoogleSignIn.signInPromise().then((user) => {
      this.props.googleLogin(user).then(() => {
        Actions.app({ type: 'reset' });
      });
    });
  }

  fbLogin = () => {
    FBLoginManager.loginWithPermissions(["email","user_friends"], (error, data) => {
      this.props.fbLogin(data.credentials.token).then(() => {
        Actions.app({ type: 'reset' });
      });
    })
  }

  emailLogin = () => {
    // Get new credentials and update
    const formData = this.form.getValue();

    // Form is valid
    if (formData) {
      this.setState({ form_values: formData }, () => {
        this.setState({ resultMsg: { status: 'One moment...' } });

        // Scroll to top, to show message
        if (this.scrollView) this.scrollView.scrollTo({ y: 0 });

        if (this.props.emailLogin) {
          this.props.emailLogin(formData).then(() => {
            this.setState({
              resultMsg: { success: 'Login success' },
            }, () => {
              Actions.app({ type: 'reset' });
            });
          }).catch(err => this.setState({ resultMsg: { error: err.message } }));
        } else {
          this.setState({ resultMsg: { error: 'Submit function missing' } });
        }
      });
    }
    return true;
  }

  render = () => {
    const Form = FormValidation.form.Form;
    
    return (
      <View style={[AppStyles.containerCentered, AppStyles.container, styles.background]}>
        <View style={[AppStyles.containerCentered, AppStyles.flex1]}>
          <View style={[AppStyles.row]}>
            <Text style={[styles.title1, styles.thinFont]}>
              Photo
            </Text>
            <Text style={[styles.title2, styles.thinFont]}>
              Book
            </Text>
          </View>

          <Spacer size={30} />

          <View style={[AppStyles.row]}>
            <TouchableOpacity onPress={this.googleLogin}>
              <View>
                <SocialIcon
                  type='google-plus-official'
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={this.fbLogin}>
              <View>
                <SocialIcon
                  type='facebook'
                />
              </View>
            </TouchableOpacity> 
          </View>

          <Spacer size={10} />

          <Text style={[AppStyles.textCenterAligned, styles.thinFont]}>
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
                onPress={this.emailLogin}
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
              fontWeight={'300'}
            />
          </View>
          <View style={[AppStyles.flex1]}>
            <Button
              title={'Skip'}
              onPress={Actions.app}
              raised={false}
              backgroundColor={'#fff'}
              color={'#808080'}
              fontWeight={'300'}
            />
          </View>
        </View>

      </View>
    )
  }
}

/* Export Component ==================================================================== */
export default connect(mapStateToProps, mapDispatchToProps)(Authenticate);

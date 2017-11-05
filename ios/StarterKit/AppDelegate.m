/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <FBSDKCoreKit/FBSDKCoreKit.h>
#import <FBSDKLoginKit/FBSDKLoginKit.h>
#import <Stripe/Stripe.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;

  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];

  //NSLog ( @"jsCodeLocation = %@", jsCodeLocation);

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"StarterKit"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];

  /**
   * Custom
   * Get launch image - saves annoying white flash
   */
  UIImageView *launchScreenView = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"Launch"]]; // Image named "Launch"
  launchScreenView.frame = self.window.bounds;
  launchScreenView.contentMode = UIViewContentModeScaleAspectFill;
  rootView.loadingView = launchScreenView;
  
  NSString *filePath = [[NSBundle mainBundle] pathForResource:@"GoogleService-Info" ofType:@"plist"];
  NSDictionary *plistDict = [NSDictionary dictionaryWithContentsOfFile:filePath];
  [GIDSignIn sharedInstance].clientID = [plistDict objectForKey:@"CLIENT_ID"];
  
  return [[FBSDKApplicationDelegate sharedInstance] application:application
                                  didFinishLaunchingWithOptions:launchOptions];;
}

/*- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            options:(NSDictionary<UIApplicationOpenURLOptionsKey,id> *)options {
  BOOL handled = [[GIDSignIn sharedInstance] handleURL:url
                                     sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
                                            annotation:options[UIApplicationOpenURLOptionsAnnotationKey]];
  return handled;
}*/

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication
         annotation:(id)annotation {
  
  BOOL stripeHandled = [Stripe handleStripeURLCallbackWithURL:url];
  BOOL wasHandled=false;

  
  if (stripeHandled) {
    return YES;
  } else {
    if ([url.scheme hasPrefix:@"fb"]) {
      wasHandled = [[FBSDKApplicationDelegate sharedInstance] application:application
                                                                 openURL:url
                                                       sourceApplication:sourceApplication
                                                              annotation:annotation];
    }
    else
    {
      wasHandled=  [[GIDSignIn sharedInstance] handleURL:url
                                       sourceApplication:sourceApplication
                                              annotation:annotation];
    }
  }

  return wasHandled;
}

  // Facebook SDK
- (void)applicationDidBecomeActive:(UIApplication *)application {
  [FBSDKAppEvents activateApp];
}

@end

/**
 * Text Input template for tcomb
 *
 * Gotcha React Native Starter
 * https://bitbucket.org/teamgotcha/gc
 */
import React from 'react';
import { View } from 'react-native';

// Components
import { FormInput, FormLabel, FormValidationMessage } from '@ui/';
import { AppSizes } from '@theme/';

/* Component ==================================================================== */
function textbox(locals) {
  if (locals.hidden) {
    return null;
  }

  return (
    <View style={[{width: AppSizes.screen.width * 0.85,}]}>
      <FormInput
        accessibilityLabel={locals.label}
        autoCapitalize={locals.autoCapitalize}
        autoCorrect={locals.autoCorrect}
        autoFocus={locals.autoFocus}
        blurOnSubmit={locals.blurOnSubmit}
        editable={locals.editable}
        keyboardType={locals.keyboardType}
        maxLength={locals.maxLength}
        multiline={locals.multiline}
        onBlur={locals.onBlur}
        onEndEditing={locals.onEndEditing}
        onFocus={locals.onFocus}
        onLayout={locals.onLayout}
        onSelectionChange={locals.onSelectionChange}
        onSubmitEditing={locals.onSubmitEditing}
        onContentSizeChange={locals.onContentSizeChange}
        placeholderTextColor={'grey'}
        secureTextEntry={locals.secureTextEntry}
        selectTextOnFocus={locals.selectTextOnFocus}
        selectionColor={locals.selectionColor}
        numberOfLines={locals.numberOfLines}
        underlineColorAndroid={locals.underlineColorAndroid}
        clearButtonMode={locals.clearButtonMode}
        clearTextOnFocus={locals.clearTextOnFocus}
        enablesReturnKeyAutomatically={locals.enablesReturnKeyAutomatically}
        keyboardAppearance={locals.keyboardAppearance}
        onKeyPress={locals.onKeyPress}
        returnKeyType={locals.returnKeyType}
        selectionState={locals.selectionState}
        onChangeText={value => locals.onChange(value)}
        onChange={locals.onChangeNative}
        placeholder={locals.label}
        value={locals.value}
      />
      {!!locals.error && <FormValidationMessage>{locals.error}</FormValidationMessage>}
    </View>
  );
}

/* Export Component ==================================================================== */
module.exports = textbox;

import React from 'react';
import {View, Text, Button, StyleSheet, Pressable} from 'react-native';

const Custombutton = ({onPress, text, type = 'PRIMARY', bgColor, fgColor}) => {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.custom,
        styles[`custom_${type}`],
        bgColor ? {backgroundColor: bgColor} : {},
      ]}>
      {/* <Button title="signin" style={styles.button}/> */}
      <Text
        style={[
          styles.button,
          styles[`button_${type}`],
          fgColor ? {color: fgColor} : {},
        ]}>
        {text}
      </Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  button: {
    fontWeight: 'bold',
    color: 'white',
  },
  button_TERTIARY: {
    color: 'gray',
  },
  custom: {
    width: '50%',
    marginRight: 'auto',
    marginLeft: 'auto',
    display: 'flex',
    padding: 15,
    marginVertical: 5,
    alignItems: 'center',
    borderRadius: 5,
  },
  custom_PRIMARY: {
    backgroundColor: '#3B71F3',
  },
  custom_TERTIARY: {},
});

export default Custombutton;

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CalculatorButton = ({ text, fontSize=32, bgColor='white', onPress=()=>{}, onLongPress=()=>{} }) => {
  return (
    <TouchableOpacity style={ styles.touchable } onPress={onPress} onLongPress={onLongPress} >
      <View style={{ ...styles.content, backgroundColor: bgColor }}>
        <Text style={{ fontSize: fontSize }}>{text}</Text>
      </View>
    </TouchableOpacity> 
  );
}

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
  },
  content: {
    margin: 5,
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderColor: 'black',
  }
});

export default CalculatorButton;
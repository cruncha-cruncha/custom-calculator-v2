import React, { useReducer } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import CalculatorButton from './CalculatorButton';
import mainReducer from './mainReducer';

const Main = () => {
  const [state, dispatch] = useReducer(
    mainReducer,
    {
      evalString: '',
      output: '',
      actions: [],
      recording: '',
      records: { A: [], B: [] }
    }
  );

  return (
    <View style={ styles.body }>
      <View style={ styles.outputSection }>
        <ScrollView>
          <Text style={ styles.outputText }>{state.evalString}{state.output ? ' =' : ''}</Text>
          <Text style={ styles.outputText }>{state.output}</Text> 
        </ScrollView>
      </View>
      <View style={ styles.buttonsSection }>
        <View style={ styles.buttonRow }>
          <CalculatorButton text='1' onPress={() => dispatch({ type: 'numeric', payload: '1' })} />
          <CalculatorButton text='2' onPress={() => dispatch({ type: 'numeric', payload: '2' })} />
          <CalculatorButton text='3' onPress={() => dispatch({ type: 'numeric', payload: '3' })} />
          <CalculatorButton text='&divide;' onPress={() => dispatch({ type: 'symbolic', payload: 'divide' })} fontSize={38}/>
        </View>
        <View style={ styles.buttonRow }>
          <CalculatorButton text='4' onPress={() => dispatch({ type: 'numeric', payload: '4' })} />
          <CalculatorButton text='5' onPress={() => dispatch({ type: 'numeric', payload: '5' })} />
          <CalculatorButton text='6' onPress={() => dispatch({ type: 'numeric', payload: '6' })} />
          <CalculatorButton text='&times;' onPress={() => dispatch({ type: 'symbolic', payload: 'multiply' })} fontSize={36} />
        </View>
        <View style={ styles.buttonRow }>
          <CalculatorButton text='7' onPress={() => dispatch({ type: 'numeric', payload: '7' })} />
          <CalculatorButton text='8' onPress={() => dispatch({ type: 'numeric', payload: '8' })} />
          <CalculatorButton text='9' onPress={() => dispatch({ type: 'numeric', payload: '9' })} />
          <CalculatorButton text='-' onPress={() => dispatch({ type: 'symbolic', payload: 'subtract' })} fontSize={36} />
        </View>
        <View style={ styles.buttonRow }>
          <CalculatorButton text='0' onPress={() => dispatch({ type: 'numeric', payload: '0' })} />
          <CalculatorButton text='.' onPress={() => dispatch({ type: 'numeric', payload: '.' })} fontSize={36} />
          <CalculatorButton text='=' onPress={() => dispatch({ type: 'symbolic', payload: 'equals' })} fontSize={36} />
          <CalculatorButton text='+' onPress={() => dispatch({ type: 'symbolic', payload: 'add' })} fontSize={36} />
        </View>
        <View style={ styles.buttonRow } >
          <CalculatorButton text='A' bgColor={state.recording === 'A' ? 'red' : 'white'} onPress={() => dispatch({ type: 'short_press_record', payload: 'A' })} onLongPress={() => dispatch({ type: 'long_press_record', payload: 'A' })} />
          <CalculatorButton text='B' bgColor={state.recording === 'B' ? 'red' : 'white'} onPress={() => dispatch({ type: 'short_press_record', payload: 'B' })} onLongPress={() => dispatch({ type: 'long_press_record', payload: 'B' })} />
          <CalculatorButton text='CE' onPress={() => dispatch({ type: 'meta', payload: 'clear_event' })} />
          <CalculatorButton text='C' onPress={() => dispatch({ type: 'meta', payload: 'clear_all' })} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
  },
  outputSection: {
    margin: 5,
    padding: 5,
    height: 200,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white'
  },  
  outputText: {
    fontSize: 48
  },
  buttonsSection: {
    flexDirection: 'column',
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    flex: 1,
  }
});

export default Main;


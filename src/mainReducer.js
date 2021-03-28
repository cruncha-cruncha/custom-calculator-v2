const stringToActions = (evalString) => {
  const out = [];
  for (const c of evalString.toString()) {
    switch(c) {
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '.':
        out.push({ type: 'numeric', payload: c });
        break;
      case '/':
        out.push({ type: 'symbolic', payload: 'divide' });
        break;
      case '*':
        out.push({ type: 'symbolic', payload: 'multiply' });
        break;
      case '-':
        out.push({ type: 'symbolic', payload: 'subtract' });
        break;
      case '+':
        out.push({ type: 'symbolic', payload: 'add' });
        break;
    }
  }
  return out;
}

const actionsToString = (actions) => {
  let out = '';
  for (const a of actions) {
    switch(a.type) {
      case 'numeric':
        out += a.payload;
        break;
      case 'symbolic':
        switch(a.payload) {
          case 'divide':
            out += '/';
            break;
          case 'multiply':
            out += '*';
            break;
          case 'subtract':
            out += '-';
            break;
          case 'add':
            out += '+';
            break;
        }
        break;
    }
  }
  return out;
}

const mainReducer = (state, action) => {
  if (state.recording === '') {
    let evalString = state.evalString;
    let output = state.output;
    let actions = state.actions;

    switch(action.type) {
      case 'numeric':
        if (output !== '') {
          evalString = '';
          actions = [];
        }
        return {
          ...state,
          evalString: evalString + action.payload,
          output: '',
          actions: [ ...actions, action ]
        };
      case 'symbolic':
        if (output !== '') {
          evalString = output;
          actions = stringToActions(output);
        }
        switch(action.payload) {
          case 'divide':
            return {
              ...state,
              evalString: evalString + '/',
              output: '',
              actions: [ ...actions, action ]
            };
          case 'multiply':
            return {
              ...state,
              evalString: evalString + '*',
              output: '',
              actions: [ ...actions, action ]
            };
          case 'subtract':
            return {
              ...state,
              evalString: evalString + '-',
              output: '',
              actions: [ ...actions, action ]
            };
          case 'add':
            return {
              ...state,
              evalString: evalString + '+',
              output: '',
              actions: [ ...actions, action ]
            };
          case 'equals':
            try {
              output = Math.round(eval(evalString) * 100000) / 100000;
            } catch (e) {
              output = '';
            }
            return  {
              ...state,
              output: output
            };
          default:
            return state;
        }
      case 'meta':
        switch(action.payload) {
          case 'clear_event':
            return {
              ...state,
              evalString: evalString.slice(0, -1),
              output: '',
              actions: actions.slice(0, -1)
            };
          case 'clear_all':
            return {
              ...state,
              evalString: '',
              output: '',
              actions: []
            };
          default:
            return state;
        }
      case 'short_press_record':
        const record = state.records[action.payload];

        if (record.length > 0 && output !== '') {
          if (record[0].type == 'symbolic') {
            evalString = output;
            actions = stringToActions(output);
          } else {
            evalString = '';
            actions = [];
          }
        }
        
        return {
          ...state,
          evalString: evalString + actionsToString(record),
          output: '',
          actions: [ ...actions, ...record]
        }
      case 'long_press_record':
        return {
          ...state,
          evalString: '',
          output: '',
          actions: [],
          recording: action.payload,
          records: { ...state.records, [action.payload]: [] }
        };
      default:
        return state;
    }
  } else {
    switch(action.type) {
      case 'numeric':
      case 'symbolic':
        if (action.payload !== "equals") {
          const newRecord = [ ...state.records[state.recording], action ];
          return {
            ...state,
            evalString: actionsToString(newRecord),
            records: { ...state.records, [state.recording]: newRecord }
          };
        }
      default:
        return {
          ...state,
          evalString: '',
          recording: ''
        };
    }
  }
}

export default mainReducer;
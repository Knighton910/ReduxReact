// Store Constructor: Factory
function createStore(reducer, initialState) {
  let state = initialState;
  const listeners = [];

  const subscribe = listener => listeners.push(listener);

  const getState = () => state;

  const dispatch = action => {
    state = reducer(state, action);
    listeners.forEach(l => l());
  };

  return {
    subscribe,
    getState,
    dispatch
  };
}

// Reducer
function reducer(state, action) {
  if (action.type === "ADD_MESSAGE") {
    return {
      messages: state.messages.concat(action.message)
    };
  } else if (action.type === "DELETE_MESSAGE") {
    return {
      messages: [
        ...state.messages.slice(0, action.index),
        ...state.messages.slice(action.index + 1, state.messages.length)
      ]
    };
  } else {
    return state;
  }
}

const initialState = { messages: [] };
// Redux Store
const store = createStore(reducer, initialState);

const listener = () => {
  console.log("Current state: ");
  console.log(store.getState());
};

// listener now subscribe
store.subscribe(listener);

// type: ACTION ✨🚀
const addMessageAction1 = {
  type: "ADD_MESSAGE",
  message: "How do you read?"
};

store.dispatch(addMessageAction1);
/** @desc: `listener()` is called */
// const stateV1 = store.getState();

// type: ACTION ✨🚀
const addMessageAction2 = {
  type: "ADD_MESSAGE",
  message: "I read you loud and clear, Houston."
};

store.dispatch(addMessageAction2);
/** @desc: `listener()` is called */
// const stateV2 = store.getState();

// console.log('state v1:');
// console.log(stateV1);
// console.log('state v2:');
// console.log(stateV2);

// type: ACTION ✨🚀
const deleteMessageAction = {
  type: "DELETE_MESSAGE",
  index: 0
};

store.dispatch(deleteMessageAction);
/** @desc: `listener()` is called */
// const stateV3 = store.getState();

// console.log('State v3:');
// console.log(stateV3);

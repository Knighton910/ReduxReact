import React, { Component }  from 'react';

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


// React Parent Component
class App extends React.Component {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }

  render() {
    const messages = store.getState().messages;

    return (
      <div className='ui segment'>
        <MessageView messages={messages} />
        <MessageInput />
      </div>
    )
  }
}

// MessageInput Component
class MessageInput extends React.Component {
   state = {
     value: '',
   };

   onChange = (e) => {
      this.setState({
        value: e.target.value,
      })
    };

    handleSubmit = () => {
      store.dispatch({
        type: 'ADD_MESSAGE',
        message: this.state.value,
      });
      this.setState({
        value: '',
      })
    }

    render() {
      return (
        <div className='ui input'>
          <input
            onChange={this.onChange}
            value={this.state.value}
            type='text'
            />

            <button
              onClick={this.handleSubmit}
              className='ui primary button'
              type='submit'
              >
              Submit
            </button>
        </div>
      );
    }
  }

  // MessageView Component
  class MessageView extends React.Component {
    handleClick = (index) => {
      store.dispatch(
        // Action Object: Delete
        { type: 'DELETE_MESSAGE', index: index, });
    };

    render() {
      const messages = this.props.messages.map((message, index) => (
        <div
          className='comment'
          key={index}
          onClick={() => this.handleClick(index)}
          >
          {message}
        </div>
      ));

      return (
        <div className='ui comments'>
          {messages}
        </div>
      )
    }
  }

  export default App;

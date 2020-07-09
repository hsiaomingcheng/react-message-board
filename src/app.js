import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import rootReducer from './redux/reducer/message';
import Home from './page/Home';

const store = createStore(rootReducer);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <Home />
                </div>
            </Provider>
        );
    }
}

export default hot(App);
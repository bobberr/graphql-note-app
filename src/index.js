import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import client from './apollo-client';
import { ApolloProvider } from 'react-apollo';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import dataReducer from './redux/reducers/dataReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(dataReducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;
const app = () => {
    return (
        <ApolloProvider client={client} >
            <Provider store={store}>
                <App/>
            </Provider>
        </ApolloProvider>    
    )
}

ReactDOM.render(app(), document.getElementById('root'));
registerServiceWorker();

import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

import rootReducer from './reducers/index'

import { composeWithDevTools} from 'redux-devtools-extension'

// Its API is (subscribe, dispatch , getState)
// dispatch để tạo ra action
const store = createStore(
  rootReducer,  //nhận vào ông reducer của mình
  composeWithDevTools(applyMiddleware(thunk))
)

const DataProvider = ({children}) => {
  return(
    <Provider store={store}>
      {children}
    </Provider>
  )
}

export default DataProvider
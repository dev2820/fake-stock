import "./App.css";
import routes from "./routes.js";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./modules";
import logger from 'redux-logger';
import ReduxThunk from 'redux-thunk'
function App() {
  const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(ReduxThunk,logger))
  );

  return (
    <Provider store={store}>
      {routes}
    </Provider>
  );
}

export default App;

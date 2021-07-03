import './App.css';
import routes from "./routes.js";
import { createStore } from 'redux';
import { Provider } from "react-redux";
import reducers from './modules';
function App() {
  return (
    <Provider store={createStore(reducers)}>
      {routes}
    </Provider>
  );
}

export default App;

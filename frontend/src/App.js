import "./App.css";
import routes from "./routes.js";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./modules";
function App() {
  return (
    <Provider store={createStore(reducers, composeWithDevTools())}>
      {routes}
    </Provider>
  );
}

export default App;

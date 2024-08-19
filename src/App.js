import { Provider } from 'react-redux';
import './App.css';
import store from './store/store';
import Login from './pages/Login/Login';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Login />
      </div>
    </Provider>
  );
}

export default App;

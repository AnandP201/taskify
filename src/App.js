import Home from "./components/Home";
import './App.css'
import 'rsuite/dist/rsuite.min.css'

export const endpoint="https://web-taskify.onrender.com"

function App() {
  return (
    <div className="App">
     <Home/>
    </div>
  );
}

export default App;

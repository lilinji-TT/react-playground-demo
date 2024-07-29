import "./App.css";
import ReactPlayGround from "./ReactPlayGround/index";
import { PlaygroundProvider } from "./ReactPlayGround/PlaygroundContext";
function App() {
  return (
    <PlaygroundProvider>
      <ReactPlayGround />
    </PlaygroundProvider>
  );
}

export default App;

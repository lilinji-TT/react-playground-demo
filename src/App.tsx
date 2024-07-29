import "./App.css";
import ReactPlayGround from "./ReactPlayground";
import { PlaygroundProvider } from "./ReactPlayground/PlaygroundContext";
function App() {
  return (
    <PlaygroundProvider>
      <ReactPlayGround />
    </PlaygroundProvider>
  );
}

export default App;

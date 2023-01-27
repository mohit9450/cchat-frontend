
import './App.css';
// import socketIO from "socket.io-client";
import {BrowserRouter as Router,Routes , Route} from "react-router-dom";
// const ENDPOINT = "http://localhost:4500/";
// const socket = socketIO(ENDPOINT , {transports : ['websocket']});
import Join from "./component/Join/join";
import Chat from "./component/Chat/Chat"
function App() {
  // socket.on("connect",()=>{
  //  console.log("connected..")
  // });
  return (
    <div className="App">
    <Router>
    <Routes>
      <Route path="/" element={<Join />} />
      <Route path="/chat" element={<Chat />}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;

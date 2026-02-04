import Login from "./pages/login.jsx";
import Notes from "./pages/Notes.jsx";

function App() {
  const token = localStorage.getItem("token");

  return <div>{token ? <Notes /> : <Login />}</div>;
}

export default App;
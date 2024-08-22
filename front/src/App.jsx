import { useState } from "react";

import "./App.scss";
import Login from "./components/Login/Login";
import Main from "./components/Main/Main";

function App() {
  const [login, setLogin] = useState(false);
  return (
    <>
      {!login && <Login setLogin={setLogin} />}
      {login && <Main setLogin={setLogin} />}
    </>
  );
}
{
}
export default App;

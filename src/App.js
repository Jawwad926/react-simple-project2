import React, { useContext } from "react";

import MainHeader from "./components/MainHeader/MainHeader";
import LogIn from "./components/LogIn/LogIn";
import Home from "./components/Home/Home";
import AuthContext from "./store/auth-context";

const App = () => {
  const ctx = useContext(AuthContext);

  return (
    <React.Fragment>
      <MainHeader />
      <main>
        {ctx.isLoggedIn && <Home />}
        {!ctx.isLoggedIn && <LogIn />}
      </main>
    </React.Fragment>
  );
};

export default App;

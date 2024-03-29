import "./App.css";
import Header from "./components/header/header";
import Main from "./components/mainBody/mainBody";
import "@fontsource/roboto/300.css";
import { fetchData, fetchUserDataLocally } from "./utility/handleAxiousRequest";
import { useEffect, useState, useContext } from "react";
import { connection } from "./context/socket";
let client_id = import.meta.env.CLIENTID;

function App() {
  const [response, setResponse] = useState({
    success: false,
    userFullname: "",
    userId: "",
    number: "",
    firstname: "",
    lastname: "",
    Dob: "",
    pictures: "",
  });

  const [count, updateCount] = useState(0);
  let [displayMode, setDisplayMode] = useState(false);

  function handleDisplaySwitch(event) {
    setDisplayMode((prevValue) => !prevValue);
  }

  async function getActiveUser() {
    let Response = await fetchData("http://localhost:3000/users/activeUser");

    sessionStorage.setItem("activeUserName", Response.data.username);

    setResponse((prevResponse) => {
      return {
        ...prevResponse,
        success: Response.success,
        userFullname: Response.data.firstname + " " + Response.data.lastname,
        firstname: Response.data.firstname,
        lastname: Response.data.lastname,
        userId: Response.data.username,
        number: Response.data.friendCount,
        Dob: Response.data.Dob,
        picture: Response.data.pictures,
      };
    });

    connection.emit("setUserId", Response.data.username);
  }

  async function handleGetActiveUserPicture() {
    try {
      let Response = await fetchData(
        "http://localhost:3000/users/getUserPicture"
      );
      setResponse((prevResponse) => {
        return {
          ...prevResponse,
          picture: Response.data.userPicUrl,
        };
      });
    } catch (e) {
      console.error(e);
    }
  }

  function reRender() {
    updateCount((prevCount) => prevCount + 1);
  }

  useEffect(() => {
    getActiveUser();
    handleGetActiveUserPicture();
  }, [count]);
  return (
    <div className="App">
      <Header
        firstName={response.firstname}
        number={response.number}
        rerunMainpage={reRender}
        activeUserData={response}
        displayMode={displayMode}
        handleDarkMode={handleDisplaySwitch}
      />
      <Main activeUser={response.userId} count={count} />
    </div>
  );
}

export default App;

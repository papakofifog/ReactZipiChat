import React, { useEffect} from "react";
let client_id = import.meta.env.CLIENTID;
import jwt_decode from "jwt-decode";
import { SendData } from "../../utility/handleAxiousRequest";
import customPassword from "../../utility/handleRandomPasswordGeneration";
import generateRandomNumber from "../../utility/generalFunctios";
import { showToast } from "../../utility/showToast";

export function SignInWithGoogle() {
  async function handleCallbackResponse(response) {
    try {
      let userObject = jwt_decode(response.credential);
      await handleGoogleSignIn(userObject);
    } catch (e) {
      console.error(e);
    }
  }

  async function handleGoogleSignIn(user) {
    let randomUserName =
      user.given_name +
      "_" +
      user.family_name +
      "_" +
      generateRandomNumber(0, 1000);
    let userdata = {
      firstname: user.given_name,
      lastname: user.family_name,
      username: randomUserName,
      email: user.email,
      password: customPassword,
      Dob: "22/01/2000",
    };
    let Response = await SendData(
      "http://localhost:3000/api/continueWithGoogle",
      userdata
    );
    if (Response.data.success) {
      showToast(Response.data.message, "green", true);
      window.sessionStorage.setItem("access-token", Response.data.token);
      setTimeout(() => {
        location.href = "/home";
      }, 4000);
    } else {
      showToast(Response.data.message, "red", false);
    }
  }

  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id:
        "31900775296-fph2smvosmqtlq3sp08da4dag05en94h.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
    <>
      <div className="googleButton"></div>
    </>
  );
}

import React ,{} from "react";
import { useLocation } from "react-router-dom";
import './AccountRecoveryPage.css';
import AppBrand from "../../AppBrand";
import PasswordReset from "./PasswordReset";
import EmailRequest from "./EmailRequest";


function AccountRecovery(props){
    const location = useLocation();
    const queryParams= new URLSearchParams(location.search);

    // Access query parameters using the get method.
    const user= queryParams.get("user") || undefined;

    return(
        <div className="accountRecorveryContainer">
            <div className="accountRecoveryInteractionSide">

                {user ?<PasswordReset user={user} /> : <EmailRequest/>}

            </div>
            <div className="zipiChatLogoArea">
                <AppBrand  style={"newAppBrandStyle"}/>
            </div>
        </div>
    );
}

export default AccountRecovery;
import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import InfoIcon from '@mui/icons-material/Info';


function showToast(message,style,status){
    let avatar= status ? CheckCircleIcon : InfoIcon
    return Toastify({
        text: message,
        duration: 5000,
        avatar:avatar,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: { background : style},
        onClick: function(){} // Callback after click
      }).showToast();


}

function showFileAsToast(message, style,){
  return Toastify({
    text: message,
    duration: -1,
    //avatar:avatar,
    close: true,
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style:style,
    onClick: function(){} // Callback after click
  }).showToast();
}

export {showToast, showFileAsToast}
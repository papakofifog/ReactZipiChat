function createElement(element){
    let newTag= document.createElement(element.target);
    newTag.setAttribute('class',element.class)
    newTag.setAttribute('id', element.id);
    return newTag;
}

function createImage(...element){
    let newImage= document.createElement('img');
    newImage.setAttribute('src',element[0]);
    newImage.setAttribute('class',element[1]);
    return newImage;
}

function createElementObject(element,elementClass,elementId){
    let targetElement= new Object({
        target: element,
        class:elementClass,
        id:elementId
    })
    return targetElement;
}
let succesImg= "/assets/svg/success-check.svg";

function createToastImage(...image){
    let newImage= createImage(image[0],image[1]);
    return newImage;
}



let ToastContainer=createElement(createElementObject('div','toastContainer','tC'));
let ToastInformation=createElement(createElementObject('p','toastText','tT'));
let ToastButtons=createElement(createElementObject('div','toastButtons','tB'));



function createSpinner(){
    let code=`<div class="text-center" style="margin-top:50px;">
    <div class="spinner-border" style="height:5rem; width:5rem;color:blue;" role="status">
      <span class="sr-only"></span>
    </div>
    <p>Loading...</p>
  </div>`;

    let spnnerContainer= createElement(createElementObject('div', 'spNote', 'sP'));
    spnnerContainer.innerHTML= code;
    return spnnerContainer;
}

function showInformationToast(message){
    let InfoToast=ToastContainer;
    let toastText=ToastInformation;
    toastText.innerHTML=message;
    InfoToast.appendChild(toastText);
    return InfoToast;
}




export { showInformationToast, createSpinner, createToastImage }
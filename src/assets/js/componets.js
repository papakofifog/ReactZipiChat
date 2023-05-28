export default function dropDown(data){
    return `<ul id="drop" class="dropdown emoji">
            ${data.map((items)=>{
                `<li class='list-item'>${items}</li>`
            })}
    </ul>`;
    
}
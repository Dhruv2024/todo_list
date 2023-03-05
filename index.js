let title = document.getElementById("title_for_todo");
let des = document.getElementById("description_for_todo");
let add = document.getElementById("submit")

update_page();
function update_page_after_adding(){
    let con = title.value
    let desc = des.value
    if (con.length == 0) {
        alert("Enter some Aim");
        return;
    }
    if(desc.length==0){
        desc+="___";
    }
    title.value = "";
    des.value = "";
    if (localStorage.getItem('itemsJson') == null) {
        itemJsonArray = [];
        itemJsonArray.push([con, desc])
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    }
    else {
        itemJsonArray = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArray)
        itemJsonArray.push([con, desc])
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    }
    update_page();
}

function update_page(){
    if (localStorage.getItem('itemsJson') == null) {
        itemJsonArray = [];
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    }
    else{

        document.getElementById('hide').style.display='!none'

        itemJsonArrayStr = localStorage.getItem('itemsJson')
        itemJsonArray = JSON.parse(itemJsonArrayStr); 
    }
    
    let tableBody = document.getElementById('tableBody')
    let str = ""
    itemJsonArray.forEach((element, index) => {
        str += `
            <tr>
                    <th scope="row">${index+1}</th>
                    <td>${element[0]}</td>
                    <td>${element[1]}</td>
                    <td><button id="del" class="btn btn-sm btn-primary" onclick="delete_row(${index})">Delete</button></td>
            </tr>
            `;
            
    }
    
    );
    tableBody.innerHTML=str;
    console.log(localStorage.getItem('itemsJson'))
    // console.log(con+"  "+desc)
    // let createdElement = document.createElement('p');
    // createdElement.innerHTML=con+" "+desc;
    // createdElement.style.fontsize="large"
    // document.getElementById("list").appendChild(createdElement)
}

function delete_row(index){
    itemJsonArray = localStorage.getItem('itemsJson')
    itemJsonArray = JSON.parse(itemJsonArray)
    //delete row
    itemJsonArray.splice(index,1)
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray))
    update_page();
}

add.addEventListener("click", update_page_after_adding);

let del=document.getElementById('clear');

del.addEventListener("click",()=>{
    if(confirm("Are you sure to clear the list?")){
        localStorage.clear();
        document.getElementById('tableBody').innerHTML="";
    }
    
})


let hide=document.getElementById('hide');
let tab=document.getElementById('tab')
let a=1;
hide.addEventListener("click",()=>{
    let tableBody = document.getElementById('tableBody')
    
    if(a==1){
        tableBody.style.visibility="hidden";
        tab.style.display="none";
        a=0;
    }
    else{
        tableBody.style.visibility="visible";
        tab.style.display="block";
        a=1;
    }
    console.log("kisine click kia");
})
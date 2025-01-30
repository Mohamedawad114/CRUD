
// document.addEventListener("DOMContentLoaded", function () {
    let title = document.getElementById("title");
    let price = document.getElementById('price');
    let taxe = document.getElementById('taxe');
    let ads = document.getElementById('ads');
    let discount = document.getElementById('discount');
    let total = document.getElementById('total');
    let count = document.getElementById('count');
    let category = document.getElementById('category');
    let create = document.getElementById('create');
    let search=document.getElementById('search');
    let delete_all = document.getElementById('delete_all');
    let btnmode=document.getElementById('btn-light');
    let currentPage = 1; 
    let rowsPerPage = 20; 
    let start = (currentPage - 1) * rowsPerPage; 
    let mood="create";
    let ex;
    let searchmood="title";

    let datapros
    if(localStorage.datapros !=null){
        datapros=JSON.parse(localStorage.datapros);}
    else{
     datapros=[]}
  
     showdata();
    create.onclick = function () {
        
        if (title.value === '' || price.value === '' || category.value === '') {
            alert('Please fill in all required fields!');
            return;
        }
        let newpro = {
            title: title.value.toLowerCase(),
            price: price.value,
            taxe: taxe.value,
            ads: ads.value,
            discount: discount.value,
            total: total.innerHTML,
            count: count.value,
            category: category.value.toLowerCase(),
        }; 
        if(mood === "create"){
        for(let j=0;j<count.value;j++){
        datapros.push(newpro);}}
        else{
            datapros[ex]=newpro;
            mood="create";
            create.innerHTML="create";
            count.style.display="block";
        }

        localStorage.setItem('datapros', JSON.stringify(datapros));
        cleardata();
        showdata();
    };
    
 for(let j=0;j<count.value;j++){showdata();}
function gettotal(){
     if(price.value !=''){
         let res=(+price.value+ +taxe.value+ +ads.value)-discount.value;
         total.innerHTML=res;
         total.style.backgroundColor='#956f49';
     }
     else{
         total.innerHTML=' ';
     }
 }
 function cleardata(){
    title.value = '';
    price.value = '';
    taxe.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    total.style.backgroundColor = '';
    count.value = '';
    category.value = '';
 }
 function showdata(){
    let table='';
    let start = (currentPage - 1) * rowsPerPage;
    let end = start + rowsPerPage;
    let paginatedData = datapros.slice(start, end);
    
    for(let i=0;i<paginatedData.length;i++){
        table += `
         <tr>
          <td>${start+i+1}</td>
          <td>${datapros[i].title}</td>
          <td>${datapros[i].price}</td>
          <td>${datapros[i].taxe}</td>
          <td>${datapros[i].ads}</td>
          <td>${datapros[i].discount}</td>
          <td>${datapros[i].total}</td>
          <td>${datapros[i].category}</td>
          <td><button onclick="updatedata(${i+start})" id="update">Update</button></td>
          <td><button  onclick="deletepro( ${i+start} )" id="delete">Delete</button></td>
        </tr>
        `;
 }
 document.getElementById('tbody').innerHTML=table;
 if(datapros.length > 0){
 delete_all.innerHTML= `<button onclick="clearstorage()" style="font-size:17px" >Delete All(${datapros.length})</button>`
 
}
else{delete_all.innerHTML='';

}
generatePagination();
 }
 function deletepro(i){
   datapros.splice(i, 1);
   localStorage.datapros=JSON.stringify(datapros);
   showdata();
 }
 function clearstorage(){
    localStorage.clear();
    datapros.splice(0);
    showdata();
 }
 function goToPage(page) {
    currentPage = page;
    showdata();
}
function generatePagination() {
    let pagination = '';
    let totalPages = Math.ceil(datapros.length / rowsPerPage); // عدد الصفحات

    for (let i = 1; i <= totalPages; i++) {
        pagination += `<button onclick="goToPage(${i})" class="page-btn">${i}</button>`;
    }

    document.getElementById('pagination').innerHTML = pagination;
}
 function updatedata(i){
   title.value=datapros[i].title;
   price.value=datapros[i].price;
   taxe.value=datapros[i].taxe;
   ads.value=datapros[i].ads;
   discount.value=datapros[i].discount;
   gettotal();
   count.style.display="none";
   category.value=datapros[i].category;
   create.innerHTML="Update";
   mood="update";
   ex=i;
   window.scrollTo(0,0);
 }
  function mode(){
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
      btnmode.innerHTML = '<i class="bi bi-brightness-high"></i>'; 
      localStorage.setItem("theme", "dark");
    } else {
      btnmode.innerHTML = '<i class="bi bi-moon-stars-fill"></i>'; 
      localStorage.setItem("theme", "light");
    
}}
document.addEventListener("DOMContentLoaded", function () {
    let theme = localStorage.getItem("theme");
    if(theme =="dark"){
       document.body.classList.add("dark");
  btnmode.innerHTML = '<i class="bi bi-brightness-high"></i>';
    }
});
//   }
 function getsearchmood(id){
    if(id=="title_s"){
        searchmood="title";
    }
    else{
        searchmood="category";
    }
    search.placeholder="search by "+searchmood;
    search.focus();
    search.value='';
    showdata();

 }
 function searchdata(value){ 
    let table='';  
for(let i=0;i<datapros.length;i++){
    if(searchmood=="title"){
   
  if(  datapros[i].title.toLowerCase().includes(value)){
    table += `
    <tr>
     <td>${start+i+1}</td>
     <td>${datapros[i].title}</td>
     <td>${datapros[i].price}</td>
     <td>${datapros[i].taxe}</td>
     <td>${datapros[i].ads}</td>
     <td>${datapros[i].discount}</td>
     <td>${datapros[i].total}</td>
     <td>${datapros[i].category}</td>
     <td><button onclick="updatedata(${i+start})" id="update">Update</button></td>
     <td><button  onclick="deletepro( ${i+start} )" id="delete">Delete</button></td>
   </tr>
   `;
}}




else{
    if(datapros[i].category.toLowerCase().includes(value)){
    table += `
    <tr>
     <td>${start+i+1}</td>
     <td>${datapros[i].title}</td>
     <td>${datapros[i].price}</td>
     <td>${datapros[i].taxe}</td>
     <td>${datapros[i].ads}</td>
     <td>${datapros[i].discount}</td>
     <td>${datapros[i].total}</td>
     <td>${datapros[i].category}</td>
     <td><button onclick="updatedata(${i+start})" id="update">Update</button></td>
     <td><button  onclick="deletepro( ${i+start} )" id="delete">Delete</button></td>
   </tr>
   `;
}}
document.getElementById('tbody').innerHTML=table;
}


}



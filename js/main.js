var productName = document.getElementById('pName');
var price = document.getElementById('Price');
var Taxes = document.getElementById('Taxes');
var ADS = document.getElementById('ADS');
var discount = document.getElementById('discount');
var pCategory = document.getElementById('pCategory');
var count = document.getElementById('count');
var submit = document.getElementById('submit');
var total = document.getElementById('total');
var SiteURL = document.getElementById('SiteURL');
var count1 = document.getElementById('count1');
var mood = 'Add Product';
var temp;

// get total price 
function getTotal(){
    if(price.value != ''){
      var result = (+price.value + +Taxes.value + +ADS.value)
      - +discount.value;
      total.innerHTML = result;
      total.style.background = '#0aa70a';
    }else{
      total.innerHTML = ' ';
      total.style.background = '#c30808';
    }
}


// create product
var allproduct;
if(localStorage.product != null){
  allproduct = JSON.parse(localStorage.product)
}else{
  allproduct = [];
}

submit.onclick = function(){
   var product ={
      productName:productName.value,
      price: price.value,
      Taxes: Taxes.value,
      ADS:ADS.value,
      discount:discount.value,
      pCategory:pCategory.value,
      count:count.value,
      total:total.innerHTML,
      SiteURL:SiteURL.value
   }
   if(mood ==='Add Product'){
    if(product.count > 1){
      for(var i =0;i<product.count;i++){
        allproduct.push(product);
      }
     }else{
      allproduct.push(product);
    }
   }else{
          allproduct[temp] = product;
          mood ='Add Product';
          submit.innerHTML = 'Add Product';
          count.style.display = 'block';
          count1.style.display = 'block';
   }
 
   // save local storage
   localStorage.setItem('product', JSON.stringify(allproduct))

   cleardata()
   showdata()
  
}
showdata()

// clear inputs

function cleardata(){
    productName.value = '';
    price.value = '';
    Taxes.value = '';
    ADS.value = '';
    discount.value = '';
    pCategory.value = '';
    count.value = '';
    total.innerHTML = '';
    SiteURL.value = '';
}

//read

function showdata(){
    var tabel = '';

    for(var i =0; i < allproduct.length ; i++){
      tabel += `
      <tr>
        <td>${allproduct[i].productName}</td>
        <td>${allproduct[i].price}</td>
        <td>${allproduct[i].Taxes}</td>
        <td>${allproduct[i].ADS}</td>
        <td>${allproduct[i].discount}</td>
        <td>${allproduct[i].total}</td>
        <td>${allproduct[i].pCategory}</td>
        <td><button class="btn btn-success">visit</button></td>
        <td><button onclick="updatedata(${i})" class="btn btn-warning">update</button></td>
        <td><button onclick="deletdata(${i})" class="btn btn-danger">Delete</button></td>
      </tr>
        
        `
    }

    document.getElementById('tbody').innerHTML = tabel
}


//deletdata

function deletdata(i){
    allproduct.splice(i,1);
    localStorage.product = JSON.stringify(allproduct);
    showdata()
}

//update

function updatedata(i){
    productName.value = allproduct[i].productName
    price.value = allproduct[i].price,
    Taxes.value = allproduct[i].Taxes,
    ADS.value = allproduct[i].ADS,
    discount.value = allproduct[i].discount,
    pCategory.value = allproduct[i].pCategory,
    SiteURL.value = allproduct[i].SiteURL,
    count.style.display = 'none',
    count1.style.display = 'none'
    getTotal();
   submit.innerHTML = 'update';
   mood = 'update';
   temp = i;
   scroll(
    {
      top:0,
      behavior:'smooth'
    }
   )
}



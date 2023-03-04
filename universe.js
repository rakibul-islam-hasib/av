const allData = async (limit, sortByDate) => {
  showSpinner(true)
  const url = `https://openapi.programming-hero.com/api/ai/tools`;
  const res = await fetch(url);
  const data = await res.json();
  if (sortByDate) {
      data.data.tools.sort((a, b) => new Date(a.published_in) - new Date(b.published_in));
  }

  if (limit) {
      getData(data.data.tools.slice(0, 6));
  }
  else{
      getData(data.data.tools );

  }
}


const getData=(datalimit)=>{
 const card_container = document.getElementById("card_container")
 document.getElementById("card_container").innerHTML = ""
 


/*  const showMoreBtn = document.getElementById("showMore");
    if( datalimit && datalimit.length > 6){
     datalimit = datalimit.slice(0,6);
       showMoreBtn.classList.remove("d-none")
    }
    else{
       showMoreBtn.classList.add("d-none")
    } */
 console.log(datalimit);
   datalimit.forEach(data => { 
    const {image,name,published_in,id} = data

    const myDiv = document.createElement("div")
    myDiv.classList.add("col")  
    const features = data.features;
    const featureList = features.map(feature => `<li>${feature}</li>`).join('');
    
     myDiv.innerHTML = `
     <div class="card h-100 Small shadow">
     <img src="${image}" class="card-img-top" alt="...">
     <div class="card-body">
       <h5 class="card-title">Featurse</h5>
       <ol>
        ${featureList}
      </ol>
       <hr>
       <h5 class="card-title">${name}</h5>
       <div class="d-flex justify-content-between align-items-center">
        <p><span><i class="fa-solid fa-calendar-days "></i></span> ${published_in}</p>
        
       <i onclick="fetchSingleData('${id}')" class="fa-solid fa-arrow-right p-2 rounded-circle fs-6 bg-danger text-light text-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop"></i>
       </div>
     </div>  
    </div>    
    `    
  card_container.appendChild(myDiv)
 
  showSpinner(false)

})  
}


//***********************show  more btn ********************
let showAll ; 
const showAllTogether =()=>{
showAll = 1 ; 
  procesSearch()
  showSpinner(true)
}



//*************************spnineer***************************
function showSpinner(isSpiner){
  const spinner = document.getElementById("spinner");
  if(isSpiner){
    spinner.classList.remove("d-none")
  } else{
    spinner.classList.add("d-none")
  }
}


//************************** all data show **************************8
function procesSearch(datalimit){
  allData(datalimit)
  showSpinner(true)
}




//************************fecth single data **********************
const fetchSingleData =(id)=>{
  const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
  fetch(url)
  .then(response=>response.json())
  .then(data=>{
    showSingleData(data.data);
  })
  
}




//****************************show single data *********************
function showSingleData(info){
   console.log(info.pricing);


 const modalBody = document.getElementById("modalBody")

 const Somequistion =info.input_output_examples;
 let quistion = ""
 if(Somequistion !== null){
   quistion +=`${Somequistion[0].input}</br></br> ${Somequistion[0].output}`
 }else{
  quistion +=`
    <h5>can you give any example</h5>
    <h6>No No yet Take a break</h6>
  `
 }
 

//****************************feature************************/


  const featurees = info.features
   let featureesHtml = "";
  for (const key in featurees) {
    featureesHtml+=`<li>${featurees[key].feature_name}</li>`;
    
  }
 


  // **********************intreagatoin******************
  const integrations = info.integrations;
  let integrationsList = ""
    if(integrations!==null){
    integrations.map(li=>{
    integrationsList +=(`<li>${li}</li>`)
    })
  
  }else{
    integrationsList ="no data found"
  }



  //*******************************modal************************
   modalBody.innerHTML = `
   <div class="border p-2">
   <h4>${info.description}</h4>

   <div class="row gap-0 p-2 ">
   <div class="col-4 shadow   p-3 text-danger font-bold">
    ${info.pricing? info.pricing[0].price:"free off  cost/"}</br>
    ${info.pricing? info.pricing[0].plan:" basic"}
   </div>
   <div class="col-4 shadow   p-3 text-praimary font-bold">
   ${info.pricing? info.pricing[1].price:"free off  cost/"}</br>
   ${info.pricing? info.pricing[1].plan:"pro"}
   </div>
   <div class="col-4 shadow   p-2 text-danger font-bold">
   ${info.pricing? info.pricing[2].price:"free off  cost/"}</br>
   ${info.pricing? info.pricing[2].plan:" Intership"}
   </div>
    
   </div>


   <div class="d-flex gap-3 pt-3">
     <div>
     <h4 class="font-bold">Features</h4>
     <ul>
     ${info.features?featureesHtml:"no data found"}
     </ul>
     </div>
     <div>
     <h4 class="font-bold">integration</h4>
     <ul>
     ${integrationsList}
     </ul>
     </div>
   </div>
 </div>
 <div class="border p-2" >
   <div class="p-2">
   <img src="${info.image_link[0]}" alt=""class="img-fluid position-relative">
   <div id="accouricy" class="d-block rounded p-2 text-light fs-5 bg-danger position-absolute top-0 end-0">${info.accuracy.score*100+"% accouricy"}
   </div>
    <div>
    <h5>${quistion}</h5>
  </div>
 
  `

  //************************accpouricy*****************
  const accouricyy = document.getElementById("accouricy")
  const accouaricy = info.accuracy.score;
  if(accouaricy==null){
    accouricyy.classList.add("d-none")
  }

}

//************************short by date**********************

  document.getElementById('shortBtn').addEventListener('click' , function() { 
    if(showAll === 1){

      allData(false , true)
    }
    else{
      allData(true , true)
    }
  })

 allData(8)


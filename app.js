const fetchApi = ()=>{
  // loader start here using setTimeOut========================
  document.getElementById('loader').classList.remove('invisible')
  setTimeout(() => {
 
    document.getElementById('loader').classList.add('invisible')
  }, 1500);



  const URL = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(URL)
    .then(res =>res.json())
    .then(data =>{
      const dataSix = data.data.tools.slice(0,6)
    
   
      showData(dataSix)
    })
}
fetchApi()
// show initialy six  data in a object
const showData = (data)=>{
  const allAi = data
  
  document.getElementById('sort-by-date').addEventListener('click',function(){
    console.log(allAi);
    showSortByDate(allAi)
  })

  allAi.forEach(singleAi =>{ 
    
      const [f1,f2,f3] = singleAi.features
      const {name,image,published_in,id} = singleAi

    

      const allAI = document.getElementById('allAI')
      allAI.innerHTML +=`
    <div class="card w-full  shadow-xl">
      <figure><img src="${image}" alt="AI" /></figure>
      <div class="card-body ">
        <h2 class="card-title">
          Features
        </h2>
       <div>
        <ol>
          <li>${f1 ? '1.'+f1 : ''}</li>
          <li>${f2 ? '2.'+ f2 : ''}</li>
          <li>${f3 ? '3.'+ f3 : ''}</li>
        </ol>
       </div>
       <hr style="border:1px solid rgba(26, 1, 1, 0.411)">
        <div class="flex justify-between items-center">
         <div> 
          <h1 class="text-bold text-2xl my-3">${name}</h1>
          <span><i class="fa fa-calendar px-3" aria-hidden="true"></i>
          ${published_in?published_in:"Unknown"}</span>
          </div>
          
          <label for="my-modal-5" > <i onclick="showModalFetch('${id}')" class="fas  fa-arrow-right"></i></label>
        </div>
        
      </div>
    </div>
    `
  })
  // document.getElementById('loader').classList.add('invisible')
}

// show all button =================
const showAllAi = ()=>{
  const URL = `https://openapi.programming-hero.com/api/ai/tools`;
  fetch(URL)
    .then(res =>res.json())
    .then(data =>{
      const dataALL = data.data.tools
      
      document.getElementById('showAllBtn').style.display = 'none'
      document.getElementById('allAI').innerHTML = ''
     
      showData(dataALL)
    })
}

// show sort by date  
const showSortByDate = (data)=>{
  customeSort = (a,b)=>{
    const dateA = new Date(a.published_in)
    const dateB = new Date(b.published_in)

    if(dateA > dateB) return 1;
    else if(dateA < dateB) return -1
    return 0
  }
  const dateAfterSort = data.sort(customeSort)

  document.getElementById('allAI').innerHTML = ''
  showData(dateAfterSort)
  
}







const showModalFetch = (id)=>{
  
  URL = `https://openapi.programming-hero.com/api/ai/tool/${id}`
  fetch(URL)
   .then(res => res.json())
   .then(data =>{
      const allData = data.data
      showModalBody(allData )
   })
}

// show modal body
const showModalBody = (data)=>{

  //accuracy level 
const accuracy = data.accuracy.score ? data.accuracy.score:'';
if(accuracy===''){
  // document.getElementById('accuracy').classList.remove('btn-warning')
  console.log("runnn");
}





const {description} = data
const input = data.input_output_examples ? data.input_output_examples[0].input : ''
const output = data.input_output_examples ? data.input_output_examples[0].output : ''
const img = data.image_link[0]




 // plane and pricing variable
 const basicPlane =  data.pricing ? data.pricing[0].plan :''
 const basicPlanePrice =data.pricing ? data.pricing [0].price : ''

 // pro plane pricing variable
 const proPlane = data.pricing? data.pricing[1].plan:''
 const proPlanePrice = data.pricing?data.pricing[1].price:''

   // Enterprise plane pricing variable
    const enterpricePlane =  data.pricing?data.pricing[2].plan:''
    const enterpricePlanePrice =data.pricing?data.pricing[2].price:''

    //feature section
    const fr1 = data.features?data.features["1"].feature_name: ''
    const fr2 = data.features?data.features["2"].feature_name: ''
    const fr3 = data.features?data.features["3"].feature_name: ''

    console.log(data.features);

    //description section description
  const d1 = data.integrations?data.integrations[0]:''
  const d2 = data.integrations?data.integrations[1]:''
  const d3 = data.integrations?data.integrations[2]:''

  


  const modalBodyPart = document.getElementById('modal-all')
  modalBodyPart.innerHTML = `
<div class="modal-box w-11/12  max-w-5xl">

  <div class="flex justify-between gap-5 h-3/4 flex-col md:flex-row">
      <div class="border-2 rounded w-full md:w-1/2 border-red-200 md:p-5 md:m-5">
          <p class="text-bold text-black py-5">${description}</p>
          <div class="flex justify-center gap-5 md:gap-18 text-center items-center">
              <h1 class="text-green-600  p-2">${basicPlanePrice ? basicPlanePrice : ''} <br> ${basicPlane ? basicPlane : ''} </h1>
              <h1 class="text-blue-500" p-2">${proPlanePrice ? proPlanePrice: '' } <br> ${proPlane ? proPlane : ''}</h1>
              <h1 class="text-red-500  p-2">${enterpricePlanePrice ? enterpricePlanePrice : ''}  ${enterpricePlane ? enterpricePlane : ''} </h1>
             
          </div>
          <div class="flex justify-around gap-5">
              <div>
                  <h1 class="text-bold text-3xl">Features</h1>
                    <ul class="w-full">
                        <li>${fr1 ? '1.'+fr1:''}</li>
                        <li>${fr2 ? '2.'+fr2:''}</li>
                        <li>${fr3 ? '3.'+fr3:''}</li>
                       
                    </ul>
              </div>
              <div>
                <h1 class="text-bold text-3xl">Integrations</h1>
                  <ul>
                    <li>${d1?'1.'+d1:'No data found'}</li>
                    <li>${d2?'2.'+d2:''}</li>
                    <li>${d3?'3.'+d3:''}</li>
                    
                  </ul>
              </div>
          </div>
      </div>
      <div class="text-center border-2 border-red-200 p-5 m-5 w-full md:w-1/2 rounded">
          
          <div class="relative">
          <img class="w-full" src="${img}" alt="AI image">
          <button style="color: aquamarine;font-weight: 500;" id="accuracy" class="absolute top-2 right-2 p-2 rounded ">
          ${accuracy ? accuracy * 100+'% Accuracy' : '' }</button>
          </div>


          <h1 class="text-bold text-3xl ">${input ? input : ''}</h1>
          <p class="text-bold text-2xl">${output ? output : ''}</p>
      </div>
  </div>
  <div class="modal-action">
    
      <label for="my-modal-5" class="badge badge-info gap-2">
          <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 24 24" class="inline-block w-4 h-4 stroke-current "><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </label> 
  </div>
</div>
  `

}


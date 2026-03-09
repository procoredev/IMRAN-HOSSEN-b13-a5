// loading related
const showSpinner =(status)=>{
  const spinnerDiv = document.getElementById("spinner-div")
  const allCardDiv = document.getElementById("all-card")
  if(status===true){
    spinnerDiv.classList.remove("hidden")
    allCardDiv.classList.add("hidden")
  }else{
    spinnerDiv.classList.add("hidden")
    allCardDiv.classList.remove("hidden")
  }
}


const allcards = () => {
   showSpinner(true)//lodding
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => cardsection(data.data))

}

// button open
const fetchOpenCards = ()=>{
  showSpinner(true)//lodding
   fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) =>{
      const openIssues = data.data.filter(singleData => singleData.status==="open");
      cardsection(openIssues)
    })

}

// close button
const fetchCloseCards =()=>{
 showSpinner(true)
   fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) =>{
      const closeIssues = data.data.filter(singleData => singleData.status==="closed");
      cardsection(closeIssues)
    })

}
// modals
const fetchSingleIssue = (id)=>{
  fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
    .then((res) => res.json())
    .then((data) =>{
     showModal(data.data) 
    })
  
}
//  id: 1,
//   title: "Fix navigation menu on mobile devices",
//   description:
//     "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
//   status: "open",
//   priority: "high",
//   labels: [
//     "bug",
//     "help wanted"
//   ],
//   author: "john_doe",
//   assignee: "jane_smith",
//   createdAt: "2024-01-15T10:30:00Z",
//   updatedAt: "2024-01-15T10:30:00Z"
const showModal = (issue)=>{
  my_modal_1.showModal()//modal
  const modalcontent =  document.getElementById("modal-content");
  const addDiv = document.createElement("div");
     modalcontent.innerHTML = `
     
    <div>

               
                <h2 class="text-xl font-bold mb-2">
                   ${issue.title}
                </h2>

              
                <div class="flex items-center gap-2 text-sm mb-4">
                   <span class="text-white px-3 py-1 rounded-full text-xs 
                         ${issue.status === "open" ? "bg-green-500" : "bg-gray-500"}">
                        ${issue.status}
                        </span>
                    <span class="text-gray-500 lg:text-[15px] text-[12px]">. Opened by ${issue.author} .</span>
                    <span class="text-gray-500">${new Date(issue.createdAt).toLocaleDateString()}</span>
                </div>


                
          <div class="flex gap-2 mb-4">
                     ${ issue.labels.includes("bug")? `<span class="badge badge-error badge-outline">
                      <i class="fa-solid fa-bug"></i> BUG
             </span>`
          : ""
      }

      ${
        issue.labels.includes("help wanted")
          ? `<span class="badge badge-warning badge-outline">
               <i class="fa-regular fa-life-ring"></i> HELP WANTED
             </span>`
          : ""
      }
      ${
        issue.labels.includes("good first issue")
          ? `<span class="badge badge-warning badge-outline uppercase lg:text-[13px] text-[10px]">
               <i class="fa-regular fa-life-ring"></i>good first issue
             </span>`
          : ""
      }
      ${
        issue.labels.includes("enhancement")
          ? `<span class="badge badge-warning badge-outline uppercase text-[13px]">
               <i class="fa-regular fa-star"></i>enhancement
             </span>`
          : ""
      }
      ${
        issue.labels.includes("documentation")
          ? `<span class="badge badge-warning badge-outline uppercase text-[13px]">
               <i class="fa-regular fa-star"></i>documentation
             </span>`
          : ""
      }
       </div>

             
                <p class="text-gray-600 mb-6">${issue.description}
                   
                </p>

                
                <div class="bg-gray-100 rounded-lg p-4 flex justify-between">
                    <div>
                        <p class="text-gray-500 text-sm">Assignee:</p>
                        <p class="font-semibold">${issue.author}</p>
                    </div>

                    <div>
                        <p class="text-gray-500 text-sm">Priority:</p>
                        <span class="badge rounded-full  ${issue.priority==='high'? "bg-[#feecec] text-red-500" : issue.priority==='low'? "bg-[#9CA3AF] text-slate-200" : "bg-[#fff6d1] text-amber-500"}">  ${issue.priority.toUpperCase()}</span>
                    </div>
                </div>
                  <div class="modal-action">
                <form method="dialog">
                    <!-- if there is a button in form, it will close the modal -->
                    <button class="btn btn-primary">Close</button>
                </form>
            </div>
     
     
     `;
    modalcontent.append(addDiv)  ;
}
// all card section
const cardsection = (card) => {
  showSpinner(false)
document.getElementById("issus-count").innerText = card.length;
  const allcard = document.getElementById("all-card");

  allcard.innerHTML = "";

  card.forEach(car => {

    const divadd = document.createElement("div");
//....................................
// "id": 1,
//       "title": "Fix navigation menu on mobile devices",
//       "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
//       "status": "open",
//       "labels": [
//         "bug",
//         "help wanted"
//       ],
//       "priority": "high",
//       "author": "john_doe",
//       "assignee": "jane_smith",
//       "createdAt": "2024-01-15T10:30:00Z",
//       "updatedAt": "2024-01-15T10:30:00Z"
///........................
    divadd.innerHTML = `

<div onclick="fetchSingleIssue(${car.id})" class="card h-full bg-base-100 shadow border-t-4 ${car.status==="open"? "border-green-500": "border-violet-500"} ">

  <div class="card-body p-4">

    <div class="flex justify-between items-center">

        <img src="${
        car.priority === 'high' || car.priority === 'medium'
        ? './assets/Open-Status.png'
        : './assets/Close.png'
        }" alt="">
 

      <span class="badge uppercase rounded-full ${car.priority==='high'? "bg-[#feecec] text-red-500" : car.priority==='low'? "bg-[#9CA3AF] text-slate-200" : "bg-[#fff6d1] text-amber-500"}  ">
        ${car.priority}
      </span>

    </div>


    <h3 class="font-semibold text-[16px] mt-2">
      ${car.title}
    </h3>


    <p class="text-xs text-gray-500">
      ${car.description}
    </p>


    <div class="flex gap-2 mt-2">

      ${
        car.labels.includes("bug")
          ? `<span class="badge badge-error badge-outline text-[12px]">
               <i class="fa-solid fa-bug"></i> BUG
             </span>`
          : ""
      }

      ${
        car.labels.includes("help wanted")
          ? `<span class="badge badge-warning badge-outline text-[12px]">
               <i class="fa-regular fa-life-ring"></i> HELP WANTED
             </span>`
          : ""
      }
      ${
        car.labels.includes("good first issue")
          ? `<span class="badge badge-warning badge-outline uppercase text-[12px]">
               <i class="fa-regular fa-life-ring"></i>good first issue
             </span>`
          : ""
      }
      ${
        car.labels.includes("enhancement")
          ? `<span class="badge badge-warning badge-outline uppercase text-[12px]">
               <i class="fa-regular fa-star"></i>enhancement
             </span>`
          : ""
      }
      ${
        car.labels.includes("documentation")
          ? `<span class="badge badge-warning badge-outline uppercase text-[12px]">
               <i class="fa-regular fa-star"></i>documentation
             </span>`
          : ""
      }

    </div>
 
     
    <div class="text-xs text-gray-400 mt-3  border-t border-gray-200 mt-3 pt-3  ">

      <p>#${car.id} by ${car.author}</p>

      <p>${new Date(car.createdAt).toLocaleDateString()}</p>

    </div>

  </div>

</div>

    `;

    allcard.appendChild(divadd);

  });

};

allcards();




// button search
document.getElementById("input-scarich").addEventListener("keydown",()=>{
              
  // console.log('addd');
              
  const inputscarich = document.getElementById("input-scarich");
           const searchValue = inputscarich.value.trim().toLowerCase();
          //  console.log(searchValue);
          
         fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`)
        .then((res) => res.json())
        .then((data) => {
              const searchResult = data.data;
              // console.log(allWords);
             
              // console.log(filterwords);
               cardsection(searchResult);  
        }); 
});


 
//  all button and card
const allbtn = document.getElementById("all-button");
const openbtn = document.getElementById("open-button");
const closebtn = document.getElementById("close-button");


// all filter btn toggle
function showFilterIssueBtn(id) {

    allbtn.classList.remove("bg-[#422ad5]", "text-white");
    openbtn.classList.remove("bg-[#422ad5]", "text-white");
    closebtn.classList.remove("bg-[#422ad5]", "text-white");

    let btn = document.getElementById(id);
    btn.classList.add("bg-[#422ad5]", "text-white");

}












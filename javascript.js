let unassignedEmployees = [];
let expirience = [];
// let rom1 = [];
// let assgnedEmployees=[];

const form = document.getElementById("form");
const inputbutton = document.getElementById("input-button");
const btnAddWorkerBtn = document.getElementById("btnaddworkerBtn");
const sidebar = document.getElementById("sidebar");
const nomprenom = document.getElementById("input-Nom-Prenom");
const email = document.getElementById("input-Email");
const role = document.getElementById("input-Role");
const telephone = document.getElementById("input-telephone");
const url= document.getElementById("input-url");
const formParente = document.getElementById("formulaire")
const plusierexperience = document.getElementById("plusier-experience");
const noneform = document.getElementById("none-form")
const select = document.getElementById("loc");
const inputlabelbtn =  document.getElementById("input-label-btn")
const companyInputt = document.getElementById("companyInput");
const modalromm = document.getElementById("modal-romm");
const closModal = document.getElementById("closModal");
btnAddWorkerBtn.addEventListener("click", () => {
    formParente.style.display = "block";
    modalromm.style.display="none";

});


function plusierexper() {
    const btnexperiencee = document.querySelector(".btn-experience");
    
    btnexperiencee.addEventListener("click",()=>{
        plusierexperience.style.display="block";
    })
}
plusierexper()
function experionce() {
    // const plusierexperience = document.getElementById("plusier-experience");
    plusierexperience.innerHTML+=`
    <label for="company">Company :</label>
                        <input type="text" id="companyInput" name="companyy" placeholder="Company"><br>
                        <label for="experience-start-date">Start :</label>
                        <input type="date" id="experience-start-date" name="experience-start-date"><br>
                        <label for="experience-end-date">End :</label><br>
                        <input type="date" id="experience-end-date" name="experience-end-date"><br>

    `
    const companyInput = plusierexperience.querySelector(".company");
    
    const startDateInput = plusierexperience.querySelector(".start-date");
    const endDateInput = plusierexperience.querySelector(".end-date");

    inputlabelbtn.addEventListener("click", () => {
        const companyvalue = companyInput.value.trim();
        console.log(companyvalue);
        
        const datevaluestar = startDateInput.value.trim();
        const enddatevalue = endDateInput.value.trim();

        const regixcompany = /^[A-Za-z0-9]+$/;
        const regixdate = /^\d{4}-\d{2}-\d{2}$/;

        if (!regixdate.test(datevaluestar)) {
            alert("date start incorrect!!!");
            return;
        }
        if (!regixdate.test(enddatevalue)) {
            alert("date end incorrect!!!");
            return;
        }
        if (!regixcompany.test(companyvalue)) {
            alert("company incorrect");
            return;
        }

        expirience.push({
            companyvalue,
            datevaluestar,
            enddatevalue
        });
        console.log(expirience);
        
    });
return expirience
}

    

function affchesidbar() {
    sidebar.classList.toggle("active");
}

let objId = JSON.parse(localStorage.getItem('objId')) || 0;

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nomregix = /^[^\d]+$/;
    const emailregix = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const roleregix = /^[^\d]+$/;
    const telregix = /^\+?\d{8,15}$/; 
    const regixurl = /https?:\/\/\S+/g;


    // const regixselect = /pattern/;
    const selectrolvalue = select.value.trim();
    const nomPrenomvalue = nomprenom.value.trim();
    const emailvalue = email.value.trim();
    const telephonevalue = telephone.value.trim();
    const urlvalue  = url.value.trim();

    if (!nomregix.test(nomPrenomvalue)) {
        alert("Nom et prénom incorrect(s)");
        return;
    }
    if (!emailregix.test(emailvalue)) {
        alert("Email incorrect");
        return;
    }
    if (telephonevalue && !telregix.test(telephonevalue)) {
        alert("Téléphone incorrect");
        return;
    }

    if (!regixurl.test(urlvalue)) {
        alert("url est incorrect");
    }
    if (!roleregix.test(selectrolvalue)) {
        alert("non select!!");
        return;
    }

    const experience =experionce() ;
    unassignedEmployees.push({
        isWorkr:false,
        id: objId,
        nomPrenomvalue,
        emailvalue,
        selectrolvalue,
        telephonevalue,
        urlvalue,
        experience
    });
    objId++
    ;
    console.log(unassignedEmployees);



    localStorage.setItem('objId', JSON.stringify(objId));
    form.reset();
    renderSidebar();

});

 
  
    noneform.addEventListener("click",()=>{
        formParente.style.display="none";
    });



function renderSidebar(){

   const sidebar = document.getElementById("sidebar");
    document.querySelectorAll(".card").forEach(ev=>ev.remove());
    console.log(unassignedEmployees)
    unassignedEmployees.forEach((card)=>{
        console.log(card);
        
        if (card.isWorkr!=true) {
            console.log(22222221);
            
                const carde = document.createElement("div");
                carde.classList.add("card");
                carde.setAttribute("id",card.id);
                carde.innerHTML=`
                    <div>
                    <img src="${card.urlvalue}" alt="photo">
                    </div>
                    <h2>${card.nomPrenomvalue}</h2>
                    <p>${card.selectrolvalue}</p>
                    
                    <button class="btn-modal" onclick="modal(${card.id})">Details</button>
            `
            sidebar.appendChild(carde);
            }
    }
)
}

// function deleteCarde(id){
//     unassignedEmployees.forEach((person)=>{
//         console.log(person);
//         console.log(person.id);
//         if (person.id===id) {
//             console.log('inside th if');
//             console.log(unassignedEmployees);
            
//         unassignedEmployees= unassignedEmployees.splice(person.id,1);
//         }
//     });
//      renderSidebar();

// }


const btnmodal = document.getElementById("btn-modal");
const divModal = document.createElement("div");
divModal.classList.add("divModal");
document.body.append(divModal);
    
function modal(id){
    unassignedEmployees.forEach((card)=>{  
        if (card.id === Number(id)){
    divModal.innerHTML=`
            <p onclick="closmodal()" class="clos">X</p>
            <h2>Nom-Prenom : ${card.nomPrenomvalue}</h2>            
            <p>Email : ${card.emailvalue}</p>
            <p>Telephone : ${card.telephonevalue}</p>
            <p>ROle : ${card.selectrolvalue}</p>

            
    `
}
    divModal.style.display="block";

})

}
function closmodal() {
    console.log("enter");
    divModal.style.display="none";
}

function imgurl() {
    const inputurl = document.getElementById("input-url");
            url.addEventListener("input",()=>{
                console.log(10);
                 document.getElementById("img-url").src=inputurl.value;
            })
    
}
imgurl()


//closeat=>ax kadir =>katmxi l awal parent 3ndo dak l class li 3titiha const div = btn.closest(".grandparent");
//!!!!!!!! had function ax katgol =>dawr dyalha ana kataaficher les persone li katwaf9o conditon dyal anaho select tsawi smya dyal room ila swat xi smya kat aaficher f modal mn ba3d mnin ankliki 3lih radi itmsah mn card au kan filrih mn array + 
 let movedEmployeesModal = [];
    function afficherModel() {
        const toutBtn = document.querySelectorAll(".button");
        closModal.addEventListener("click",()=>{
                modalromm.style.display="none";
                document.querySelectorAll(".card-modal-rom").forEach(ev=>ev.remove());
                })
        toutBtn.forEach((btn)=>{
            btn.addEventListener("click",()=>{
                


                const divParent = btn.closest("div");
                const NomDeSalle =  divParent.children[0].textContent;
                
                let assgnedEmployees =  unassignedEmployees.filter((persone=> persone.selectrolvalue===NomDeSalle));

                console.log(assgnedEmployees);
                
                if(assgnedEmployees.length!=0){
                    const modalromm = document.getElementById("modal-romm")
                    console.log("dkhl")

                    
                assgnedEmployees.forEach((Workr)=>{
                    if(!Workr.isWorkr){
                        const card = document.createElement("div");
                        card.id=Workr.id;
                        card.className="card-modal-rom";
                        card.innerHTML=`
                        <img src="${Workr.urlvalue}" alt="photo">
                        <h2>${Workr.nomPrenomvalue}</h2>
                        <p>${Workr.selectrolvalue}</p>
                        `;
                        modalromm.append(card);
                   
                    card.addEventListener("click",()=>{
                        Workr.isWorkr=true;
                        card.remove();

                        movedEmployeesModal.push(Workr);
                        assgnedEmployees = assgnedEmployees.filter(cardes=>cardes!=Workr);

                        affichierroom(divParent);
                        renderSidebar();
                    });
                     }
                    
                })
                const modall = document.getElementById("modal-romm");
                modall.style.display="block";
                }
                else{
                    
                    alert("aucune worker!!");
                }
                
            })
        })
    }
    afficherModel()
    function affichierroom(divParent) {
       cars = document.createElement("div");
       cars.className="cards-afficher-romm"
        movedEmployeesModal.forEach((work)=>{
            cars.innerHTML=`
                    <img src="${work.urlvalue}" alt="photo">
                    <h2>${work.nomPrenomvalue}</h2>
                    <p>${work.selectrolvalue}</p>
                    `;
                    divParent.append(cars);   
        })
    }

// let unassgnedEmployees = [
//     {
//         name: "efzef",

//     }
// ]


// let assgnedEmployees = {
//     room1: [
//         {
//             name: "efzef",

//         },
//         {
//             name: "efzef",

//         }
//     ],

// }

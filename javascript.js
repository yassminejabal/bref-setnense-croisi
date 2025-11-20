let unassignedEmployees = [];
const form = document.getElementById("form");
const inputbutton = document.getElementById("input-button");
const btnAddWorkerBtn = document.getElementById("btnaddworkerBtn");
const sidebar = document.getElementById("sidebar");
const nomprenom = document.getElementById("input-Nom-Prenom");
const email = document.getElementById("input-Email");
const role = document.getElementById("input-Role");
const telephone = document.getElementById("input-telephone");
const experiences = document.getElementById("input-Expériences");
const localisation = document.getElementById("loc");
const url= document.getElementById("input-url");


    const formParente = document.getElementById("formulaire")

btnAddWorkerBtn.addEventListener("click", () => {
    formParente.style.display = "block";
});
    const plusierexperience = document.getElementById("plusier-experience");

function plusierexper() {
    const btnexperiencee = document.querySelector(".btn-experience");
    console.log(btnexperiencee);
    
    btnexperiencee.addEventListener("click",()=>{
        plusierexperience.style.display="block";
    })
}
plusierexper()
function experionce() {
    // const plusierexperience = document.getElementById("plusier-experience");
    plusierexperience.innerHTML+=`
    <label for="company">Company :</label>
                        <input type="text" id="company" name="company" placeholder="Company"><br>
                        <label for="experience-start-date">Start :</label>
                        <input type="date" id="experience-start-date" name="experience-start-date"><br>
                        <label for="experience-end-date">End :</label><br>
                        <input type="date" id="experience-end-date" name="experience-end-date"><br>

    `
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


    const nomPrenomvalue = nomprenom.value.trim();
    const emailvalue = email.value.trim();
    // const rolevalue = role.value.trim();
    const telephonevalue = telephone.value.trim();
    // const experiencesvalue = experiences.value.trim();
    const localisationvalue = localisation.value.trim();

    if (!nomregix.test(nomPrenomvalue)) {
        alert("Nom et prénom incorrect(s)");
        return;
    }
    if (!emailregix.test(emailvalue)) {
        alert("Email incorrect");
        return;
    }
    // if (!roleregix.test(rolevalue)) {
    //     alert("Role incorrect");
    //     return;
    // }
    if (telephonevalue && !telregix.test(telephonevalue)) {
        alert("Téléphone incorrect");
        return;
    }
    if (!regixurl.test(url.value)) {
        alert("url est incorrect");
    }
    // if (!experiencesvalue) {
    //     alert("Veuillez indiquer les expériences");
    //     return;
    // }

    unassignedEmployees.push({
        id: objId,
        nomPrenomvalue,
        emailvalue,
        // rolevalue,
        telephonevalue,
        // experiencesvalue,
        localisationvalue
    });
    objId++;

    localStorage.setItem('objId', JSON.stringify(objId));
    form.reset();
    renderSidebar();

});

 
    const noneform = document.getElementById("none-form")
    noneform.addEventListener("click",()=>{
        formParente.style.display="none";
    });
 
 


function renderSidebar(){
   const sidebar = document.getElementById("sidebar");
    document.querySelectorAll(".card").forEach(ev=>ev.remove());
    
    unassignedEmployees.forEach((card)=>{
        const carde = document.createElement("div");
        carde.classList.add("card");
        carde.setAttribute("id",card.id);
        carde.innerHTML=`
        <div>
            <img onclick="deleteCarde(${card.id})" class="img-delete" src="/img/delete.png" alt="phtos"></img>
            </div>
            <div>
            <img src="https://avatar.iran.liara.run/public/99" alt="photo">
            </div>
            <h2>${card.nomPrenomvalue}</h2>
            <p>${card.rolevalue}</p>
            <button class="btn-modal" onclick="modal(${card.id})">Details</button>
    `
    
    
    sidebar.appendChild(carde);
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
            <img src="https://avatar.iran.liara.run/public/99" alt="photo">
            <h2>Nom-Prenom : ${card.nomPrenomvalue}</h2>            
            <p>Email : ${card.emailvalue}</p>
            <p>Role : ${card.rolevalue}</p>
            <p>Telephone : ${card.telephonevalue}</p>
            <p onclick="closmodal()" class="clos">X</p>
    `
}
    divModal.style.display="block";

})

}
function closmodal() {
    console.log("enter");
    divModal.style.display="none";
}



            function urll() {
                const inputurl = document.getElementById("input-url");
                const imgurl = document.getElementById("img-url");
                inputurl.addEventListener("input",()=>{
                    
                    imgurl.src=inputurl.value;

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


            //                 <h3>le${card.experiencesvalue}</h3>
            // <ul>
            //     <li>${card.localisationvalue}</li>
            // </ul>
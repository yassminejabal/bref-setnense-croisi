let unassignedEmployees = [];
const form = document.getElementById("form");
const inputbutton = document.getElementById("input-button");
const btnAddWorkerBtn = document.getElementById("btnaddworkerBtn");
const sidebar = document.getElementById("sidebar");
form.style.display = "none";
const nomprenom = document.getElementById("input-Nom-Prenom");
const email = document.getElementById("input-Email");
const role = document.getElementById("input-Role");
const telephone = document.getElementById("input-telephone");
const experiences = document.getElementById("input-Expériences");
const localisation = document.getElementById("loc");

btnAddWorkerBtn.addEventListener("click", () => {
    form.style.display = "block";
});
function affchesidbar() {
    sidebar.classList.toggle("active");
}
function modal() {
    const btnmodal = document.getElementById("btn-modal");
    btnmodal.addEventListener("click",()=>{
        divModal.classList.toggle("affichmodal");
    })
    
}
modal();

let objId = JSON.parse(localStorage.getItem('objId')) || 0;
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nomregix = /^[^\d]+$/;
    const emailregix = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const roleregix = /^[^\d]+$/;
    const telregix = /^\+?\d{8,15}$/; 

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
    form.style.display = "none";
    renderSidebar();

});
 function noneform() {
    const noneform = document.getElementById("none-form")
    const form = document.getElementById("formulaire")
    noneform.addEventListener("click",()=>{
        form.style.display="none";
    });
 }
 noneform()



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
            <ul>
                <li>${card.localisationvalue}</li>
            </ul>
            <button id="btn-modal" onclick="modal(${card.id})">click</button>
    `
    
    
    sidebar.appendChild(carde);
    }
)
}
function deleteCarde(id){
    console.log("enter");
    // if (unassignedEmployees.length>id) {
    //     unassignedEmployees.splice(id,1);
    //     renderSidebar();
    // }
    unassignedEmployees.forEach((person)=>{
        console.log(person);
        console.log(person.id);
        if (person.id===id) {
            console.log('inside th if');
            console.log(unassignedEmployees);
            
        unassignedEmployees= unassignedEmployees.splice(person.id,1);
        }
    });
     renderSidebar();

}

function modal(id){
    const divModal = document.createElement("div");
    divModal.classList.add("divModal");
    console.log(id);
    console.log(unassignedEmployees);
    unassignedEmployees.forEach((card)=>{  
        if (card.id === Number(id)){
    divModal.innerHTML=`
            <img src="https://avatar.iran.liara.run/public/99" alt="photo">
            <h2>Nom-Prenom : ${card.nomPrenomvalue}</h2>                    
            <p>Email : ${card.emailvalue}</p>
            <p>Role : ${card.rolevalue}</p>
            <p>Telephone : ${card.telephonevalue}</p>

    `
        }}
    )
    document.body.append(divModal);
                }
            //                 <h3>le${card.experiencesvalue}</h3>
            // <ul>
            //     <li>${card.localisationvalue}</li>
            // </ul>






// function renderSidebar() {
//     //     const nomPrenomvalue = nomprenom.value.trim();
//     // const emailvalue = email.value.trim();
//     // const rolevalue = role.value.trim();
//     // const telephonevalue = telephone.value.trim();
//     // const experiencesvalue = experiences.value.trim();
//     // const localisationvalue = localisation.value.trim();


//     unassignedEmployees.forEach((emp, index) => {
//         const card = document.createElement("div");
//         card.className = "card";
//         card.innerHTML = `
//             <div class="btns">
//                 <button class="removeBtn">X</button>
//             </div>
//             <img src="https://avatar.iran.liara.run/public" alt="Photo">
//             <h2>${emp.nomPrenomvalue}</h2>
//             <p><strong>Rôle:</strong> ${emp.rolevalue}</p>
//             <p><strong>Email:</strong> ${emp.emailvalue}</p>
//             <p><strong>Téléphone:</strong> ${emp.telephonevalue}</p>
//             <h3>Expériences :</h3>
//             <p>${emp.experiencesvalue}</p>
//             <p><strong>Localisation:</strong> ${emp.localisationvalue}</p>
//         `


// })
// }









    // const btnd = document.getElementById("btnb");
    
//     const nomPrenomvalue = nomprenom.value.trim();
//     const emailvalue = email.value.trim();
//     const rolevalue = role.value.trim();
//     const telephonevalue = telephone.value.trim();
//     const experiencesvalue = experiences.value.trim();
//     const localisationvalue = localisation.value.trim();
//     unassignedEmployees.forEach((card)=>
//                     card[index].innerHTML=`
//             <img src="https://avatar.iran.liara.run/public/99" alt="Photo">


//             <h2>${nomPrenomvalue}</h2>
//             <p>${emailvalue}</p>
//             <p>${rolevalue}</p>
//             <p>${telephonevalue}</p>
//             <h3>${experiencesvalue}</h3>
//             <ul>
//                 <li>${localisationvalue}</li>

//             </ul>`

// )





























    //     // remove button handler
    //     card.querySelector('.removeBtn').addEventListener('click', (ev) => {
    //         const idx = Number(ev.target.getAttribute('data-index'));
    //         unassignedEmployees.splice(idx, 1);
    //         renderSidebar();
    //     });

    //     sidebar.appendChild(card);
    // });








    // if (unassignedEmployees.length === 0) {
    //     sidebar.innerHTML += `<p>Aucun employé non affecté.</p>`;
    //     return;
    // }









// function modal(index){
//     
//     console.log(cardi);
//     unassignedEmployees.forEach((index)=>{
 
    
//     `
//     }
//     document.body.append(cardi);

//     }
          


//    cardi[index].innerHTML=`
            

//             <img src="https://avatar.iran.liara.run/public/99" alt="Photo">

//             <h2>${cardi[index].nomprenom}</h2>
//             <p>${cardi[index].emailvalue}</p>
//             <p>${cardi[index].rolevalue}</p>
//             <p>${cardi[index].telephonevalue}</p>
//             <h3>${cardi[index].experiencesvalue}</h3>
//             <ul>
//                 <li>${cardi[index].localisationvalue}</li>

//             </ul>






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
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
const url = document.getElementById("input-url");
const formParente = document.getElementById("formulaire")
const plusierexperience = document.getElementById("plusier-experience");
const noneform = document.getElementById("none-form")
const select = document.getElementById("loc");
const inputlabelbtn = document.getElementById("input-label-btn")
const companyInputt = document.getElementById("companyInput");
const modalromm = document.getElementById("modal-romm");
const closModal = document.getElementById("closModal");
btnAddWorkerBtn.addEventListener("click", () => {
    formParente.style.display = "block";
    modalromm.style.display = "none";

});


function plusierexper() {
    const btnexperiencee = document.querySelector(".btn-experience");

    btnexperiencee.addEventListener("click", () => {
        plusierexperience.style.display = "block";
    })
}
plusierexper()
document.querySelector(".btn-experience").addEventListener("click", () => {
    const bloc = document.createElement("div");
    bloc.className = "experience-bloc";
    bloc.innerHTML = `
        <label>Company:</label>
        <input type="text" class="company" placeholder="Company">

        <label>Start:</label>
        <input type="date" class="start-date">

        <label>End:</label>
        <input type="date" class="end-date">
        <hr>
        <button class="btn-remouve-experience">remove</button>
    `;
    plusierexperience.appendChild(bloc);
    const toutBtnRimouveExpeience = document.querySelectorAll(".btn-remouve-experience");
    toutBtnRimouveExpeience.forEach((bt) => {
        bt.addEventListener("click", () => {
            const divParentt = bt.closest("experience-bloc");

            divParentt.remove();

        })
    })

});



function colectexperinces() {
    const regixcompany = /^[A-Za-z0-9\s]+$/;
    const toutexperience = document.querySelectorAll(".experience-bloc");

        for (ex of toutexperience) {
            const company = ex.querySelector(".company").value.trim();
            const start = ex.querySelector(".start-date").value.trim();
            const end = ex.querySelector(".end-date").value.trim();
            if (!company || !start || !end) {
                return;
            }
            if (!regixcompany.test(company)) {
                alert("company incorrect");
                return;
            }
    for (ex of toutexperience) {
        const company = ex.querySelector(".company").value.trim();
        const start = ex.querySelector(".start-date").value.trim();
        const end = ex.querySelector(".end-date").value.trim();
        if (!company || !start || !end) {
            return;
        }
        if (!regixcompany.test(company)) {
            alert("company incorrect");
            return;
        }

            if (new Date(start) > new Date(end) && new Date(start) > Date.now) {
                alert("hhhhhh");
                return;
            }
        const starDate= new Date(start).getTime();
        const endDate =new Date(end).getTime();
        const now= Date.now();

        if (starDate > endDate) {
            alert("La date de debut ne peut pas etre posterieure a la date de fin!!");
            return;
        }

        if (starDate > now) {
            alert("La date de debut ne peut pas se trouver dans le futur!!");
            return;
        }
        expirience.push({
            company,
            start,
            end

    });
        };
    }

    console.log(expirience);

    return expirience;
}



function affchesidbar() {
    sidebar.classList.toggle("active");
}

let objId = JSON.parse(localStorage.getItem('objId')) || 0;

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const experiens = colectexperinces();
    const nomregix = /^[^\d]+$/;
    const emailregix = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const roleregix = /^[^\d]+$/;
    const telregix = /^\+?\d{8,15}$/;
    const regixurl = /https?:\/\/\S+/g;

    const selectrolvalue = select.value.trim();
    const nomPrenomvalue = nomprenom.value.trim();
    const emailvalue = email.value.trim();
    const telephonevalue = telephone.value.trim();
    const urlvalue = url.value.trim();

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

    unassignedEmployees.push({
        isWorkr: false,
        id: objId,
        nomPrenomvalue,
        emailvalue,
        selectrolvalue,
        telephonevalue,
        urlvalue,
        experiens
    });
    objId++
        ;
    console.log(unassignedEmployees);
    plusierexperience.innerHTML = "";
    localStorage.setItem('objId', JSON.stringify(objId));
    form.reset();
    renderSidebar();

});



noneform.addEventListener("click", () => {
    formParente.style.display = "none";
});



function renderSidebar() {
    const sidebar = document.getElementById("sidebar");
    document.querySelectorAll(".card").forEach(ev => ev.remove());

    unassignedEmployees.forEach((card) => {
        if (card.isWorkr != true) {
            console.log(12)
            const carde = document.createElement("div");
            carde.classList.add("card");
            carde.setAttribute("id", card.id);
            carde.innerHTML = `
                    <div>
                    <img src="${card.urlvalue}" alt="photo">
                    </div>
                    <h4>${card.nomPrenomvalue}</h4>
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

function modal(id) {
    unassignedEmployees.forEach((card) => {
        if (card.id === Number(id)) {
            divModal.innerHTML = `
            <p onclick="closmodal()" class="clos">X</p>
            <h4>Nom-Prenom : ${card.nomPrenomvalue}</h4>            
            <p>Email : ${card.emailvalue}</p>
            <p>Telephone : ${card.telephonevalue}</p>
            <p>ROle : ${card.selectrolvalue}</p>
    `
        }
        divModal.style.display = "block";
    })

}
function closmodal() {
    console.log("enter");
    divModal.style.display = "none";
}

function imgurl() {
    const inputurl = document.getElementById("input-url");
    url.addEventListener("input", () => {
        console.log(10);
        document.getElementById("img-url").src = inputurl.value;
    })

}
imgurl()


//closeat=>ax kadir =>katmxi l awal parent 3ndo dak l class li 3titiha const div = btn.closest(".grandparent");
//!!!!!!!! had function ax katgol =>dawr dyalha ana kataaficher les persone li katwaf9o conditon dyal anaho select tsawi smya dyal room ila swat xi smya kat aaficher f modal mn ba3d mnin ankliki 3lih radi itmsah mn card au kan filrih mn array + 
let movedEmployeesModal = [];
function afficherModel() {
    const toutBtn = document.querySelectorAll(".button");
    //hadi dyal X dyal modal mnin tbri thyad modal
    closModal.addEventListener("click", () => {

        modalromm.style.display = "none";
        //3lax hadi => bax ila dar clos lmodal au rja3ni mal9ax dok les card;
        document.querySelectorAll(".card-modal-rom").forEach((e) => e.remove());
    })
    toutBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
            const divParent = btn.closest("div");
            const NomDeSalle = divParent.children[0].textContent;
            
            let assgnedEmployees = unassignedEmployees.filter((persone => persone.selectrolvalue === NomDeSalle));
            if (assgnedEmployees.length != 0) {
                const modalromm = document.getElementById("modal-romm");

                assgnedEmployees.forEach((Workr) => {
                    if (!Workr.isWorkr) {
                        const card = document.createElement("div");
                        card.id = Workr.id;
                        card.className = "card-modal-rom";
                        card.innerHTML = `
                        <img src="${Workr.urlvalue}" alt="photo">
                        <h4>${Workr.nomPrenomvalue}</h4>
                        <p>${Workr.selectrolvalue}</p>
                        `;
                        modalromm.append(card);

                        card.addEventListener("click", () => {
                            Workr.isWorkr = true;
                            card.remove();
                            movedEmployeesModal.push(Workr);
                            assgnedEmployees = assgnedEmployees.filter(cardes => cardes != Workr);
                            affichierroom(divParent);
                            renderSidebar();
                        });
                    }
                })
                const modall = document.getElementById("modal-romm");
                modall.style.display = "block";
            }
            else {

                alert("aucune worker!!");
            }
        })
    })
}
afficherModel()
function affichierroom(divParent) {
    cars = document.createElement("div");
    cars.className = "cards-afficher-romm";
    let card = document.createElement("div");
    card.className = "cards-afficher-romm";
    movedEmployeesModal.forEach((work) => {
        
        card.innerHTML = `
                    <img src="${work.urlvalue}" alt="photo">
                    <h4>${work.nomPrenomvalue}</h4>
                    <p>${work.selectrolvalue}</p>
                    `;

        divParent.append(card);
            card.addEventListener("click", () => {
                movedEmployeesModal = movedEmployeesModal.filter(w => w.id !== work.id);
                work.isWorkr != true;
                card.remove();
                sidebar.append(card);
                renderSidebar();
            })

        cars.addEventListener("click", () => {
            movedEmployeesModal = movedEmployeesModal.filter(w => w.id !== cars.id);
             cars.isWorkr != true;
            cars.remove();
            sidebar.append(cars)
            renderSidebar();
        })
    })
}
    const tousSalle = document.querySelectorAll(".tousleszone");
function coleurDesSalle() {
    tousSalle.forEach((sale=>{
        const child = sale.querySelectorAll(".cards-afficher-romm")
        if(child.length == 0){
            sale.style.backgroundColor= " rgba(255, 0, 0, 0.4)";   
            
        }else{
               sale.style.backgroundColor="rgba(73, 253, 67, 0.4)";
        }
    }))
    
}
coleurDesSalle();








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

















// let unassignedEmployees = [];
// let expirience = [];
// // let rom1 = [];
// // let assgnedEmployees=[];

// const form = document.getElementById("form");
// const inputbutton = document.getElementById("input-button");
// const btnAddWorkerBtn = document.getElementById("btnaddworkerBtn");
// const sidebar = document.getElementById("sidebar");
// const nomprenom = document.getElementById("input-Nom-Prenom");
// const email = document.getElementById("input-Email");
// const role = document.getElementById("input-Role");
// const telephone = document.getElementById("input-telephone");
// const url = document.getElementById("input-url");
// const formParente = document.getElementById("formulaire")
// const plusierexperience = document.getElementById("plusier-experience");
// const noneform = document.getElementById("none-form")
// const select = document.getElementById("loc");
// const inputlabelbtn = document.getElementById("input-label-btn")
// const companyInputt = document.getElementById("companyInput");
// const modalromm = document.getElementById("modal-romm");
// const closModal = document.getElementById("closModal");
// btnAddWorkerBtn.addEventListener("click", () => {
//     formParente.style.display = "block";
//     modalromm.style.display = "none";

// });


// function plusierexper() {
//     const btnexperiencee = document.querySelector(".btn-experience");

//     btnexperiencee.addEventListener("click", () => {
//         plusierexperience.style.display = "block";
//     })
// }
// plusierexper()
// document.querySelector(".btn-experience").addEventListener("click", () => {
//     const bloc = document.createElement("div");
//     bloc.className = "experience-bloc";
//     bloc.innerHTML = `
//         <label>Company:</label>
//         <input type="text" class="company" placeholder="Company">

//         <label>Start:</label>
//         <input type="date" class="start-date">

//         <label>End:</label>
//         <input type="date" class="end-date">
//         <hr>
//         <button class="btn-remouve-experience">remove</button>
//     `;
//     plusierexperience.appendChild(bloc);
//     const toutBtnRimouveExpeience = document.querySelectorAll(".btn-remouve-experience");
//     toutBtnRimouveExpeience.forEach((bt) => {
//         bt.addEventListener("click", () => {
//             const divParentt = bt.closest(".experience-bloc");
//             divParentt.remove();

//         })
//     })

// });



// function colectexperinces() {
//     const regixcompany = /^[A-Za-z0-9\s]+$/;
//     const toutexperience = document.querySelectorAll(".experience-bloc");

//     for (ex of toutexperience) {
//         const company = ex.querySelector(".company").value.trim();
//         const start = ex.querySelector(".start-date").value.trim();
//         const end = ex.querySelector(".end-date").value.trim();
//         if (!company || !start || !end) {
//             return;
//         }
//         if (!regixcompany.test(company)) {
//             alert("company incorrect");
//             return;
//         }

//         const starDate= new Date(start).getTime();
//         const endDate =new Date(end).getTime();
//         const now= Date.now();

//         if (starDate > endDate) {
//             alert("La date de debut ne peut pas etre posterieure a la date de fin!!");
//             return;
//         }

//         if (starDate > now) {
//             alert("La date de debut ne peut pas se trouver dans le futur!!");
//             return;
//         }
//         expirience.push({
//             company,
//             start,
//             end

//         });
//     }

//     console.log(expirience);

//     return expirience;
// }



// function affchesidbar() {
//     sidebar.classList.toggle("active");
// }

// let objId = JSON.parse(localStorage.getItem('objId')) || 0;

// form.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const experiens = colectexperinces();
//     const nomregix = /^[^\d]+$/;
//     const emailregix = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     const roleregix = /^[^\d]+$/;
//     const telregix = /^\+?\d{8,15}$/;
//     const regixurl = /https?:\/\/\S+/g;

//     const selectrolvalue = select.value.trim();
//     const nomPrenomvalue = nomprenom.value.trim();
//     const emailvalue = email.value.trim();
//     const telephonevalue = telephone.value.trim();
//     const urlvalue = url.value.trim();

//     if (!nomregix.test(nomPrenomvalue)) {
//         alert("Nom et prénom incorrect(s)");
//         return;
//     }
//     if (!emailregix.test(emailvalue)) {
//         alert("Email incorrect");
//         return;
//     }
//     if (telephonevalue && !telregix.test(telephonevalue)) {
//         alert("Téléphone incorrect");
//         return;
//     }

//     if (!regixurl.test(urlvalue)) {
//         alert("url est incorrect");
//     }
//     if (!roleregix.test(selectrolvalue)) {
//         alert("non select!!");
//         return;
//     }

//     unassignedEmployees.push({
//         isWorkr: false,
//         id: objId,
//         nomPrenomvalue,
//         emailvalue,
//         selectrolvalue,
//         telephonevalue,
//         urlvalue,
//         experiens
//     });
//     objId++
//         ;
//     console.log(unassignedEmployees);
//     plusierexperience.innerHTML = "";
//     localStorage.setItem('objId', JSON.stringify(objId));
//     form.reset();
//     renderSidebar();

// });



// noneform.addEventListener("click", () => {
//     formParente.style.display = "none";
// });



// function renderSidebar() {
//     const sidebar = document.getElementById("sidebar");
//     document.querySelectorAll(".card").forEach(ev => ev.remove());

//     unassignedEmployees.forEach((card) => {
//         if (card.isWorkr != true) {
//             console.log(12)
//             const carde = document.createElement("div");
//             carde.classList.add("card");
//             carde.setAttribute("id", card.id);
//             carde.innerHTML = `
//                     <div>
//                     <img src="${card.urlvalue}" alt="photo">
//                     </div>
//                     <h4>${card.nomPrenomvalue}</h4>
//                     <p>${card.selectrolvalue}</p>
                    
//                     <button class="btn-modal" onclick="modal(${card.id})">Details</button>
//             `
//             sidebar.appendChild(carde);
//             coleurDesSalle();
//         }
         
//     }
//     )
// }

// // function deleteCarde(id){
// //     unassignedEmployees.forEach((person)=>{
// //         console.log(person);
// //         console.log(person.id);
// //         if (person.id===id) {
// //             console.log('inside th if');
// //             console.log(unassignedEmployees);

// //         unassignedEmployees= unassignedEmployees.splice(person.id,1);
// //         }
// //     });
// //      renderSidebar();

// // }


// const btnmodal = document.getElementById("btn-modal");
// const divModal = document.createElement("div");
// divModal.classList.add("divModal");
// document.body.append(divModal);

// function modal(id) {
//     unassignedEmployees.forEach((card) => {
//         if (card.id === id){
//             divModal.innerHTML = `
//             <p onclick="closmodal()" class="clos">X</p>
//             <h4>Nom-Prenom : ${card.nomPrenomvalue}</h4>            
//             <p>Email : ${card.emailvalue}</p>
//             <p>Telephone : ${card.telephonevalue}</p>
//             <p>ROle : ${card.selectrolvalue}</p>
//     `
//         }
//         divModal.style.display = "block";
//     })

// }
// function closmodal() {
//     console.log("enter");
//     divModal.style.display = "none";
// }

// function imgurl() {
//     const inputurl = document.getElementById("input-url");
//     url.addEventListener("input", () => {
//         console.log(10);
//         document.getElementById("img-url").src = inputurl.value;
//     })

// }
// imgurl()


// //closeat=>ax kadir =>katmxi l awal parent 3ndo dak l class li 3titiha const div = btn.closest(".grandparent");
// //!!!!!!!! had function ax katgol =>dawr dyalha ana kataaficher les persone li katwaf9o conditon dyal anaho select tsawi smya dyal room ila swat xi smya kat aaficher f modal mn ba3d mnin ankliki 3lih radi itmsah mn card au kan filrih mn array + 

// let movedEmployeesModal = [];
// function afficherModel() {
//     const toutBtn = document.querySelectorAll(".button");
//     //hadi dyal X dyal modal mnin tbri thyad modal
//     closModal.addEventListener("click", () => {

//         modalromm.style.display = "none";
//         //3lax hadi => bax ila dar clos lmodal au rja3ni mal9ax dok les card;
//         document.querySelectorAll(".card-modal-rom").forEach((e) => e.remove());
//         // coleurDesSalle();
//     })
// // let access = {
// //     "Salle de conférence": ["Salle de conférence", "Salle d'archives", "Salle du staff"],
// //     "Salle d'archives":["Salle de conférence","Salle du staff","Réception"],
// //     "Salle du staff":["Salle de conférence","Salle du staff","Salle de sécurité"],
// //     "Salle de sécurité":["Salle de conférence","Réception","Salle du staff"],
// //     "Salle des serveurs":["Salle de conférence","Salle des serveurs","Réception"],
// //     "Réception":["Réception","Salle de conférence"],
// // }

// const divmodal = document.querySelector(".div-modal");
//     toutBtn.forEach((btn) => {
//         btn.addEventListener("click", () => {
//             const divParent = btn.closest("div");
//             const NomDeSalle = divParent.children[0].textContent;
//             console.log(NomDeSalle);
            
//             // let assgnedEmployees = unassignedEmployees.filter((persone =>access[NomDeSalle].includes(persone.selectrolvalue)));
//             let assgnedEmployees = unassignedEmployees.filter((persone)=>persone.selectrolvalue==NomDeSalle);
//         divmodal.innerHTML = ""
//             if (assgnedEmployees.length != 0) {

//                 const modalromm = document.getElementById("modal-romm");
                
                
//                 assgnedEmployees.forEach((Workr) => {
//                     Workr.isWorkr = false;
//                     if (!Workr.isWorkr){
//                         card.id = Workr.id;
//                         card.innerHTML = `
//                         <img src="${Workr.urlvalue}" alt="photo">
//                         <h4>${Workr.nomPrenomvalue}</h4>
//                         <p>${Workr.selectrolvalue}</p>
//                         `;
                        
//                         divmodal.appendChild(card);

//                         card.addEventListener("click", () => {
//                             Workr.isWorkr = true;
//                             card.remove();
//                             movedEmployeesModal.push(Workr);
//                             assgnedEmployees = assgnedEmployees.filter(cardes => cardes != Workr);
//                             affichierroom(divParent);
//                             renderSidebar();
//                             coleurDesSalle();
//                         });
//                     }
//                 })
//                 const modall = document.getElementById("modal-romm");
//                 modall.style.display = "block";
//             }
//             else {
//                 alert("aucune worker!!");
//             }
//         })
//     })
// }
// afficherModel()

// function affichierroom(divParent) {
//     let card = document.createElement("div");
//     card.className = "cards-afficher-romm";
//     movedEmployeesModal.forEach((work) => {
//         card.innerHTML = `
//                     <img src="${work.urlvalue}" alt="photo">
//                     <h4>${work.nomPrenomvalue}</h4>
//                     <p>${work.selectrolvalue}</p>
//                     `;
//                     divParent.append(card);

//             card.addEventListener("click", () => {
//                 movedEmployeesModal = movedEmployeesModal.filter(w => w.id !== work.id);
//                 work.isWorkr != true;
//                 card.remove();
//                 sidebar.append(card);
//                 renderSidebar();
//                 coleurDesSalle();
//             })


//     })
// }
//     const tousSalle = document.querySelectorAll(".tousleszone");

// function coleurDesSalle() {
//     tousSalle.forEach((sale=>{
//         const child = sale.querySelectorAll(".cards-afficher-romm")
//         if(child.length == 0){
//             sale.style.backgroundColor= " rgba(255, 0, 0, 0.4)";   
            
//         }else{
//                sale.style.backgroundColor="rgba(73, 253, 67, 0.4)";
//         }
        
       

//     }))
    
// }
// coleurDesSalle();
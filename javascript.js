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
    unassignedEmployees.forEach((card)=>{
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

let movedEmployeesModal = [];
//closeat=>ax kadir =>katmxi l awal parent 3ndo dak l class li 3titiha const div = btn.closest(".grandparent");
//!!!!!!!! had function ax katgol =>dawr dyalha ana kataaficher les persone li katwaf9o conditon dyal anaho select tsawi smya dyal room ila swat xi smya kat aaficher f modal mn ba3d mnin ankliki 3lih radi itmsah mn card au kan filrih mn array +  
    function afficherModel() {
        const toutBtn = document.querySelectorAll(".button");
        toutBtn.forEach((btn)=>{
            btn.addEventListener("click",()=>{
                const divParent = btn.closest("div");
                const NomDeSalle =  divParent.children[0].textContent;
                
                let assgnedEmployees =  unassignedEmployees.filter((persone=> persone.selectrolvalue===NomDeSalle));
            
                if(assgnedEmployees.length!=0){
                    const modalromm = document.getElementById("modal-romm")
                    console.log("dkhl")
                    const card = document.createElement("div")
                    card.className="card-modal-rom";
                assgnedEmployees.forEach((Workr)=>{
                    card.innerHTML=`
                    <img src="${Workr.urlvalue}" alt="photo">
                    <h2>${Workr.nomPrenomvalue}</h2>
                    <p>${Workr.selectrolvalue}</p>
                    `;
                    modalromm.append(card);
                    card.addEventListener("click",()=>{
                        card.remove();
                        movedEmployeesModal.push({Workr});
                        assgnedEmployees = assgnedEmployees.filter(card=>card!=Workr);
                        divParent.append(card);
                    });
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
    // function affichierroom() {
    //     const cardclick = 
    // }
    


    // let personeconference = unassignedEmployees.filter((persone)=>persone.select==="Salle de conférence");
    
    
    // console.log(personeconference);
    
    // personeconference.forEach((persconfirece)=>{
    //     const modalromm = document.getElementById("modal-romm");
    //     modalromm.innerHTML+=`
    //     <div>
    //         <img src="${persconfirece.urlvalue}" alt="photo">
    //         </div>
    //         <h2>${persconfirece.nomPrenomvalue}</h2>
    //         <p>${persconfirece.selectrolvalue}</p>
    //     `

    // })

// قواعد الوصول حسب الدور الوظيفي:

// الاستقبال (Réception)
// ❗ الدخول مسموح فقط لموظفي الاستقبال.

// غرفة الخوادم (Salle des serveurs)
// ❗ الدخول مسموح فقط لموظفي تكنولوجيا المعلومات (Techniciens IT).

// غرفة الأمن (Salle de sécurité)
// ❗ الدخول مسموح فقط لوكلاء الأمن (Agents de sécurité).

// المدير (Manager)
// ✔ يمكنه الدخول إلى جميع المناطق دون استثناء.

// التنظيف (Nettoyage)
// ✔ يمكنهم الدخول إلى جميع المناطق
// ❗ باستثناء: غرفة الأرشيف (Salle d’archives).

// الأدوار الأخرى (Autres rôles)
// ✔ دخول حر
// ❗ لكن بدون دخول المناطق المقيّدة (مثل غرف الخوادم أو الأمن).




                    // Salle de conférence
                    // Réception
                    // Salle des serveurs
                    // Salle de sécurité
                    // Salle du staff
                    // Salle d'archives

//Réception (الاستقبال)
// → المناسب ليها: Réceptionnistes (موظفي الاستقبال)

// Salle des serveurs (غرفة الخوادم)
// → المناسب ليها: Techniciens IT (تقنيّي المعلوميات)

// Salle de sécurité (غرفة الأمن)
// → المناسب ليها: Agents de sécurité (عناصر الأمن)

// Salle de conférence (قاعة الاجتماعات)
// → المناسب ليها: معظم الأدوار (ماشي منطقة ممنوعة)

// Salle du staff (غرفة الموظفين)
// → المناسب ليها: جميع الموظفين (مكان عادي)

// Salle d’archives (غرفة الأرشيف)
// → المناسب ليها: الأدوار العامة
// ❗ ما عدا التنظيف (Nettoyage ما يدخلش)

// Manager (المدير)
// → مناسب لجميع الغرف بلا استثناء

// Nettoyage (التنظيف)
// → مناسب لجميع الغرف
// ❗ إلّا الأرشيف

// Autres rôles (أدوار أخرى)
// → يدخلوا الغرف العادية فقط
// ❗ ما يدخلوا المناطق المقيّدة (الأمن والخوادم…)

// Réception → uniquement les Réceptionnistes
// Salle des serveurs → uniquement les Techniciens IT
// Salle de sécurité → uniquement les Agents de sécurité
// Manager → peut être affecté partout
// Nettoyage → peut être affecté partout sauf à la Salle d’archives
// Autres rôles → accès libre sauf aux zones restreintes
// الاستقبال ← موظفو الاستقبال فقط
// غرفة الخادم ← فنيو تكنولوجيا المعلومات فقط
// غرفة الأمن ← مسؤولو الأمن فقط
// المدير ← إمكانية التعيين في أي مكان
// التنظيف ← إمكانية التعيين في أي مكان باستثناء غرفة الأرشيف
// أدوار أخرى ← إمكانية الوصول مفتوحة باستثناء المناطق المحظورة

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

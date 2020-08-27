
const patients = [];
const patient = {};
const fname = document.querySelector("#first-name");
const lname = document.querySelector("#last-name");
const title = document.querySelector("#titles");
const street = document.querySelector("#street");
const city = document.querySelector("#city");
const state = document.querySelector("#state");
const zip = document.querySelector("#zip");
const address = `${street.value} ${city.value} ${state.value} zip code: ${zip.value}`;
const bDay = document.querySelector("#dob");
const phone = document.querySelector("#phone");
const email = document.querySelector("#email");
const eName = document.querySelector("#e-name");
const ePhone = document.querySelector("#e-phone");
const feet = document.querySelector("#feet");
const inch = document.querySelector("#inch");
const weight  = document.querySelector("#weight")
const abo = document.querySelector("#BG");
const rh = document.querySelector("#Rh");
const condition = document.querySelector("#condition");
const sTime  = document.querySelector("#start");
const allergy = document.querySelector("#allergy")
const newButton = function(){
    const nButton = document.createElement('BUTTON'); 
    nButton.textContent = 'Remove';
    nButton.className = 'remove';
return nButton}
patient["chronic condition"] = [];
patient.allergies = [];
patient["past visits"]=[];
const conditionList = document.querySelector(".chronic-condition");
const allergyList = document.querySelector(".allergies");
const medicationList = document.querySelector(".medications");
const previousList = document.querySelector(".past-visits")
const addCondition = function(){
    const newCondition = {
        condition:condition.value,
        diagnosisTime : sTime.value,
    }
    const str = `${condition.value} ${sTime.value}`;
    const li = document.createElement('li');
    li.innerText = str;
    const rButton = newButton();
    li.appendChild(rButton);
    conditionList.appendChild(li);
    removes = document.querySelectorAll(".remove");
    for(const btn of removes){
        btn.addEventListener('click',deleteItem)
    }
    patient["chronic condition"].push(newCondition);
    condition.value = "";
    sTime.value = "";
}
const addAllergy = function(){
    const newAllergy= allergy.value;
    const li = document.createElement('li');
    li.innerText = allergy.value;
    const rButton = newButton();
    li.appendChild(rButton);
    allergyList.appendChild(li);
    removes = document.querySelectorAll(".remove");
    for(const btn of removes){
        btn.addEventListener('click',deleteItem)
    }
    patient.allergies.push(newAllergy);
    allergy.value = "";
}
const medicine = document.querySelector("#medicine");
const dose = document.querySelector("#dose");
const time= document.querySelector("#time")
const begin = document.querySelector("#begin");
patient.medications = [];
const addMedicine= function(){
    const drug = {
        medication :medicine.value,
        dose: dose.value,
        frequency: time.value,
        startTime:begin.value,
    }
    const str = `${medicine.value}  ${dose.value}   ${time.value}  ${begin.value}`;
    const li = document.createElement('li');
    li.innerText = str;
    const rButton = newButton();
    li.appendChild(rButton);
    medicationList.appendChild(li);
    removes = document.querySelectorAll(".remove");
    for(const btn of removes){
        btn.addEventListener('click',deleteItem)
    }
    patient.medications.push(drug);
    medicine.value = "";
    dose.value = "";
    time.value = "";
    begin.value = "";
}
patient["past visits"] = [];
const dept = document.querySelector("#department");
const vTime =  document.querySelector("#visit-time");
const disease  = document.querySelector("#disease");
const rx  = document.querySelector("#prescription");
const test  = document.querySelector("#test");
const addVisit = function(){
    const visit = {
        department: dept.value,
        time: vTime.value,
        diagnosis: disease.value,
        medication: rx.value,
        test: test.value,
    }
    const str = visit.department+' ' +  visit.time+' '+ visit.diagnosis;
    const li = document.createElement('li');
    li.innerText = str;
    const rButton = newButton();
    li.appendChild(rButton);
    previousList.appendChild(li);
    removes = document.querySelectorAll(".remove");
    for(const btn of removes){
        btn.addEventListener('click',deleteItem)
    }
    patient["past visits"].push(visit);
    dept.value = "";
    vTime.value = "";
    disease.value = "";
    rx.value ="";
    test.value = "";
}
const clearList = function(list) {
    while(list.hasChildNodes()) {
      list.firstChild.remove();
    }
  }

const mCondition = document.querySelector(".add-one-condition");
const mAllergy  = document.querySelector(".add-one-allergy");
const mDrug  = document.querySelector(".add-one-medication");
const mVisit = document.querySelector(".add-one-visit");
const summit = document.querySelector(".summit");
const inputs = document.querySelectorAll("input");
let removes = document.querySelectorAll(".remove");
const deleteItem = function(event){
    event.target.parentElement.remove();
}

mCondition.addEventListener('click',addCondition);
mAllergy.addEventListener('click',addAllergy);
mDrug.addEventListener('click',addMedicine);
mVisit.addEventListener('click',addVisit);
const clearAll = function(){
    clearList(conditionList);
    clearList(medicationList);
    clearList(allergyList);
    clearList(previousList);
    for(const input of inputs){
        input.value = "";
    }
}
const update = function(){
    patient.name = title.value + " " +fname.value +" "+ lname.value;
    patient.phone = phone.value;
    patient.email = email.value;
    patient["date of birth"] = bDay.value;
    patient["basic health"] = {
        height:`${feet.value} ft. ${inch.value} inch`,
        weight: weight.value + "lbs",
        bloodGroup: abo.value+ " "+ rh.value, 
    }
    patient["emergency contact"] = {
        name:eName.value,
        phone:ePhone.value,
    }
    if(condition.value!==""){addCondition()}
    if(allergy.value!==""){addAllergy()}
    if(medicine.value!=="") {addMedicine()}
    if(dept.value!==""){addVisit();}
  
}
const summitAll = function(){
    update();
    patients.push(patient);
    postPatient(patient);
    clearAll()
}

summit.addEventListener('click',summitAll)
const postPatient = function(patient) {
    const handleNewPatient = function() {
      if(xhr.readyState == 4 && xhr.status == 200) {
        console.log(xhr.responseText);
    }
    }
  
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load',handleNewPatient);
    xhr.open("POST",'http://localhost:3000/patients');
    const str = JSON.stringify(patient);
    xhr.setRequestHeader("Content-type", "application/json");
    xhr.send(str);
  }
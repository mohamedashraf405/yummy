let openBtn = document.getElementById("open-btn");
let closeBtn = document.getElementById("close-btn");
let nav_h = document.getElementById("nav-h");
let nav_b = document.getElementById("nav-b");
openBtn.addEventListener("click", function () {
  nav_h.classList.add("start-100");
  nav_b.classList.remove("start--50");
  closeBtn.classList.remove("d-none");
  openBtn.classList.add("d-none");
});
closeBtn.addEventListener("click", function () {
  nav_h.classList.remove("start-100");
  nav_b.classList.add("start--50");
  closeBtn.classList.add("d-none");
  openBtn.classList.remove("d-none");
});

async function getMeals() {
  document.getElementById("loading").classList.remove('d-none')
  let res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s="
  );
  let data = await res.json();
 
  console.log(data.meals);
  displayMeals(data.meals);
  document.getElementById("loading").classList.add('d-none')
}

function displayMeals(meals) {
 
  let box = "";
  meals.forEach((meal) => {
    box += ` <div class="col-md-3">
                <div onclick='mealDetailsFn("${meal.idMeal}")' class="meal fadeInUp position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${meal.strMealThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${meal.strMeal}</h3>
                    </div>
                </div>
             </div>`;
  });
  document.getElementById("rowData").innerHTML = box;
  
}

getMeals();

async function mealDetailsFn(id) {
   document.getElementById("loading").classList.remove('d-none')
  let r = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  let d = await r.json();
  let m = d.meals[0];
  let box = " ";
  for (let i = 1; i < 15; i++) {
    x = m["strIngredient" + i];
    y = m["strMeasure" + i];
    if (x !== "") {
      box += ` <li class="alert alert-info m-2 p-1">${y} ${x}</li>`;
    }
  }
  console.log(box);

  document.getElementById("rowData").innerHTML = `
 <div class="col-md-4 fadeInUp">
                <img class="w-100 rounded-3" src="${m.strMealThumb}" alt="">
                    <h2>${m.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${m.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${m.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${m.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul id="strIngredient" class="list-unstyled d-flex g-3 flex-wrap">
                    ${box}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    
                </ul>

                <a target="_blank" href="${m.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${m.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>
`;
 document.getElementById("loading").classList.add('d-none')
}

async function getCategories() {
   document.getElementById("loading").classList.remove('d-none')
  let r = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
  let d = await r.json();
  let box = "";
  console.log(d.categories);

  d.categories.forEach((c) => {
    box += `<div class="col-md-3">
                <div onclick="filterByCategory('${c.strCategory}')" class="meal fadeInUp position-relative overflow-hidden rounded-2 cursor-pointer">
                    <img class="w-100" src="${c.strCategoryThumb}" alt="" srcset="">
                    <div class="meal-layer position-absolute text-center text-black p-2">
                        <h3>${c.strCategory}</h3>
                        <p>${c.strCategoryDescription}</p>
                    </div>
                </div>
        </div>`;
  });
  document.getElementById("rowData").innerHTML = box;
  document.getElementById("loading").classList.add('d-none')
}
async function filterByCategory(cat) {
   document.getElementById("loading").classList.remove('d-none')
  let r = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`
  );
  let d = await r.json();
  displayMeals(d.meals);
   document.getElementById("loading").classList.add('d-none')
}

async function getArea() {
  document.getElementById("loading").classList.remove('d-none')
  let r = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
  );
  let d = await r.json();
  let box = "";
  console.log(d.meals);

  d.meals.forEach((a) => {
    box += `<div class="col-md-3">
                <div onclick="getByArea('${a.strArea}')" class="rounded-2 fadeInUp text-center cursor-pointer">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${a.strArea}</h3>
                </div>
        </div>`;
  });
  document.getElementById("rowData").innerHTML = box;
  document.getElementById("loading").classList.add('d-none')
}

async function getByArea(a) {
  document.getElementById("loading").classList.remove('d-none')
  let r = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${a}`
  );
  let d = await r.json();
  displayMeals(d.meals);
  document.getElementById("loading").classList.add('d-none')
}

async function getIngredients() {
  document.getElementById("loading").classList.remove('d-none')
  let r = await fetch(
    "https://www.themealdb.com/api/json/v1/1/list.php?i=list"
  );
  let d = await r.json();
  let box = "";
  console.log(d.meals.slice(0, 20));

  d.meals.slice(0, 20).forEach((i) => {
    box += `<div class="col-md-3 fadeInUp">
                <div onclick="getByIng('${
                  i.strIngredient
                }')" class="rounded-2 text-center cursor-pointer">
                        <img class="w-100" src="${i.strThumb}" alt="" srcset="">
                        <h3>${i.strIngredient}</h3>
                        <p>${i.strDescription.slice(0, 100)}</p>
                </div>
        </div>`;
  });
  document.getElementById("rowData").innerHTML = box;
  document.getElementById("loading").classList.add('d-none')
}

async function getByIng(i) {
  document.getElementById("loading").classList.remove('d-none')
  let r = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${i}`
  );
  let d = await r.json();
  displayMeals(d.meals);
  document.getElementById("loading").classList.add('d-none')
}

function showSearch() {
  document.getElementById("loading").classList.remove('d-none')
  document.getElementById("searchInputs").innerHTML = `
     <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent " type="text" placeholder="Search By Name">
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByLetter(this.value)" maxlength="1" class="form-control bg-transparent " type="text" placeholder="Search By First Letter">
        </div>
    </div>
  `;
  document.getElementById("rowData").innerHTML = "";
  document.getElementById("loading").classList.add('d-none')
}
async function searchByName(v) {
  if (v) {
    let r = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${v}`
    );
    let d = await r.json();
    displayMeals(d.meals || []);
  }
}
async function searchByLetter(v) {
  if (v) {
    let r = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${v}`
    );
    let d = await r.json();
    displayMeals(d.meals || []);
  }
}
function showContact() {
  let box = `
      <div id="contactPage" class="contact min-vh-100 d-flex justify-content-center align-items-center" style="display:none;">
        <div class="container w-75 text-center">
          <div class="row g-4">
            <div class="col-md-6">
              <input id="nameInput" type="text" class="form-control text-black" placeholder="Enter Your Name">
              <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">Special characters and numbers not allowed</div>
            </div>
            <div class="col-md-6">
              <input id="emailInput" type="email" class="form-control text-black" placeholder="Enter Your Email">
              <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">Email not valid *example@yyy.zzz</div>
            </div>
            <div class="col-md-6">
              <input id="phoneInput" type="text" class="form-control text-black" placeholder="Enter Your Phone">
              <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">Enter valid Phone Number</div>
            </div>
            <div class="col-md-6">
              <input id="ageInput" type="number" class="form-control text-black" placeholder="Enter Your Age">
              <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">Enter valid age</div>
            </div>
            <div class="col-md-6">
              <input id="passwordInput" type="password" class="form-control text-black" placeholder="Enter Your Password">
              <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">Enter valid password *Minimum eight characters*</div>
            </div>
            <div class="col-md-6">
              <input id="repasswordInput" type="password" class="form-control text-black" placeholder="Repassword">
              <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">Enter valid repassword</div>
            </div>
          </div>
          <button  id="submitBtn" type="rest" class="btn btn-outline-danger px-2 mt-3">Submit</button>
        </div>
      </div>
      `
     
  ;

  document.getElementById("rowData").innerHTML = box
  
  ;


 let nameInput= document.getElementById("nameInput");
 nameInput.addEventListener("keyup", function () {
    let regex = /^[A-Za-z ]+$/;
    let isValid=regex.test(nameInput.value);
  
      document.getElementById("nameAlert").classList.toggle("d-none", isValid);

   
    
  });

  let emailInput= document.getElementById("emailInput");
  emailInput.addEventListener("keyup", function () {
    let regex = /^\S+@\S+\.\S+$/
    let isValid=regex.test(emailInput.value);
    document.getElementById("emailAlert").classList.toggle("d-none", isValid);
   
  });

  let phoneInput= document.getElementById("phoneInput")
  phoneInput.addEventListener("keyup", function () {
    let regex = /^[0-9]{10,15}$/
    let isValid=regex.test(this.value);
    document.getElementById("phoneAlert").classList.toggle("d-none", isValid);
   
  });

  let ageInput= document.getElementById("ageInput")
  ageInput.addEventListener("keyup", function () {
    let regex = /^(1[6-9]|[2-9][0-9])$/
    let isValid=regex.test(this.value);
    document.getElementById("ageAlert").classList.toggle("d-none", isValid);
   
  });

  let passwordInput= document.getElementById("passwordInput")
  passwordInput.addEventListener("keyup", function () {
    let regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    let isValid=regex.test(this.value);
    document.getElementById("passwordAlert").classList.toggle("d-none", isValid);
   
  });

  let repasswordInput =document.getElementById("repasswordInput")
  repasswordInput.addEventListener("keyup", function () {
    let valid = repasswordInput.value === passwordInput.value;
    document.getElementById("repasswordAlert").classList.toggle("d-none", valid);
   
  });
   
}


let submitBtn = document.getElementById("submitBtn");


submitBtn.addEventListener('click',function(){
nameInput.value = "";
emailInput.value = "";
phoneInput.value = "";
ageInput.value = "";
passwordInput.value = "";
repasswordInput.value = "";
submitBtn.disabled = true;
});

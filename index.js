// Search Button Event Handler
const btn = document.getElementById("btn");
btn.addEventListener("click", function(){
    const searchText = document.getElementById("search-text");
    const term = searchText.value;
    if(term == ""){
        const foodList = document.getElementById("food-list");
        const errorMessage = `
        <h3>No Results Found</h3>
        <p>Please refresh this page before searching again</p>
        `
        foodList.innerHTML = errorMessage;
       }else{
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
        .then(response => response.json())
        .then(data => {
            displayMeals(data);
        });
    };

// Display meals function
const displayMeals = dataByName => {
    const meals = dataByName.meals;
    meals.forEach(element => {
        const foodList = document.getElementById("food-list");
        const foodName = `
        <img src=${element.strMealThumb}><br>
        <h5>${element.strMeal}</h5>
        `
        const foodDiv = document.createElement("div");
        foodDiv.className = "food-div";
        foodDiv.innerHTML = foodName;
        foodList.appendChild(foodDiv);
        foodDiv.addEventListener("click", function(){
            displayDetails(element.idMeal);
        });
    });
}});

//Display details of a meal function
const displayDetails = id => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        const meal = data.meals[0];
        displayIng(meal);
    })
};

// Ingredient of the meals management function
const displayIng = mealDetails => {
    document.getElementById("main").style.display = "none";
    const ingredients = document.getElementById("ingredients");
    ingredients.innerHTML = `
    <img src=${mealDetails.strMealThumb}></img><br>
    <h5>${mealDetails.strMeal}</h5>
    <p>Ingredients</p>
    <ul>
        <li>${mealDetails.strMeasure1} ${mealDetails.strIngredient1}</li>
        <li>${mealDetails.strMeasure2} ${mealDetails.strIngredient2}</li>
        <li>${mealDetails.strMeasure3} ${mealDetails.strIngredient3}</li>
        <li>${mealDetails.strMeasure4} ${mealDetails.strIngredient4}</li>
        <li>${mealDetails.strMeasure5} ${mealDetails.strIngredient5}</li>
        <li>${mealDetails.strMeasure6} ${mealDetails.strIngredient6}</li>
        <li>${mealDetails.strMeasure7} ${mealDetails.strIngredient7}</li>
    </ul>
    <button onclick="previousBtnHandle()" class="btn btn-danger">Previous</button>
    `
    details.style.display = "block";
};

// Previous Button Management
const previousBtnHandle = () => {
    details.style.display = "none";
    document.getElementById("main").style.display = "block";
}

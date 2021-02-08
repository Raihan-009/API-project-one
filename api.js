const searchInfo = document.getElementById('button-info');
searchInfo.addEventListener('click', function() 
{

    refresh('error-info');
    refresh('content-container');
    refresh('content-details');
    const inputData = document.getElementById('input-info').value;

    if (inputData == "")
    {
        displayErrorInfo('Oh NO! \n Please Enter Your Dish Name.');
    }
    else
    {
        getFoodInfo(inputData);
    }
}
)



const getFoodInfo = firstLetter => {
    const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${firstLetter}`
    
    fetch(URL)
    .then(responseHtml => responseHtml.json())
    .then(data => {displayContent(data.meals)})
    
    .catch(error => displayErrorInfo("Sad :') \n 404 \n Something Went Wrong!"))
}

const displayErrorInfo = error => {
    const errorTag = document.getElementById('error-info');
    errorTag.innerText = error;
}

const displayContent = content => 
{
    const contentContainer = document.getElementById('content-container');
    content.forEach(foodItem => 
        { 
        const div = document.createElement('div');
        div.className = 'meal';
        const foodInfo = `
        <div class="shadow p-3 mb-5 bg-white rounded newPadding">
            <div>
            <img onclick="displayContentDetails('${foodItem.idMeal}')" src=${foodItem.strMealThumb}>      
            </div>
            <div>
            <h1 class = "text-font" style="text-align:center; font-size:20px; font-weight: 600;">${foodItem.strMeal} </h1>     
            </div> 
        </div>      
        `;
        div.innerHTML = foodInfo;
        contentContainer.appendChild(div);
        });

}

const displayContentDetails = details =>
{
    refresh('error-info');
    refresh('content-container');
    refresh('content-details');
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${details}`;
    fetch(url)
    .then(res => res.json())
    .then(data => contentDetails(data.meals[0]));
}



const contentDetails = meal =>{
    const foodDiv = document.getElementById('content-details');
    foodDiv.innerHTML =  `
    <div class="card shadow p-3 mb-5 bg-white rounded bgColor">    
    <img class="img-fluid rounded mx-auto d-block" style="width:400px;" src=${meal.strMealThumb}>
    <h1 class = "item-title"> ${meal.strMeal}</h1>
    
    
    <h4 class="md-4">Ingredients</h4>
        <ul>
            <li>${meal.strIngredient1}</li>
            <li>${meal.strIngredient2}</li>
            <li>${meal.strIngredient3}</li>
            <li>${meal.strIngredient4}</li>
            <li>${meal.strIngredient5}</li>
            <li>${meal.strIngredient7}</li>
            <li>${meal.strIngredient8}</li>
        </ul>
   
    </div>      
    `  
}

const refresh = id => 
{
    const previousContent = document.getElementById(id);
    previousContent.innerHTML = "";
}









// //fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
// .then(responseHTML => responseHTML.json())
// .then(data => {console.log(data)});
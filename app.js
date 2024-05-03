function createDivID(id, text) {
    const div = document.createElement("div");
    div.id = id;
    if (text) {
      div.textContent = text;
    }
    return div;
  }

function createDivClass(className, text) {
    const div = document.createElement("div");
    div.className = className;
    if (text) {
      div.textContent = text;
    }
    return div;
  }

axios.get("https://www.themealdb.com/api/json/v1/1/random.php")
.then((res) => {
    randomfood(res.data.meals[0])})
.catch((err) => console.log(err));

function randomfood(data){
    console.log(data);
    const randomDish=document.getElementById("randomDish");

    const Dish = createDivID("Dish");
  
    const imageContainer = createDivID("imageContainer");
    const foodImage = document.createElement("img");
    foodImage.src = data.strMealThumb;
    foodImage.alt = "foodImage";
    imageContainer.appendChild(foodImage);
  
    const dishName = createDivID("dishName", data.strMeal);
  
    Dish.appendChild(imageContainer);
    Dish.appendChild(dishName);
  
    randomDish.appendChild(Dish);
  
    Dish.addEventListener("click", () => {
      displayIngredients(data.strMeal);
    });
}

const searchButton = document.getElementById("searchImage");

searchButton.addEventListener("click", () => {
    const word = document.getElementById("searchbox").value;
    document.getElementById("searchbox").value = "";

  const searchResult = document.getElementById("searchResult")
  searchResult.innerHTML = "";
  const searchHeading = createDivID("searchHeading","Your Findings");
  const resultsContent = createDivID("resultsContent");
  searchResult.appendChild(searchHeading);
  searchResult.appendChild(resultsContent);

  const resultWindow = document.getElementById("resultsContent")
  resultWindow.innerHTML = "";

  axios
    .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${word}`)
    .then((res) => {
      console.log(res.data.meals);
      searchDish(res.data.meals);
      const selectedItem = document.querySelectorAll(".results");
      selectedItem.forEach((item) => {
        item.addEventListener("click", () => {
          displayIngredients(item.querySelector(".dishName").textContent);
        });
      });
    })
    .catch((err) => console.log(err));
});

function searchDish(data) {
    const imageContainer = document.querySelector("#imageContainer>img");
    const dishName = document.querySelector("#dishName");
    const Dish = document.querySelector("#Dish");
    dishName.style.fontSize = "20px";
    imageContainer.style.width = "350px";
    Dish.style.height = "50%";
    const resultWindow = document.getElementById("resultsContent");
    resultWindow.innerHTML = "";
    data.forEach((item) => {
      const resultsDiv = createDivClass("results");

      const imageDiv = createDivClass("imageDiv");
      const foodImage = document.createElement("img");
      foodImage.src = item.strMealThumb;
  
      const foodNameDiv = createDivClass("dishName", item.strMeal);
      imageDiv.appendChild(foodImage);
      resultsDiv.appendChild(imageDiv);
      resultsDiv.appendChild(foodNameDiv);
      resultWindow.appendChild(resultsDiv);
    });
  }

  function displayIngredients(name) {
    axios
      .get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
      .then((response) => {
        var data = response.data.meals[0];
  
        console.log(data);
        const ingredients = document.getElementById("ingredients");
        ingredients.innerHTML = "";
  
        document.getElementById("id01").style.display = "block";
  
        for (let i = 1; i <= 20; i++) {
          const ingredient = data[`strIngredient${i}`];
          const measure = data[`strMeasure${i}`];
  
          if (!ingredient) {
            break;
          }
  
          const ingredientDiv = createDivID("ingredient", ingredient);
          const measureDiv = createDivID("measure", measure);
  
          ingredientDiv.appendChild(measureDiv);
          ingredients.appendChild(ingredientDiv);
        }
      })
      .catch((err) => console.log(err));
  }
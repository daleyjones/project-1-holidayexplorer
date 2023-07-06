
let rating = 0;
const stars = document.querySelectorAll(".stars i");

stars.forEach((star, index1) => {
    
   
    star.addEventListener("click", () => {
        
        stars.forEach((star, index2) => {
           
            if (index1 >= index2) {
                star.classList.add("active")
                rating = 0
                rating++;
            }
            else {
                star.classList.remove("active");
                rating = 0
            }
        });
       
    });

});
function activeStarCount() {
    let rating = 0;
    const stars = document.querySelectorAll(".active");

    stars.forEach(() => rating++);
    return rating - 1;
  }
  function storeReview() {
    const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    const score = activeStarCount();
    reviews.push(score);
    localStorage.setItem("reviews", JSON.stringify(reviews));
   
    location.reload()
  }
  const submitBtn = document.getElementById("submit");
  submitBtn.addEventListener("click", storeReview);

  const data = JSON.parse(localStorage.getItem("reviews")) || [];



const chartContainer = document.getElementById("chartContainer");
chartContainer.style.width = "400px";
chartContainer.style.height = "300px";
chartContainer.style.border = "1px solid #ccc";
chartContainer.style.display = "flex";
for (let index = 1; index < 6; index++) {
  count = data.filter((e) => e == index).length;
  const bar = document.createElement("div");
  bar.style.width = "50px";
  switch (index) {
    case 1:
      bar.style.backgroundColor = "blue";
      break;
    case 2:
      bar.style.backgroundColor = "red";
      break;
    case 3:
      bar.style.backgroundColor = "yellow";
      break;
    case 4:
      bar.style.backgroundColor = "green";
      break;
    case 5:
      bar.style.backgroundColor = "pink";
      break;
  }
 
  bar.style.marginRight = "10px";
  bar.style.height = count * 10 + "px"; 
  chartContainer.appendChild(bar);
}



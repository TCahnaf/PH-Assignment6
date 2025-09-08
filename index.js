
function captureElementID(id){
    return document.getElementById(id);

};

const addHighlight = (id)=>{
    captureElementID(id).classList.add("bg-green-700")
};

const removeHigglight = (id) =>{
    captureElementID(id).classList.remove("bg-green-700")
};



const loadPlantDetails = async(id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/plant/${id}`);
    const data = await res.json();
    displayPlantDetails(data.plants)
}




const loadCategories = async()=> {
    const res = await fetch ("https://openapi.programming-hero.com/api/categories");
    const data = await res.json();
    displayCategories(data.categories);


};

const loadPlantCards = async()=>{
    const res = await fetch("https://openapi.programming-hero.com/api/plants");
    const data = await res.json();
    displayPlantCards(data.plants)

}

const loadEachPlantCards = async(id)=>{
    const res = await fetch(`https://openapi.programming-hero.com/api/category/${id}`);
    const data = await res.json();
    displayPlantCards(data.plants)

}

const displayPlantDetails = plant => {
    detailsModal = captureElementID("modal-for-details");
    detailsModal.innerHTML = `
    <div>
    <h1 class = "font-bold text-xl">${plant.name}</h1>
    <img class = "h-40 w-full object-cover rounded-t" src= ${plant.image} alt="">
    <p class = "font-bold text-xl">Category: ${plant.category}</p>
    <p class = "font-bold text-xl">Price: ${plant.price} </p>
    <p class = "font-bold text-xl">Description: ${plant.description}</p>
   </div>
 `
 captureElementID("details_modal").showModal();





}




const displayPlantCards = plants => {
    const allPlantCards = captureElementID("cards-container")
    allPlantCards.innerHTML = ""
    for(const plant of plants){
        plantCard = document.createElement("div")
        plantCard.innerHTML = `<div class  = "bg-white p-4 flex flex-col justify-between h-full rounded-xl ">
                <img class = "h-40 w-full object-cover rounded-t" src= ${plant.image} alt="">
                <h2 class  = "font-bold plant-name">${plant.name}</h2>
                <p>${plant.description}</p>
                <div class = "flex justify-between">
                <button onclick = "loadPlantDetails(${plant.id})">${plant.category}</button>
                <p class = "plant-price" >৳<span class = "money-value">${plant.price}</span></p>
                </div>
                <button class = "cart-btn pl-2 bg-[#15803D] w-11/12 rounded-xl text-center">Add to Cart</button>
            </div>

           `
           allPlantCards.append(plantCard);

    
    }


        //Add to Cart Feature


       

                 const cartContent = captureElementID("cart-content");
                const totalDiv = document.createElement("div")
                 cartContent.appendChild(totalDiv);
       
        document.querySelectorAll(".cart-btn").forEach((btn) =>{
           
            btn.addEventListener('click', (e) =>{
                
                 const cartDetails = document.createElement("div")
                 
                
                const parent = e.currentTarget.parentElement;
                alert(`${parent.querySelector(".plant-name").innerText} has been added to your cart`
             );
                 cartDetails.innerHTML = `
            <div class = "flex justify-between items-center px-4 rounded-xl bg-[#F0FDF4]">
            <div>
                 <h2>${parent.querySelector(".plant-name").innerText}</h2>
            <h2>${parent.querySelector(".plant-price").innerHTML} x 1</h2>
           </div>
           <div> <button class = "remove-btn">X</button></div>
           </div>
             `
           const totalPrice = ()=>{
           const itemsCart = captureElementID("cart-content");
           const itemPrices = itemsCart.querySelectorAll(".money-value")
           let total = 0;
        
       
          itemPrices.forEach(price =>{
          const finalPrice = Number(price.innerText)
          total += finalPrice;
      
       });
       totalDiv.innerHTML = `<div class = "flex justify-between items-center">
       <p>Total: </p>
       <p>৳${total}</p>
       </div>`;
           

     
    }

       

            cartDetails.querySelector(".remove-btn").addEventListener('click',()=>{
                cartDetails.remove();
                totalPrice();
                
           

                })
         cartContent.appendChild(cartDetails)
         totalPrice(); 
          cartContent.appendChild(totalDiv);  
           })
           
        })

}


const displayCategories = (categories)=>{
    const categoryContainer = captureElementID("category-container");
    categoryContainer.innerHTML = "";
    categoryContainer.innerHTML = `<h2 class = "text-center font-bold">Categories</h2>
    <button onclick = "loadPlantCards()" class = "hover:bg-green-300" >All Trees</button>
    
    `

    categories.forEach(category => {
        const categoryButton = document.createElement("button");
        
       categoryButton.innerHTML = `<button class = "category-btn bg-font-bold hover:bg-green-300" onclick = "loadEachPlantCards(${category.id})">${category.category_name}</button>`
    //    categoryButton.style.backgroundColor = "lightblue";
        
        categoryContainer.append(categoryButton)
        

    })

};

loadPlantCards();
loadCategories();










/*
  <div class  = "bg-white p-10 rounded-xl w-[311.33px]">
                <img src=" https://i.ibb.co.com/cSQdg7tf/mango-min.jpg" alt="">
                <h2 class  = "font-bold">Mango Tree</h2>
                <p>A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green</p>
                <div class = "flex justify-between">
                <button>Fruit Tree</button>
                <p>৳500</p>
                </div>
                <button class = "pl-2 bg-[#15803D] w-11/12 rounded-xl text-center">Add to Cart</button>
            </div>

            <div class  = "bg-white p-10 rounded-xl w-[311.33px]">
                <img src=" https://i.ibb.co.com/cSQdg7tf/mango-min.jpg" alt="">
                <h2 class  = "font-bold">Mango Tree</h2>
                <p>A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green</p>
                <div class = "flex justify-between">
                <button>Fruit Tree</button>
                <p>৳500</p>
                </div>
                <button class = "pl-2 bg-[#15803D] w-11/12 rounded-xl text-center">Add to Cart</button>
            </div>

            <div class  = "bg-white p-10 rounded-xl w-[311.33px]">
                <img src=" https://i.ibb.co.com/cSQdg7tf/mango-min.jpg" alt="">
                <h2 class  = "font-bold">Mango Tree</h2>
                <p>A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green</p>
                <div class = "flex justify-between">
                <button>Fruit Tree</button>
                <p>৳500</p>
                </div>
                <button class = "pl-2 bg-[#15803D] w-11/12 rounded-xl text-center">Add to Cart</button>
            </div>

*/
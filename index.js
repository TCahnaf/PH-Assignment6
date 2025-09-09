
function captureElementID(id){
    return document.getElementById(id);

};

const removeHighlights = ()=>{
    const elements = document.getElementsByClassName("category-btn");
    for(const element of elements){
        element.classList.remove("bg-green-700", "text-white")
    }
    
};


   
const loadSpinnerOn = () =>{
    document.getElementById("spinner").classList.remove("hidden")
    document.getElementById("cards-container").classList.add("hidden")

}

const loadSpinnerOff = () =>{
    document.getElementById("spinner").classList.add("hidden")
    document.getElementById("cards-container").classList.remove("hidden")

}





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
    loadSpinnerOn();
    const res = await fetch("https://openapi.programming-hero.com/api/plants");
    const data = await res.json();
    displayPlantCards(data.plants)



}

const loadEachPlantCards = async(id)=>{
    loadSpinnerOn();
    const res = await fetch(`https://openapi.programming-hero.com/api/category/${id}`);
    const data = await res.json();
    removeHighlights();
    const clickBtn = document.getElementById(`btn-ctgr-${id}`)
    clickBtn.classList.add("bg-green-700", "text-white")
    displayPlantCards(data.plants)
    
}

const displayPlantDetails = plant => {
    detailsModal = captureElementID("modal-for-details");
    detailsModal.innerHTML = `
    <div class = "space-y-2">
    <h1 class = "font-bold text-2xl">${plant.name}</h1>
    <img class = "h-40 w-full object-cover rounded-t" src= ${plant.image} alt="">
    <p class = "text-xl"><span class = "font-bold">Category</span>: ${plant.category}</p>
    <p class = "text-xl"><span class = "font-bold">Price</span>: ৳${plant.price}</p>
    <p class = "text-xl"><span class = "font-bold">Description</span>: ${plant.description}</p>
   </div>
 `
 captureElementID("details_modal").showModal();


}




const displayPlantCards = plants => {
    const allPlantCards = captureElementID("cards-container")
    allPlantCards.innerHTML = ""
    for(const plant of plants){
        plantCard = document.createElement("div")
        plantCard.innerHTML = `<div class  = "bg-white p-4 flex flex-col justify-between h-full rounded-xl shadow-lg space-y-3">
                <img class = "h-60 w-full object-cover rounded-t" src= ${plant.image} alt="">
                <h2 onclick = "loadPlantDetails(${plant.id})" class  = "font-bold plant-name">${plant.name}</h2>
                <p>${plant.description}</p>
                <div class = "flex justify-between items-center">
                <button class = "bg-[#DCFCE7] text-[#15803D] rounded-2xl p-2" >${plant.category}</button>
                <p class = "plant-price" >৳<span class = "money-value">${plant.price}</span></p>
                </div>
                <button class = "cart-btn px-4 py-2 bg-[#15803D] rounded-xl text-center text-white lg:h-[43px]">Add to Cart</button>
            </div>

           `
           allPlantCards.append(plantCard);
    };
    loadSpinnerOff();


        //Add to Cart Feature

                const cartContent = captureElementID("cart-content");
                const totalDiv = document.createElement("div")
            
       
        document.querySelectorAll(".cart-btn").forEach((btn) =>{
           
            btn.addEventListener('click', (e) =>{
                
                 const cartDetails = document.createElement("div")
                 
                
                const parent = e.currentTarget.parentElement;
                alert(`${parent.querySelector(".plant-name").innerText} has been added to your cart`
             );
                 cartDetails.innerHTML = `
            <div class = "flex justify-between items-center px-2 rounded-l w-[168px] bg-[#F0FDF4]">
            <div>
                 <h2 class = "font-bold">${parent.querySelector(".plant-name").innerText}</h2>
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
    categoryContainer.innerHTML = `<h2 class = "font-bold">Categories</h2>
    <button onclick = "loadPlantCards()" id = "all-tree-btn " class = "text-left category-btn border-8 border-green-500" >All Trees</button>
    `
    

    categories.forEach(category => {
        const categoryButtons = document.createElement("div");
        
       categoryButtons.innerHTML = `<button id = "btn-ctgr-${category.id}" class = "category-btn whitespace-nowrap rounded-lg px-6 py-2  hover:bg-green-500" onclick = "loadEachPlantCards(${category.id})">${category.category_name}</button>`
    
        
        categoryContainer.append(categoryButtons)
        

    })

};




loadPlantCards();
loadCategories();










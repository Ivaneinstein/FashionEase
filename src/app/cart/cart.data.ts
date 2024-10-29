
export var dataProducts = [];


 
const fetchProducts = async () => {
  try {
    const response = await fetch("https://us-central1-fashionease-438818.cloudfunctions.net/db-queries/getCartByUserId?userId=6"); // Usa userId
    const dbProducts = await response.json(); 

    dataProducts = dbProducts
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

fetchProducts();
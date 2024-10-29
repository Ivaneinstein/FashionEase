export var dataProducts = [];

const fetchProducts = async () => {
  try {
    const response = await fetch(
      'https://us-central1-fashionease-438818.cloudfunctions.net/db-queries/getCartByUserId?userId=6'
    );
    const dbProducts = await response.json();

    const idArray = dbProducts.map((product: { id_producto: string; cantidad: string }) => ({
      id_producto: product.id_producto,
      cantidad: product.cantidad,
    }));

    const ids = idArray.map((item: { id_producto: string; }) => item.id_producto).join(',');
    console.log(ids)

    const responseData = await fetch(
      `https://us-central1-fashionease-438818.cloudfunctions.net/db-queries/getProductsByIds?id_producto=${ids}`
    );
    const products = await responseData.json();

    dataProducts = products.map((product: any) => {
      const matchedItem = idArray.find((item: { id_producto: string; }) => item.id_producto === product.id_producto);
      return {
        ...product,
        cantidad: matchedItem ? parseInt(matchedItem.cantidad, 10) : 0,
    };
    });

    console.log(dataProducts);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

fetchProducts();

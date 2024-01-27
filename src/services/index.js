export const getProducts = async () => {
  try {
    const response = await fetch(`https://fakestoreapi.com/products`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Unable to get products");
    throw error;
  }
};

export const getProductDetails = async (id) => {
  if (!id) throw new Error("Invalid Params");
  try {
    const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Unable to get product details");
    throw error;
  }
};

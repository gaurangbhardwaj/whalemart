import { useSelector, useDispatch } from "react-redux";
import {
  selectProductData,
  selectProductLoading,
  getProductsData,
} from "src/redux/slices/productSlice";
import { Grid, Container, CircularProgress } from "@mui/material";
import ProductCard from "../shared/productCard";
import { useEffect } from "react";

const ProductList = () => {
  const dispatch = useDispatch();
  const productData = useSelector(selectProductData);
  const productLoading = useSelector(selectProductLoading);

  useEffect(() => {
    if (productData?.length) return;
    dispatch(getProductsData());
  }, [dispatch, productData?.length]);

  return (
    <Container
      maxWidth="lg"
      style={{ display: "flex", justifyContent: "center" }}
    >
      <Grid
        container
        spacing={4}
        maxWidth={"1366px"}
        padding={"0 10px"}
        justifyContent={"center"}
      >
        {productLoading ? (
          <CircularProgress sx={{marginTop: 40}} />
        ) : (
          productData?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </Grid>
    </Container>
  );
};

export default ProductList;

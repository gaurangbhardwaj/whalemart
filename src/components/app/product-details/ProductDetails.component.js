import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  selectProductDetailsData,
  selectProductDetailsLoading,
  getProductDetailsData,
} from "src/redux/slices/product-details";

import { addToCart } from "src/redux/slices/cart";
import {
  Card,
  Button,
  CardMedia,
  Typography,
  Container,
  Grid,
  CircularProgress,
  Box,
  Rating,
} from "@mui/material";
import { Add, HorizontalRule } from "@mui/icons-material";

import { toast } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const productDetailsData = useSelector(selectProductDetailsData);
  const productDetailsLoading = useSelector(selectProductDetailsLoading);

  const product = useMemo(() => {
    return (productDetailsData && productDetailsData[id]) || null;
  }, [id, productDetailsData]);

  useEffect(() => {
    dispatch(getProductDetailsData(id));
  }, [dispatch, id]);

  const [quantity, setQuantity] = useState(1);

  const addProductToCart = () => {
    dispatch(
      addToCart({
        product,
        quantity,
      })
    );
    toast.success("Product has been added to cart!", {
      position: "top-center",
      hideProgressBar: false,
      closeOnClick: true,
      theme: "dark",
    });
    setQuantity(1);
  };

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
        {productDetailsLoading ? (
          <CircularProgress sx={{ marginTop: 40 }} />
        ) : !product ? (
          "No Product found"
        ) : (
          <Card sx={{ margin: 10 }}>
            <Grid container p={6}>
              <Grid item xs={12} md={6} pr={5}>
                <CardMedia
                  sx={{ maxHeight: 600 }}
                  component="img"
                  image={product.image}
                  alt={product.title}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Box display={"flex"} flexDirection={"column"} gap={2}>
                  <Typography variant="h4">{product.title}</Typography>
                  <Typography variant="caption" textAlign={"justify"}>
                    {product.description}
                  </Typography>
                  <Typography
                    variant="h6"
                    color="textSecondary"
                    fontWeight={"bold"}
                  >
                    ${product.price.toFixed(2)}
                  </Typography>
                  <Rating
                    name="simple-controlled"
                    value={product?.rating?.rate || 0}
                    readOnly
                  />
                  <Box display="flex" gap={2} alignItems="center">
                    <Button
                      variant="outlined"
                      disabled={quantity <= 1}
                      onClick={() => setQuantity((prev) => --prev)}
                    >
                      <HorizontalRule />
                    </Button>
                    <Typography variant="subtitle1" textAlign={"justify"}>
                      {quantity}
                    </Typography>
                    <Button
                      variant="outlined"
                      onClick={() => setQuantity((prev) => ++prev)}
                    >
                      <Add />
                    </Button>
                  </Box>
                  <Button variant="contained" onClick={addProductToCart}>
                    Add to Cart
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Card>
        )}
      </Grid>
    </Container>
  );
};

export default ProductDetail;

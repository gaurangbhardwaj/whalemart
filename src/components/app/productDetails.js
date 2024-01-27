import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  selectProductDetailsData,
  selectProductDetailsLoading,
  getProductDetailsData,
} from "src/redux/slices/productDetailsSlice";

import { addToCart } from "src/redux/slices/cartSlice";
import {
  Card,
  Button,
  CardMedia,
  Typography,
  Container,
  Grid,
  CircularProgress,
  Box,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Rating,
} from "@mui/material";
import { useEffect, useMemo, useState } from "react";

const SAMPLE_QUANTITY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

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
  }, []);

  const [quantity, setQuantity] = useState(1);

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
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Quantity
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={quantity}
                      label="Quantity"
                      onChange={(e) => setQuantity(Number(e.target.value))}
                    >
                      {SAMPLE_QUANTITY.map((data) => (
                        <MenuItem key={data} value={data}>
                          {data}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button
                    variant="contained"
                    onClick={() =>
                      dispatch(
                        addToCart({
                          product,
                          quantity,
                        })
                      )
                    }
                  >
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

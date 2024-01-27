import { useSelector, useDispatch } from "react-redux";
import {
  ListItemText,
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  Box,
  Button,
} from "@mui/material";
import {
  Add,
  HorizontalRule,
  RemoveShoppingCartSharp,
} from "@mui/icons-material";

import { selectCartData, updateQuantity } from "src/redux/slices/cartSlice";
import React, { useMemo } from "react";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCartData);

  const total = useMemo(() => {
    return (
      cart
        .reduce((total, item) => total + item.product.price * item.quantity, 0)
        .toFixed(2) || 0
    );
  }, [cart]);

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
        {!cart.length ? (
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="70vh"
            gap={3}
          >
            <RemoveShoppingCartSharp fontSize="large" />
            <Typography variant="h6">Your cart is empty</Typography>
          </Box>
        ) : (
          <Card sx={{ margin: 10 }}>
            <Box display={"flex"} flexDirection={"column"} gap={10} p={5}>
              {cart.map((item) => (
                <React.Fragment key={item.product.id}>
                  <Box display={"flex"} gap={6}>
                    <CardMedia
                      sx={{ height: 80, width: 80 }}
                      component="img"
                      image={item.product.image}
                    />
                    <ListItemText
                      primary={item.product.title}
                      secondary={`$${item.product.price}`}
                    />
                    <Box display="flex" gap={2} alignItems="center">
                      <Button
                        variant="outlined"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.product.id,
                              quantity: Number(item.quantity) - 1,
                            })
                          )
                        }
                      >
                        <HorizontalRule />
                      </Button>
                      <Typography variant="subtitle1" textAlign={"justify"}>
                        {item.quantity}
                      </Typography>
                      <Button
                        variant="outlined"
                        onClick={() =>
                          dispatch(
                            updateQuantity({
                              id: item.product.id,
                              quantity: Number(item.quantity) + 1,
                            })
                          )
                        }
                      >
                        <Add />
                      </Button>
                    </Box>
                  </Box>
                </React.Fragment>
              ))}
              <Typography variant="h6" fontWeight={700}>
                Total: ${total}
              </Typography>
            </Box>
          </Card>
        )}
      </Grid>
    </Container>
  );
};

export default Cart;

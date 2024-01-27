import { useSelector } from "react-redux";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

import { selectCartData } from "src/redux/slices/cartSlice";

const Cart = () => {
  const cart = useSelector(selectCartData);

  if (cart.length === 0) {
    return <Typography variant="h6">Your cart is empty</Typography>;
  }

  return (
    <List>
      {cart.map((item) => (
        <ListItem key={item.product.id}>
          <ListItemText
            primary={item.product.title}
            secondary={`Quantity: ${item.quantity} - Total: $${(
              item.product.price * item.quantity
            ).toFixed(2)}`}
          />
        </ListItem>
      ))}
      <Typography variant="h6">
        Total: $
        {cart
          .reduce(
            (total, item) => total + item.product.price * item.quantity,
            0
          )
          .toFixed(2)}
      </Typography>
    </List>
  );
};

export default Cart;

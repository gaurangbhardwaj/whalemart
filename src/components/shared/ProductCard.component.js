import { Grid, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <Grid item xs={12} sm={6} md={4} pb={6}>
      <Card
        sx={{ height: "100%", cursor: "pointer" }}
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <CardMedia
          component="img"
          height="140"
          image={product.image}
          alt={product.title}
        />
        <CardContent>
          <Typography variant="subtitle2" minHeight={50}>
            {product.title}
          </Typography>
          <Rating
            name="simple-controlled"
            value={product?.rating?.rate || 0}
            readOnly
          />
          <Typography
            variant="subtitle1"
            color="textSecondary"
            pt={2}
            fontWeight={"bold"}
          >
            ${product.price.toFixed(2)}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProductCard;

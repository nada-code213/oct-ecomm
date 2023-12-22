import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function ActionAreaCard({
  title,
  description,
  image,
  price,
  discount,
  id,
  setPanier,
}) {
  const discountPrice = price - (price * discount) / 100;
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Typography gutterBottom variant="h5" component="div">
            <p className="line-through">{price} $</p>
            <p>{discountPrice.toFixed(2)} $</p>
          </Typography>
          <div className="discount">{discount} %</div>
          <Link to={"product/" + id}>
            <Button size="small">Learn More</Button>
          </Link>
          <Button
            onClick={() => {
              setPanier((ancientPanier) => {
                let existingProducts = ancientPanier.filter(
                  (e) => e.title === title
                );
                if (existingProducts.length === 0) {
                  return [
                    ...ancientPanier,
                    {
                      title,
                      price,
                      quantity: 1,
                    },
                  ];
                } else {
                  toast.error("Already in cart", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                  });
                  return [...ancientPanier];
                }
              });
            }}
            size="small"
          >
            Add To Cart
          </Button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

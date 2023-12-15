import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function ActionAreaCard({
  title,
  description,
  image,
  price,
  discount,
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
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

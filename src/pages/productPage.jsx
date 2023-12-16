import { CircularProgress, Rating } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [displayedImage, setDisplayedImage] = useState("");
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/" + id)
      .then((res) => {
        setProduct(res.data);
        setDisplayedImage(res.data.thumbnail);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="product-page">
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <div className="left">
            <div className="images">
              {product.images.map((e) => {
                return (
                  <img
                    style={
                      e === displayedImage
                        ? { border: "2px solid black" }
                        : null
                    }
                    onClick={() => {
                      setDisplayedImage(e);
                    }}
                    key={e}
                    src={e}
                    alt=""
                  />
                );
              })}
            </div>
            <div className="single-image">
              <img src={displayedImage} alt="" />
            </div>
          </div>
          <div className="right">
            <h1>{product.title}</h1>
            <div className="description">
              <h3>Summary</h3>
              <p>{product.description} </p>
            </div>
            <div className="price">
              <h3>Price</h3>
              <h4>{product.price} $ </h4>
            </div>
            <div className="brand">
              <h3>Brand</h3>
              <p>{product.brand} </p>
            </div>
            <div className="rating">
              <h3>Rating</h3>
              <Rating name="read-only" value={product.rating} readOnly />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

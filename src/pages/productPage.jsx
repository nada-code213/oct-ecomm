import { CircularProgress } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/" + id)
      .then((res) => {
        console.log(res.data);
        setProduct(res.data);
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
                return <img key={e} src={e} alt="" />;
              })}
            </div>
            <div className="single-image">
              <img src={product.thumbnail} alt="" />
            </div>
          </div>
          <div className="right"></div>
        </>
      )}
    </div>
  );
}

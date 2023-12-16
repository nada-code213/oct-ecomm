import { useEffect, useState } from "react";
import "./App.css";
import SearchAppBar from "./components/appBar";
import ActionAreaCard from "./components/productCard";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [panier, setPanier] = useState([]);
  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((res) => {
        console.log(res.data.products);
        setProducts(res.data.products);
        setAllProducts(res.data.products);
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <main>
      <SearchAppBar allProducts={allProducts} setProducts={setProducts} />
      <section className="products">
        <h2>Products</h2>
        <div className="categories">
          <input
            onClick={() => {
              setSelectedCategory("All");
              setProducts(allProducts);
            }}
            style={
              selectedCategory == "All"
                ? {
                    backgroundColor: "#1976d2",
                    color: "white",
                  }
                : null
            }
            type="button"
            value="All"
          />
          <input
            onClick={() => {
              setSelectedCategory("Smartphones");
              setProducts(
                allProducts.filter((e) => e.category === "smartphones")
              );
            }}
            style={
              selectedCategory == "Smartphones"
                ? {
                    backgroundColor: "#1976d2",
                    color: "white",
                  }
                : null
            }
            type="button"
            value="Smartphones"
          />
          <input
            onClick={() => {
              setSelectedCategory("Home decoration");
              setProducts(
                allProducts.filter((e) => e.category === "home-decoration")
              );
            }}
            style={
              selectedCategory == "Home decoration"
                ? {
                    backgroundColor: "#1976d2",
                    color: "white",
                  }
                : null
            }
            type="button"
            value="Home decoration"
          />
          <input
            onClick={() => {
              setSelectedCategory("Groceries");
              setProducts(
                allProducts.filter((e) => e.category === "groceries")
              );
            }}
            style={
              selectedCategory == "Groceries"
                ? {
                    backgroundColor: "#1976d2",
                    color: "white",
                  }
                : null
            }
            type="button"
            value="Groceries"
          />
        </div>
        <div className="products-content">
          {loading ? (
            <CircularProgress />
          ) : (
            products.map((e) => {
              return (
                <ActionAreaCard
                  key={e.id}
                  title={e.title}
                  image={e.thumbnail}
                  description={e.description}
                  price={e.price}
                  discount={e.discountPercentage}
                  id={e.id}
                  setPanier={setPanier}
                />
              );
            })
          )}
        </div>
      </section>
      <div
        className="add-button"
        onClick={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ShoppingCartIcon />
      </div>
      {modalVisible && (
        <div className="cart-modal">
          {panier.map((e) => {
            return (
              <div key={e.title} className="modal-item">
                <h4>{e.title}</h4>
                <h4>{e.price} $</h4>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}

export default App;

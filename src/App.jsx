import {useState, useEffect, createContext, useContext} from 'react';
const ThemeContext = createContext();
const ThemeDisplay = () => {
  const theme = useContext(ThemeContext);
  return <p>Current Theme: {theme}</p>
}
export default function App(){
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState([]);
  const [displayed, setDisplayed] = useState([]);
  const [addCart, setAddCart] = useState([]);
  const [theme, setTheme] = useState("light");


  useEffect(() => {
    const fetchProducts = async () => {
    setLoading(true);
    const res = await fetch("https://dummyjson.com/products?limit=10")
    const data = await res.json();
    setAllProducts(data.products);
    setDisplayed(data.products);
    setLoading(false);
    }
    fetchProducts();
  }, []);
  if(loading){
    return <h1>Loading...</h1>
  }
  const showCheap = () => {
    const cheap = allProducts.filter((product) => product.price * 56 <= 2000);
    setDisplayed(cheap);
  }
  const showAll = () => {
    setDisplayed(allProducts);
  }
  const addToCart = (product) => {
    setAddCart([...addCart, product]);
  }
  const total = addCart.reduce((acc, item) => acc + item.price * 56, 0);
  return ( 
    <>
     <ThemeContext.Provider value={theme}>
      <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
        Toggle Theme
      </button>
      <ThemeDisplay />
      <h2>Cart</h2>
      {addCart.map((item) => (
        <p key={item.id}>{item.title} - ₱{(item.price * 56).toFixed(2)}</p>
      ))}
      <h3>Total: ₱{total?.toFixed(2)}</h3>
    <button type="button" onClick={showCheap}>Show Cheap Products</button>
    <button type="button" onClick={showAll}>Show All Products</button>
      {displayed.map((product) => (
        <div key={product.id}>
        <h3>{product.title}</h3>
        <p key={product.price}>{product.price?.toFixed(2)}</p>
        <img src={product.thumbnail} alt={product.title} />
        <button type="button" onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
     </ThemeContext.Provider>
    </>
  );
}
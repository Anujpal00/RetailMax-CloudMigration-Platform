import "./style.css";
fetch('/api/products.json')
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });

import { showProductContainer } from "./homeProductCards";


showProductContainer(products);



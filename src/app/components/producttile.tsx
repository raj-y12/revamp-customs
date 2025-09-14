import React from "react";
import { Product } from "../types";

interface Props {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductTile: React.FC<Props> = ({ product, onAddToCart }) => {
  return (
    <div className="rounded-xl bg-[var(--surface)] p-4 shadow-md hover:scale-105 transition-transform duration-200" style={{padding: '30px'}}>
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-bold text-[var(--text-primary)]">{product.name}</h3>
      <p className="text-md text-[var(--text-secondary)]">£{product.price.toFixed(2)}</p>
      
    </div>
  );
};

export default ProductTile;
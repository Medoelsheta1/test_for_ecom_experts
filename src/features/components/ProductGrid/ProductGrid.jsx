import ProductCard from '../ProductCard/ProductCard';
import productImages from '../../../data/productImages';

import './ProductGrid.css';

function ProductGrid({
  products,
  productSelections,
  onVariantChange,
  onQuantityChange,
}) {
  return (
    <div className="product-grid">
      {products.map((product) => {
        const selection = productSelections[product.id];

        const activeVariantId =
          selection?.activeVariantId ||
          product.variants?.[0]?.id ||
          null;

        const quantities = selection?.quantities || {};

        const currentQuantity = activeVariantId
          ? quantities[activeVariantId] || 0
          : quantities.default || 0;

        const totalQuantity = Object.values(quantities).reduce(
          (total, quantity) => total + quantity,
          0
        );

        const productWithImages = {
          ...product,
          image: productImages[product.imageKey],
          variants: (product.variants || []).map((variant) => ({
            ...variant,
            image:
              productImages[variant.imageKey] ||
              productImages[product.imageKey],
          })),
        };

        return (
          <ProductCard
            key={product.id}
            product={productWithImages}
            selectedVariantId={activeVariantId}
            quantity={currentQuantity}
            totalQuantity={totalQuantity}
            onVariantChange={(variantId) => {
              onVariantChange(product.id, variantId);
            }}
            onQuantityChange={(quantity) => {
              onQuantityChange(
                product.id,
                activeVariantId,
                quantity
              );
            }}
          />
        );
      })}
    </div>
  );
}

export default ProductGrid;
import BuilderSteps from "../BundleBuilder/BuilderSteps";
import ReviewPanel from "../ReviewPanel/ReviewPanel";
import useBundleBuilder from "../../../hooks/useBundleBuilder";

import "./BundleBuilder.css";



function BundleBuilder() {
  const {
    openStep,
    cameraProducts,
    productSelections,
    reviewItems,
    selectedCounts,
    totals,

    toggleStep,
    goToStep,
    changeVariant,
    changeProductQuantity,
    changeReviewQuantity,
    handleSave,
    handleCheckout,
  } = useBundleBuilder();

  return (
    <main className="bundle-builder">
      <div className="bundle-builder__container">
        <section className="bundle-builder__content">
          <BuilderSteps
            openStep={openStep}
            selectedCounts={selectedCounts}
            cameraProducts={cameraProducts}
            productSelections={
              productSelections
            }
            onToggleStep={toggleStep}
            onGoToStep={goToStep}
            onVariantChange={changeVariant}
            onQuantityChange={
              changeProductQuantity
            }
          />
        </section>

        <aside className="bundle-builder__sidebar">
          <div className="bundle-builder__review">
            <ReviewPanel
              items={reviewItems}
              originalTotal={
                totals.originalTotal
              }
              total={totals.total}
              savings={totals.savings}
              onQuantityChange={
                changeReviewQuantity
              }
              onCheckout={handleCheckout}
              onSave={handleSave}
            />
          </div>
        </aside>
      </div>
    </main>
  );
}

export default BundleBuilder;
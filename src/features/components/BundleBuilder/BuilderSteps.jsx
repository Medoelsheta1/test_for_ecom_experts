import AccordionStep from "../AccordionStep/AccordionStep";
import ProductGrid from "../ProductGrid/ProductGrid";

import Button from "../../../components/ui/Buttons/Button";

import cameraIcon from "../../../assets/icons/camera.svg";
import planIcon from "../../../assets/icons/plan.svg";
import sensorIcon from "../../../assets/icons/sensor.svg";
import protectionIcon from "../../../assets/icons/extra-protection.svg";

function BuilderSteps({
  openStep,
  selectedCounts,
  cameraProducts,
  productSelections,
  onToggleStep,
  onGoToStep,
  onVariantChange,
  onQuantityChange,
}) {
  return (
    <div className="bundle-builder__steps">
      <AccordionStep
        stepNumber={1}
        title="Choose your cameras"
        icon={cameraIcon}
        isOpen={openStep === 1}
        selectedCount={selectedCounts.cameras}
        onToggle={() => onToggleStep(1)}
      >
        <ProductGrid
          products={cameraProducts}
          productSelections={productSelections}
          onVariantChange={onVariantChange}
          onQuantityChange={onQuantityChange}
        />

        <div className="bundle-builder__next">
          <Button
            fullWidth
            onClick={() => onGoToStep(2)}
          >
            Next: Choose your plan
          </Button>
        </div>
      </AccordionStep>

      <AccordionStep
        stepNumber={2}
        title="Choose your plan"
        icon={planIcon}
        isOpen={openStep === 2}
        selectedCount={selectedCounts.plan}
        onToggle={() => onToggleStep(2)}
      >
        <p>
          Your selected plan appears in the review
          panel.
        </p>

        <div className="bundle-builder__next">
          <Button
            fullWidth
            onClick={() => onGoToStep(3)}
          >
            Next: Choose your sensors
          </Button>
        </div>
      </AccordionStep>

      <AccordionStep
        stepNumber={3}
        title="Choose your sensors"
        icon={sensorIcon}
        isOpen={openStep === 3}
        selectedCount={selectedCounts.sensors}
        onToggle={() => onToggleStep(3)}
      >
        <p>
          Your selected sensors appear in the review
          panel.
        </p>

        <div className="bundle-builder__next">
          <Button
            fullWidth
            onClick={() => onGoToStep(4)}
          >
            Next: Add extra protection
          </Button>
        </div>
      </AccordionStep>

      <AccordionStep
        stepNumber={4}
        title="Add extra protection"
        icon={protectionIcon}
        isOpen={openStep === 4}
        selectedCount={
          selectedCounts.protection
        }
        onToggle={() => onToggleStep(4)}
      >
        <p>
          Your selected accessories appear in the
          review panel.
        </p>
      </AccordionStep>
    </div>
  );
}

export default BuilderSteps;
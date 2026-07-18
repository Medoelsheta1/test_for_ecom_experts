import "./AccordionStep.css";

function AccordionStep({
  stepNumber,
  totalSteps = 4,
  title,
  icon,
  isOpen,
  selectedCount = 0,
  onToggle,
  children,
}) {
  return (
    <section
      className={`accordion-step ${isOpen ? "accordion-step--open" : ""}`}
    >
      <button
        type="button"
        className="accordion-step__header"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <div className="accordion-step__heading">
          <span className="accordion-step__number">
            STEP {stepNumber} OF {totalSteps}
          </span>
          <div className="line"></div>

          <div className="accordion-step__title-row">
            {icon && <img className="accordion-step__icon" src={icon} alt="" />}

            <h2 className="accordion-step__title">{title}</h2>
          </div>
        </div>

        <div className="accordion-step__state">
          {isOpen && (
            <span className="accordion-step__selected-count">
              {selectedCount} selected
            </span>
          )}

          <span
            className={`accordion-step__chevron ${
              isOpen ? "accordion-step__chevron--open" : ""
            }`}
          >
            ⌄
          </span>
        </div>
      </button>

      {isOpen && <div className="accordion-step__content">{children}</div>}
    </section>
  );
}

export default AccordionStep;

// src/components/filters/MoreFeature.jsx
import { useState, Children } from "react";

export default function MoreFeature({ children, label = "More Filters" }) {
  const [isOpen, setIsOpen] = useState(false);

  // Don't render if no children provided
  if (Children.count(children) === 0) return null;

  return (
    <>
      <button
        type="button"
        className="filter-toggle-btn"
        aria-expanded={isOpen}
        aria-controls="more-filters"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "− Less Filters" : "+ More Filters"}
      </button>

      {isOpen && (
        <div id="more-filters" className="more-filters-expanded">
          {children}
        </div>
      )}
    </>
  );
}

import React from "react";

function AccessibilityTools() {
  return (
    <div className="accessibility-tools">
      <h2>Barrierefreiheits-Tools</h2>
      <ul>
        <li>
          <button className="btn btn-secondary" onClick={() => alert("Vergrößerung aktiviert")}>
            Text vergrößern
          </button>
        </li>
        <li>
          <button className="btn btn-secondary" onClick={() => alert("Kontrastmodus aktiviert")}>
            Hoher Kontrast
          </button>
        </li>
        <li>
          <button className="btn btn-secondary" onClick={() => alert("Sprachausgabe aktiviert")}>
            Sprachausgabe
          </button>
        </li>
        <li>
          <button className="btn btn-secondary" onClick={() => alert("Text-to-Speech aktiviert")}>
            Text-to-Speech
          </button>
        </li>
      </ul>
    </div>
  );
}

export default AccessibilityTools;

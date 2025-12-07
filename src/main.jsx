import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";

import "./styles/base.css";
import "./styles/layout.css";
import "./styles/dashboard.css";
import "./styles/admin-layout.css";
import "./styles/components.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

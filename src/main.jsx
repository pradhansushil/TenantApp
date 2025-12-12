import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";

import "./styles/base.css";
import "./styles/layout.css";
import "./styles/dashboard.css";
import "./styles/admin-layout.css";
import "./styles/components.css";
import "./styles/tables.css";
import "./styles/modals.css";
import "./styles/filter.css";
import "./styles/hero.css";
import "./styles/gallery.css";
import "./styles/about.css";
import "./styles/header.css";
import "./styles/footer.css";
import "./styles/tenant-portal.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

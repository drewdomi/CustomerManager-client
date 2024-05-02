import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterCustomer from "./views/RegisterCustomer";
import SearchCustomer from "./views/SearchCustomer";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SearchCustomer />} />
        <Route path="*" element={<SearchCustomer />} />
        <Route path="/register" element={<RegisterCustomer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;


import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerRegister from "./components/CustomerRegister";
import CustomerSearch from "./components/CustomerSearch";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CustomerRegister />} />
        <Route path="/search" element={<CustomerSearch />} />
        <Route path="*" element={<CustomerRegister />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import CustomerSearch from "./components/CustomerSearch";
import RegisterCustomer from "./views/RegisterCustomer";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterCustomer />} />
        {/* <Route path="/search" element={<CustomerSearch />} /> */}
        <Route path="*" element={<RegisterCustomer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
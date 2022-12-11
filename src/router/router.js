import config from "../config";
import Cart from "../pages/Cart";
import Home from "../pages/Home";
import ProducDetailts from "../pages/ProducDetailts";
export const publicRoutes = [
  {
    path: config.configRoutes.home,
    component: Home,
  },
  {
    path: config.configRoutes.cart,
    component: Cart,
  },
  {
    path: config.configRoutes.productdetailts,
    component: ProducDetailts,
  },
];

export const privateRoutes = [];

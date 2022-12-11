// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { publicRoutes } from "./router";
// import MainLayout from "./layouts/MainLayout";
const App = () => {
  return (
    <div className="App">
      <button className="btn btn-primary">Test</button>
    </div>
  );
};
export default App;

// function App() {
//   return (
// <Router>
//   <div className="App">
//     <Routes>
//       {publicRoutes &&
//         publicRoutes.length > 0 &&
//         publicRoutes.map((route, index) => {
//           const Page = route.component;
//           return (
//             <Route
//               key={index}
//               path={route.path}
//               element={
//                 <MainLayout>
//                   <Page />
//                 </MainLayout>
//               }
//             />
//           );
//         })}
//     </Routes>
//   </div>
// </Router>
//   );
// }
// export default App;

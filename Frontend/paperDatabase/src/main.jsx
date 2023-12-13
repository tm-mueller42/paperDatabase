import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
//import reportWebVitals from "./reportWebVitals";

import Layout from "./Pages/Layout";
import Welcome from "./Pages/Welcome";
import ErrorPage from "./Pages/ErrorPage";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import MyPapers from "./Pages/MyPapers";
import AllPapers from "./Pages/AllPapers";
import PaperCreator from "./Pages/PaperCreator";
import PaperUpdater from "./Pages/PaperUpdater";

import "./index.css";

// import FilteredEmployeeList, {
//   loader as filterLoader,
// } from "./Pages/FilteredEmployeeList";

// import EmployeeSearcherTest, {
//   loader as searchLoader,
// } from "./Pages/EmployeeSearcherTest";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Welcome />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/papers/myPapers",
        element: <MyPapers />,
      },
      {
        path: "/papers/allPapers",
        element: <AllPapers />,
      },
      {
        path: "/paper/create",
        element: <PaperCreator />,
      },
      {
        path: "/paper/update/:id",
        element: <PaperUpdater />,
      },
      // {
      //   path:"/positions",
      //   element: <Positions/>,
      // },
      // {
      //   path: "/employees",
      //   element: <EmployeeList />,
      // },
      // {
      //   path:"/employeeSearch/:nameSearch",
      //   element: <EmployeeNameSearch/>,
      // },
      // {
      //   path:"/missing",
      //   element: <EmployeeListMissing />,
      // },
      // {
      //   path: "/table-test",
      //   element: <TableTest />,
      // },
      // {
      //   path: "/form-test",
      //   element: <FormTest />,
      // },
      // {
      //   path: "/equipment",
      //   element: <EquipmentList />,
      // },
      // {
      //   path: "/equipment/create",
      //   element: <EquipmentCreator />,
      // },
      // {
      //   path: "/equipment/update/:id",
      //   element: <EquipmentUpdater />,
      // }
      //,
      // {
      //   path:"/filteredEmployees/:position/:level",
      //   element: <FilteredEmployeeList />,
      //   loader: filterLoader,
      // },
      // {
      //   path:"/employees/:search",
      //   element: <EmployeeSearcherTest />,
      //   loader: searchLoader,
      // },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

//reportWebVitals();

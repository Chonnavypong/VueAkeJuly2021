import { h, resolveComponent } from "vue"; // เอาไว้ render code กรณีมีการแยกไฟล์ ต้องใช้ h และ resolveComponent function
import CategoryIndex from "./CategoryIndex";
import CategoryAdd from "./CategoryAdd";
import CategoryEdit from "./CategoryEdit";

const categoryRoutes = [
  {
    path: "category",
    name: "Category",
    component: {
      // กรณีที่แยก Code ออกมา render ไปที่ router-view
      render: () => h(resolveComponent("router-view")),
    },
    children: [
      {
        path: "",
        name: "CategoryIndex",
        component: CategoryIndex,
      },
      {
        path: "add",
        name: "CategoryAdd",
        component: CategoryAdd,
      },
      {
        path: ":id/edit", // route parameter :id ต้องมี : 
        name: "CategoryEdit",
        component: CategoryEdit,
      },
    ],
  },
];

export default categoryRoutes;

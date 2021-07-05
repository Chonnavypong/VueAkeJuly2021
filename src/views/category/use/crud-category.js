import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router";
import Swal from "sweetalert2"; // Alert Module แสดง alert
import { BASE_API_URL } from "../../../constants";

// use ขึ้นต้นเป้น reactive composition api
export function useAdd() {
  const name = ref("");
  const router = useRouter();

  const onSubmit = async () => {
    const response = await axios.post(`${BASE_API_URL}/api/category`, {
      name: name.value,
    });
    // alert(response.data.message);
    Swal.fire(response.data.message, "ผลการทำงาน", "success");
    router.replace({ name: "CategoryIndex" });
  };

  return { name, onSubmit };
}

export function useEdit() {
  const id = ref(0);
  const name = ref("");
  const router = useRouter();
  const route = useRoute();

  onMounted(() => {
    id.value = route.params.id; // id คือชื่อที่เราตั้งชื่อไว้ใน category-route
    alert(id.value);
    getCategoryById(id.value);
  });

  const getCategoryById = async (id) => {
    const response = await axios.get(`${BASE_API_URL}/api/category/${id}`);
    name.value = response.data.name;
  };

  const onSubmit = async () => {
    const response = await axios.put(`${BASE_API_URL}/api/category`, {
      id: id.value,
      name: name.value,
    });
    // alert(response.data.message);
    Swal.fire(response.data.message, "ผลการทำงาน", "success");
    router.replace({ name: "CategoryIndex" });
  };

  return { name, onSubmit };
}

export function useIndex() {
  const categories = ref([]); // ข้อมุลใน API เป็น array
  const errorMessage = ref("");
  const loading = ref(false);
  const page = ref(1); // 1 = หน้าที่ 1
  const totalPage = ref(0); // 0 = ยังไมมี เป็นค่าเริ่มต้น

  const getData = async (page) => {
    // Case 1 ใช้ if else และ try... catch...กรณี server (4xx, 5xx) มีปัญหา หรือติดต่อได้ 200 OK
    try {
      // 2xx
      loading.value = true;
      const response = await axios.get(
        `${BASE_API_URL}/api/category?page=${page}&page_size=10`
      );

      categories.value = response.data.data; //[{}] จาก api
      totalPage.value = response.data.last_page; //(last_page มาจาก backend)

      console.log(categories.value);
    } catch (error) {
      // 400, 500
      // console.log(error.response.data)
      errorMessage.value = "เกิดข้อผิดพลาด กรุณาลองใหม่";
    } finally {
      loading.value = false;
    }
  };

  onMounted(() => {
    getData(page.value); //เริ่มต้นหน้า 1
  });

  const deleteCategoryById = async (id) => {
    const isConfirm = window.confirm("แน่ใจว่าต้องการลบข้อมูลนี้");

    if (isConfirm === true) {
      const response = await axios.delete(`${BASE_API_URL}/api/category/${id}`);

      Swal.fire(response.data.message, "ผลการทำงาน", "success");
      history.go(0);
    }
  };

  return {
    categories,
    errorMessage,
    loading,
    deleteCategoryById,
    page,
    totalPage,
    getData,
  };
}

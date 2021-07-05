<template>
  <div class="container-fluid px-4">
    <h1>แก้ไขข้อมูล {{ name }}</h1>
    <div class="row">
      <div class="col-xl-6 col-md-6">
        <form @submit.prevent="onSubmit">
          <div class="mb-3">
            <label for="name" class="form-label">ชื่อประเภทสินค้า</label>
            <input v-model="name" type="text" class="form-control" id="name" />
            {{ name }}
          </div>
          <button type="submit" class="btn btn-primary">แก้ไข</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter, useRoute } from "vue-router"; // useRouter ใช้ตอนเปลี่ยน url, useRoute ให้ในการดึงค่า params
import Swal from "sweetalert2";
import { BASE_API_URL } from "../../constants";

export default {
  name: "CategoryEdit",

  setup() {
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
  },
};
</script>

<template>
  <div class="container-fluid px-4">
    <div class="row">
      <div class="col-xl-12 col-md-12">
        <h1>ประเภทสินค้า</h1>

        <!--- เพิ่มข้อมูลสินค้า -->>
        <router-link
          :to="{ CategoryAdd }"
          class="btn btn-primary"
        ></router-link>

        <div v-if="errorMessage" class="alert alert-danger" role="alert">
          {{ errorMessage }}
        </div>

        <!--- <table class="table" v-if="categories.length > 0"> หรือ จาก axios status code 200, status: 200-->
        <!--- spinner -->
        <div v-if="loading" class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>

        <table class="table" v-if="categories.length">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">name</th>
              <th scope="col">เครื่องมือ</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in categories" :key="item.id">
              <th scope="row">{{ item.id }}</th>
              <td>{{ item.name }}</td>
              <td>
                <!-- id: xx ใช้ตาม ใน category-route -->
                <router-link
                  :to="{ name: 'CategoryEdit', params: { id: item.id } }"
                >
                  แก้ไข
                </router-link>
                |
                <a href="#" @click.prevent="deleteCategoryById(item.id)">
                  ลบ
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";
import { BASE_API_URL } from "../../constants";
import Swal from "sweetalert2";

export default {
  name: "CategoryIndex",
  setup() {
    const categories = ref([]); // ข้อมุลใน API เป็น array
    const errorMessage = ref("");
    const loading = ref(false);

    const getData = async () => {
      // Case 1 ใช้ if else และ try... catch...กรณี server (4xx, 5xx) มีปัญหา หรือติดต่อได้ 200 OK
      try {
        // 2xx
        loading.value = true;
        const response = await axios.get(`${BASE_API_URL}/api/category`);

        categories.value = response.data; //[{}] จาก api

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
      getData();
    });

    const deleteCategoryById = async (id) => {
      const isConfirm = window.confirm("แน่ใจว่าต้องการลบข้อมูลนี้");

      if (isConfirm === true) {
        const response = await axios.delete(
          `${BASE_API_URL}/api/category/${id}`
        );

        Swal.fire(response.data.message, "ผลการทำงาน", "success");
        history.go(0);
      }
    };

    return { categories, errorMessage, loading, deleteCategoryById };
  },
};
</script>

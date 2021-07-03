<template>
  <div class="about">
    <h1>เกี่ยวกับเรา</h1>
    <p>{{ email }}</p>
    <a :href="googleUrl"> Google </a>
    <img :src="imgUrl.url" :alt="imgUrl.alt" v-if="isShow" />
    <button class="btn btn-info" @click="greet">Click Me</button>
    <br />
    <Logo />
  </div>
</template>

<script>
import Logo from "../components/Logo.vue";
import { ref, reactive, onMounted, onUnmounted } from "vue";

export default {
  name: "About",
  components: {
    Logo,
  },
  setup() {
    //ใช้ประกาศตัวแปร ตอนที่ component นี้ถูกเรียก สามารถ console ออกมาดูได้ก่อน
    // const email = ref("") // ให้ค่าเริ่มต้นของ email เป็นคาว่าง การใช้ ref หากค่าเปลี่ยน จะไป rerender ใหม่ ไปแสดงใน template
    const email = ref("cct@gmail.com");
    const googleUrl = ref("https://google.com");
    const imgUrl = reactive({
      // reactive รับตัวแปรเป็น Object
      url: "https://via.placeholder.com/100",
      alt: "My Image",
    });
    const isShow = ref(false);
    onMounted(() => {
      alert("Hello About Page");
    });
    onUnmounted(() => {
      alert("Bye About page");
    });
    const greet = () => {
      // alert("Hello Vue3");
      email.value = "john@gmail.com"; // assign ค่าตัวแปร ref ค่าใหม่ให้กับ email ต้องใช้ .value ้ดวยแต่ใน template ไม่ต้องมี email.value เพราะ vue เติม .value ให้อัตโนมัติ แต่ถ้าเป็น reactive ใช้เหมือน object ปรกติได้เลย

      isShow.value = !isShow.value;
    };
    return { email, googleUrl, imgUrl, isShow, greet }; // ต้อง return ไปให้ template นำไปแสดง
  },
};
</script>

<style scoped>
.about {
  color: red;
}
</style>

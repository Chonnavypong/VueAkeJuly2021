<template>
  <NavBar />
  <div id="layoutSidenav">
    <SideNav />
    <div id="layoutSidenav_content">
      <main>
        <!-- ช่องเจาะไว้เอา component มาใส่ ตัวนี้เป็นลูกของ Root // ใน App.vue
        อยู่คนละระดับถือว่าไม่ซ้ำ แต่หาก อยู่ในระดับเดียวกัน // ถือว่าซ้ำ
        ต้องตั้งชื้อให้มันด้วย -->
        <router-view />
      </main>
      <Footer />
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import SideNav from "../components/SideNav.vue";
import Footer from "../components/Footer.vue";

export default {
  name: "DashBoard",
  components: {
    NavBar,
    SideNav,
    Footer,
  },
};
</script>

<style></style>

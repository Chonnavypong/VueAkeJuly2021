<template>
  <div id="layoutSidenav_nav">
    <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
      <div class="sb-sidenav-menu">
        <div class="nav">
          <div class="sb-sidenav-menu-heading">Core</div>
          <router-link class="nav-link" to="/">
            <div class="sb-nav-link-icon">
              <i class="fas fa-tachometer-alt"></i>
            </div>
            หน้าหลัก
          </router-link>
          <router-link class="nav-link" :to="{ name: 'About' }">
            <div class="sb-nav-link-icon">
              <i class="fas fa-tachometer-alt"></i>
            </div>
            เกี่ยวกับเรา
          </router-link>

          <div class="sb-sidenav-menu-heading">เมนูหลัก</div>
          <router-link class="nav-link" :to="{ name: 'Product' }">
            <div class="sb-nav-link-icon">
              <i class="fas fa-chart-area"></i>
            </div>
            สินค้า
          </router-link>
          <router-link class="nav-link" :to="{ name: 'CategoryIndex' }">
            <div class="sb-nav-link-icon">
              <i class="fas fa-chart-area"></i>
            </div>
            ประเภทสินค้า
          </router-link>
        </div>
      </div>
      <div class="sb-sidenav-footer">
        <div class="small">Logged in as:</div>
        Start Bootstrap
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "SideNav",
};
</script>

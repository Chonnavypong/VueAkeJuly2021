<template>
  `
  <router-view />
</template>

<script>
import { useStore } from "vuex";
import { onMounted } from "vue";

export default {
  setup() {
    const store = useStore();

    // เรียก state ของ vuex อีกที หลังจากมีการ refresh หน้า ให้กลับมา แสดงใหม่
    onMounted(() => {
      store.dispatch("getProfile");
    });
  },
};
</script>

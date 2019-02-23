<template>
  <div class="plist-desp">
    <p class="plist-desp-p" :class="{'plist-desp-hide': toggleValue }">
      <slot></slot>
    </p>
    <img
      src="../assets/images/close_icon.png"
      alt
      @click="toggle"
      class="plist-desp-icon"
      v-if="toggleValue"
    >
    <img
      src="../assets/images/open_icon.png"
      alt
      @click="toggle"
      class="plist-desp-icon"
      v-else
    >
  </div>
</template>

<script>
export default {
  name: "c-toggle",
  props: {
    text: {
      type: String
    }
  },
  data() {
    return {
      toggleValue: true
    };
  },
  methods: {
    toggle() {
      this.toggleValue = !this.toggleValue;
    }
  }
};
</script>
<style lang="less" scoped>
.plist-desp {
  position: relative;
  width: 100%;
  padding: 12px;
  font-size: 16px;
}
.plist-desp-p {
  padding-right: 40px;
  line-height: 40px;
}
.plist-desp-icon {
  display: block;
  width: 24px;
  height: 24px;
  position: absolute;
  right: 10px;
  top: 10px;
}
.plist-desp-hide {
  overflow: hidden;
  height: 0.8rem;
}
</style>


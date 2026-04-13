<script setup lang="ts">
import SvgIcon from "../components/SvgIcon.vue";

const props = defineProps<{
  iconName: string;
}>();

const emit = defineEmits(["click"]);

const handleClick = () => {
  emit("click", props.iconName);
};
</script>

<template>
  <button
    class="button"
    :class="{ '--orange': iconName === 'AC', '--bigsize': iconName === '0' }"
    @click="handleClick"
  >
    <SvgIcon :name="iconName" />
  </button>
</template>

<style scoped lang="scss">
.button {
  min-width: 80px;
  max-width: 80px;
  min-height: 80px;
  max-height: 80px;
  background-color: #4b4b4b;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: #fff;
  border: none;
  padding: 0;
  border-radius: 20px;
  transition: all 0.3s ease;
  cursor: pointer;
  &:hover {
    background-color: #fff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    :deep(svg path) {
      fill: #4b4b4b;
    }
  }
}
.--orange {
  background-color: #ffbf00;
}

.--bigsize {
  min-width: 175px;
  max-width: 175px;
}
</style>

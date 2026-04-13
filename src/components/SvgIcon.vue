<script setup lang="ts">
import { ref, watchEffect } from "vue";

const props = defineProps<{
  name: string;
  folder?: string;
}>();

const iconHtml = ref<string>("");

// Загружаем все SVG иконки из папки assets/icons и её подпапок.
// query: '?raw' позволяет получить содержимое файла как строку
const icons = import.meta.glob("../assets/icons/**/*.svg", {
  query: "?raw",
  import: "default",
});

watchEffect(async () => {
  const path = props.folder 
    ? `../assets/icons/${props.folder}/${props.name}.svg`
    : `../assets/icons/${props.name}.svg`;
    
  if (icons[path]) {
    try {
      // Подгружаем содержимое нужной иконки
      const svg = await icons[path]();
      iconHtml.value = svg as string;
    } catch (error) {
      console.error(`Ошибка при загрузке иконки ${props.name}:`, error);
      iconHtml.value = "";
    }
  } else {
    console.warn(`Иконка ${props.name} не найдена по пути ${path}`);
    iconHtml.value = "";
  }
});
</script>

<template>
  <span v-if="iconHtml" v-html="iconHtml" class="svg-icon" :class="name"></span>
</template>

<style scoped>
.svg-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

/* Наследуем цвет шрифта для возможности стилизации через text-color (например text-red-500) */
.svg-icon :deep(svg) {
  fill: currentColor;
}
</style>

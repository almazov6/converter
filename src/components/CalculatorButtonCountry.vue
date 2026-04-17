<script setup lang="ts">
const props = defineProps<{
  iconName: string;
  currency: string;
}>();

const getFlagUrl = (flagName: string) => {
  return new URL(`../assets/icons/flags/${flagName}.png`, import.meta.url).href;
};
</script>

<template>
  <div class="button-country">
    <div class="button-country__icon">
      <img :src="getFlagUrl(props.iconName)" :alt="props.currency" />
    </div>
    <div class="button-country__currency">{{ props.currency }}</div>
  </div>
</template>

<style scoped lang="scss">
.button-country {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  max-width: 70px;
  min-width: 70px;
  gap: 8px;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px 0 0 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f0f0f0;
  }

  &__icon {
    width: 24px;
    height: 24px;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  &__currency {
    font-size: 16px;
    font-weight: 600;
    color: #000;
  }
}
</style>

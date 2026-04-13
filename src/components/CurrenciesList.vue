<script setup lang="ts">
import { CURRENCIES, type CurrencyInfo } from "../constants/currencies";

const props = defineProps<{
  active: boolean;
}>();

const getFlagUrl = (flagName: string) => {
  return new URL(`../assets/icons/flags/${flagName}.png`, import.meta.url).href;
};

const emit = defineEmits<{
  (e: 'select', currency: CurrencyInfo): void;
}>();
</script>

<template>
  <div class="currencies-list">
    <button
      v-for="currency in CURRENCIES"
      :key="currency.code"
      class="currencies-list__item"
      @click="emit('select', currency)"
    >
      <div class="currencies-list__item-left">
        <div class="currencies-list__item-icon">
          <img :src="getFlagUrl(currency.flagName)" :alt="currency.name" />
        </div>
        <div class="currencies-list__item-name">{{ currency.name }}</div>
      </div>
      <div class="currencies-list__item-currency">{{ currency.code }}</div>
    </button>
  </div>
</template>

<style scoped lang="scss">
.currencies-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 5px 10px 5px;
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    width: 100%;
    transition: all 0.3s ease;
    &:focus {
      background-color: #f5f5f5;
    }
    &:hover {
      background-color: #f5f5f5;
    }
  }
  &__item-left {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  &__item-icon {
    width: 24px;
    height: 24px;
  }
  &__item-name {
    font-size: 16px;
    font-weight: 400;
    color: #000;
  }
  &__item-currency {
    font-size: 16px;
    font-weight: 600;
    color: #000;
  }
}
</style>

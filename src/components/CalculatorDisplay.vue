<script setup lang="ts">
import { ref } from "vue";
import { NInput, NDrawer, NDrawerContent } from "naive-ui";
import CalculatorButtonCountry from "./CalculatorButtonCountry.vue";
import CurrenciesList from "./CurrenciesList.vue";
import { CURRENCIES, type CurrencyInfo } from "../constants/currencies";

const props = defineProps<{
  fromValue: string;
  toValue: string;
  activeField: "from" | "to";
  fromCurrency: CurrencyInfo;
  toCurrency: CurrencyInfo;
}>();

const emit = defineEmits<{
  (e: "update:activeField", value: "from" | "to"): void;
  (e: "update:fromCurrency", value: CurrencyInfo): void;
  (e: "update:toCurrency", value: CurrencyInfo): void;
}>();

const active = ref(false);
const placement = ref("bottom");

const pickingFor = ref<"from" | "to">("from");

const openCurrenciesList = (type: "from" | "to") => {
  pickingFor.value = type;
  active.value = true;
};

const handleCurrencySelect = (currency: CurrencyInfo) => {
  if (pickingFor.value === "from") {
    emit("update:fromCurrency", currency);
  } else {
    emit("update:toCurrency", currency);
  }
  active.value = false;
};

const setActiveField = (field: "from" | "to") => {
  emit("update:activeField", field);
};
</script>

<template>
  <div class="display">
    <div
      class="display__input"
      :class="{ 'display__input--active': activeField === 'from' }"
      @click="setActiveField('from')"
    >
      <CalculatorButtonCountry
        :iconName="fromCurrency.flagName"
        :currency="fromCurrency.code"
        @click.stop="openCurrenciesList('from')"
      />
      <n-input
        type="text"
        size="large"
        readonly
        style="font-size: 48px; text-align: right"
        placeholder="0"
        :value="fromValue"
        class="custom-input"
        @focus="setActiveField('from')"
      />
    </div>
    <div
      class="display__input"
      :class="{ 'display__input--active': activeField === 'to' }"
      @click="setActiveField('to')"
    >
      <CalculatorButtonCountry
        :iconName="toCurrency.flagName"
        :currency="toCurrency.code"
        @click.stop="openCurrenciesList('to')"
      />
      <n-input
        type="text"
        size="large"
        readonly
        style="font-size: 48px; text-align: right"
        placeholder="0"
        :value="toValue"
        class="custom-input"
        @focus="setActiveField('to')"
      />
    </div>
  </div>
  <n-drawer v-model:show="active" :width="502" :placement="placement">
    <n-drawer-content title="Выбери валюту">
      <CurrenciesList :active="active" @select="handleCurrencySelect" />
    </n-drawer-content>
  </n-drawer>
</template>

<style scoped lang="scss">
.display {
  display: flex;
  flex-direction: column;
  padding: 0 16px;
  gap: 16px;
  &__input {
    display: flex;
    align-items: center;
    border: 2px solid transparent;
    border-radius: 12px;
    padding: 4px 8px;
    transition: all 0.2s ease;
    cursor: text;

    &--active {
      border-color: #18a058; // Цвет темы Naive UI (зеленый)
      background-color: #f6fffa;
    }
  }
}

:deep(.custom-input) {
  .n-input {
    background-color: transparent !important;
  }
  .n-input__border {
    border: none !important;
  }
  .n-input__state-border {
    border: none !important;
    box-shadow: none !important;
  }
  input {
    cursor: pointer;
  }
}
</style>

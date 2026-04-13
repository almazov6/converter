<script setup lang="ts">
import { ref, watch } from "vue";
import { NInputNumber } from "naive-ui";
import CalculatorKeypad from "./components/CalculatorKeypad.vue";
import CalculatorDisplay from "./components/CalculatorDisplay.vue";
import { CURRENCIES, type CurrencyInfo } from "./constants/currencies";

const fromValue = ref("0");
const toValue = ref("0");
const activeField = ref<"from" | "to">("from");
const rate = ref(92.5); // Примерный курс

const fromCurrency = ref<CurrencyInfo>(CURRENCIES[0]);
const toCurrency = ref<CurrencyInfo>(CURRENCIES[1]);

// Безопасное вычисление математического выражения
const evaluate = (expr: string): number => {
  try {
    // Очищаем выражение от всего, кроме цифр и операторов
    const sanitized = expr.replace(/[^-+*/.0-9]/g, "");
    if (!sanitized) return 0;
    // Используем Function для вычисления (безопасно после очистки)
    return new Function(`return ${sanitized}`)() || 0;
  } catch {
    return 0;
  }
};

const convert = (val: string, direction: "from" | "to") => {
  const num = evaluate(val);
  // rate всегда означает "сколько единиц ВТОРОЙ валюты в ОДНОЙ единице АКТИВНОЙ"
  if (direction === "from") {
    toValue.value = (num * rate.value).toFixed(2);
  } else {
    fromValue.value = (num * rate.value).toFixed(2);
  }
};

// При переключении активного поля инвертируем курс для удобства
watch(activeField, (newField, oldField) => {
  if (newField !== oldField) {
    rate.value = parseFloat((1 / rate.value).toFixed(4));
  }
});

// Пересчитываем значения при изменении курса или валют
watch([rate, fromCurrency, toCurrency], () => {
  const currentVal =
    activeField.value === "from" ? fromValue.value : toValue.value;
  convert(currentVal, activeField.value);
});

const handleKeyClick = (key: string) => {
  const currentVal = activeField.value === "from" ? fromValue : toValue;

  if (key === "AC") {
    fromValue.value = "0";
    toValue.value = "0";
    return;
  }

  if (key === "equals") {
    const res = evaluate(currentVal.value);
    currentVal.value = res.toString();
    convert(currentVal.value, activeField.value);
    return;
  }

  if (key === "delete") {
    currentVal.value = currentVal.value.slice(0, -1) || "0";
  } else if (key === "dot") {
    if (!currentVal.value.includes(".") || /[+*/-]/.test(currentVal.value.split(/[+*/-]/).pop() || "")) {
       // Если последняя часть выражения не содержит точку
       const parts = currentVal.value.split(/[+*/-]/);
       if (!parts[parts.length - 1].includes(".")) {
          currentVal.value += ".";
       }
    }
  } else if (key === "add" || key === "subtract" || key === "multiply" || key === "divide") {
    const ops: Record<string, string> = { add: "-", subtract: "+", multiply: "*", divide: "/" };
    const lastChar = currentVal.value.slice(-1);
    if (/[+*/-]/.test(lastChar)) {
      currentVal.value = currentVal.value.slice(0, -1) + ops[key];
    } else {
      currentVal.value += ops[key];
    }
  } else if (key === "procent") {
    const res = evaluate(currentVal.value) / 100;
    currentVal.value = res.toString();
  } else if (!isNaN(Number(key))) {
    if (currentVal.value === "0") {
      currentVal.value = key;
    } else {
      currentVal.value += key;
    }
  }

  // После каждого изменения пересчитываем другое поле
  convert(currentVal.value, activeField.value);
};
</script>

<template>
  <div class="app">
    <div class="app__header">
      <nav class="app__nav">
        <div class="app__nav-title">Конвертер</div>
      </nav>
      <div class="app__rate-control">
        <div class="app__rate-label">
          1 {{ activeField === "from" ? fromCurrency.code : toCurrency.code }} =
        </div>
        <n-input-number
          v-model:value="rate"
          :precision="4"
          :min="0"
          size="small"
          class="app__rate-input"
          :show-button="false"
        />
        <div class="app__rate-label">
          {{ activeField === "from" ? toCurrency.code : fromCurrency.code }}
        </div>
      </div>
    </div>
    <div class="app__display">
      <CalculatorDisplay
        v-model:activeField="activeField"
        v-model:fromCurrency="fromCurrency"
        v-model:toCurrency="toCurrency"
        :fromValue="fromValue"
        :toValue="toValue"
      />
    </div>
    <div class="app__keypad">
      <CalculatorKeypad @on-click="handleKeyClick" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.app {
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: space-between;
  padding-bottom: 16px;
  &__header {
    margin-top: 60px;
  }
  &__nav {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    &-title {
      display: inline-block;
      width: 100%;
      font-size: 18px;
      font-weight: 600;
      text-align: center;
    }
  }
  &__rate-control {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 8px 16px;
    background: #f9f9f9;
    border-radius: 20px;
    width: fit-content;
    margin: 0 auto;
  }
  &__rate-label {
    font-size: 14px;
    font-weight: 500;
    color: #666;
  }
  &__rate-input {
    width: 100px;
    :deep(.n-input) {
      background-color: transparent;
      --n-border: none !important;
      --n-border-hover: none !important;
      --n-border-focus: none !important;
      --n-box-shadow-focus: none !important;
    }
    :deep(input) {
      text-align: center;
      font-weight: 700;
      font-size: 14px;
    }
  }
  &__keypad {
    margin: 0 auto;
  }
}
</style>

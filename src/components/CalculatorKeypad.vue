<script setup lang="ts">
import CalculatorButton from "./CalculatorButton.vue";

const emit = defineEmits(["on-click"]);

const buttons = [
  ["AC", "procent", "delete", "divide"],
  ["7", "8", "9", "multiply"],
  ["4", "5", "6", "subtract"],
  ["1", "2", "3", "add"],
  ["0", "dot", "equals"],
];

const handleClick = (iconName: string) => {
  emit("on-click", iconName);
};
</script>

<template>
  <div class="keypad">
    <div class="keypad__row">
      <CalculatorButton icon-name="AC" @click="handleClick" />
      <CalculatorButton icon-name="procent" @click="handleClick" />
      <CalculatorButton icon-name="delete" @click="handleClick" />
      <CalculatorButton icon-name="divide" @click="handleClick" />
    </div>
    <div class="keypad__row">
      <CalculatorButton icon-name="7" @click="handleClick" />
      <CalculatorButton icon-name="8" @click="handleClick" />
      <CalculatorButton icon-name="9" @click="handleClick" />
      <CalculatorButton icon-name="multiply" @click="handleClick" />
    </div>
    <div class="keypad__row">
      <CalculatorButton icon-name="4" @click="handleClick" />
      <CalculatorButton icon-name="5" @click="handleClick" />
      <CalculatorButton icon-name="6" @click="handleClick" />
      <CalculatorButton icon-name="subtract" @click="handleClick" />
    </div>
    <div class="keypad__row">
      <CalculatorButton icon-name="1" @click="handleClick" />
      <CalculatorButton icon-name="2" @click="handleClick" />
      <CalculatorButton icon-name="3" @click="handleClick" />
      <CalculatorButton icon-name="add" @click="handleClick" />
    </div>
    <div class="keypad__row">
      <CalculatorButton icon-name="0" @click="handleClick" />
      <CalculatorButton icon-name="dot" @click="handleClick" />
      <CalculatorButton icon-name="equals" @click="handleClick" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.keypad {
  display: flex;
  flex-direction: column;
  gap: 16px;
  &__row {
    display: flex;
    gap: 16px;
  }
}
</style>

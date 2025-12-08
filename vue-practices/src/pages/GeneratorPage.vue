<template>
  <div class="generator-page">
    <h1>Генератор палитры</h1>

    <ColorPalette
      :colors="colors"
      :lockedColors="lockedColors"
      @toggle-lock="toggleLock"
    />

    <button @click="generatePalette">Сгенерировать новую палитру</button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ColorPalette from "../components/ColorPalette.vue";
import { usePaletteStore } from "../store/paletteStore.js";

const paletteStore = usePaletteStore();

const colors = ref([]);
const lockedColors = ref([]);
const paletteSize = ref(5);

function randomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function generatePalette() {
  for (let i = 0; i < paletteSize.value; i++) {
    if (!lockedColors.value[i]) {
      colors.value[i] = randomColor();
    }
  }

  paletteStore.setPalette(colors.value, lockedColors.value);
}

function toggleLock(index) {
  lockedColors.value[index] = !lockedColors.value[index];
  paletteStore.setPalette(colors.value, lockedColors.value);
}

onMounted(() => {
  paletteStore.loadPalette();

  if (paletteStore.colors.length) {
    colors.value = [...paletteStore.colors];
    lockedColors.value = [...paletteStore.lockedColors];
    paletteSize.value = paletteStore.paletteSize;
  } else {
    colors.value = Array.from({ length: paletteSize.value }, () => randomColor());
    lockedColors.value = Array(paletteSize.value).fill(false);
    paletteStore.setPalette(colors.value, lockedColors.value);
  }
});
</script>

<style scoped>
.generator-page {
  padding: 20px;
  max-width: 900px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

button {
  display: block;
  margin: 30px auto;
  padding: 12px 24px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
}

button:hover {
  background: #0056b3;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
}
</style>
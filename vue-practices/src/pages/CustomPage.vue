<template>
  <div class="custom-page">
    <h1>Палитра по базовому цвету</h1>

    <input type="color" v-model="baseColor" />

    <button @click="generateFromBase">Сгенерировать</button>

    <ColorPalette
      :colors="colors"
      :lockedColors="lockedColors"
      @toggle-lock="toggleLock"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import ColorPalette from "../components/ColorPalette.vue";
import { usePaletteStore } from "../store/paletteStore.js";

const paletteStore = usePaletteStore();

const baseColor = ref("#ff0000");
const colors = ref([]);
const lockedColors = ref([]);

function shade(col, percent) {
  let R = parseInt(col.substring(1, 3), 16);
  let G = parseInt(col.substring(3, 5), 16);
  let B = parseInt(col.substring(5, 7), 16);

  R = parseInt((R * (100 + percent)) / 100);
  G = parseInt((G * (100 + percent)) / 100);
  B = parseInt((B * (100 + percent)) / 100);

  return (
    "#" +
    (R < 255 ? R : 255).toString(16).padStart(2, "0") +
    (G < 255 ? G : 255).toString(16).padStart(2, "0") +
    (B < 255 ? B : 255).toString(16).padStart(2, "0")
  );
}

function generateFromBase() {
  colors.value = [
    shade(baseColor.value, -40),
    shade(baseColor.value, -20),
    baseColor.value,
    shade(baseColor.value, 20),
    shade(baseColor.value, 40)
  ];

  lockedColors.value = [false, false, false, false, false];

  paletteStore.setPalette(colors.value, lockedColors.value);
}

function toggleLock(index) {
  lockedColors.value[index] = !lockedColors.value[index];
  paletteStore.setPalette(colors.value, lockedColors.value);
}
</script>

<style scoped>
.export-page {
  padding: 20px;
  max-width: 700px;
  margin: auto;
}

h1, h2, h3 {
  color: #333;
  margin-bottom: 20px;
}

section {
  margin: 40px 0;
  padding: 25px;
  background: #f8f9fa;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

button {
  display: block;
  margin: 15px 0;
  padding: 10px 20px;
  background: #6c757d;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

button:hover {
  background: #5a6268;
  transform: translateY(-1px);
}

textarea {
  width: 100%;
  height: 150px;
  margin-top: 10px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: monospace;
  font-size: 14px;
  resize: vertical;
  background: white;
}

hr {
  margin: 40px 0;
  border: none;
  border-top: 1px solid #ddd;
}

input[type="file"] {
  display: block;
  margin: 15px 0;
  padding: 10px;
  border: 2px dashed #dee2e6;
  border-radius: 8px;
  width: 100%;
  cursor: pointer;
}

input[type="file"]:hover {
  border-color: #007bff;
  background: #f8f9fa;
}
</style>
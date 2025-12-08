<template>
  <div class="export-page">
    <h1>Импорт / Экспорт палитры</h1>

    <h2>Текущая палитра</h2>
    <ColorPalette :colors="palette" :lockedColors="[]" />

    <!-- Экспорт -->
    <section>
      <h3>Экспорт JSON</h3>
      <button @click="exportJSON">Скачать JSON</button>

      <h3>Экспорт CSS Variables</h3>
      <button @click="generateCSS">Сгенерировать CSS</button>
      <textarea v-model="cssOutput" readonly></textarea>
    </section>

    <hr />

    <!-- Импорт -->
    <section>
      <h3>Импорт JSON</h3>
      <input type="file" @change="importJSON" accept="application/json" />
    </section>

    <ColorPalette
      v-if="imported.length"
      :colors="imported"
      :lockedColors="[]"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { usePaletteStore } from "../store/paletteStore.js";
import ColorPalette from "../components/ColorPalette.vue";

const paletteStore = usePaletteStore();

const palette = ref([]);
const cssOutput = ref("");
const imported = ref([]);

onMounted(() => {
  paletteStore.loadPalette();
  palette.value = [...paletteStore.colors];
});

function exportJSON() {
  const data = JSON.stringify(palette.value, null, 2);
  const blob = new Blob([data], { type: "application/json" });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "palette.json";
  a.click();

  URL.revokeObjectURL(url);
}

function generateCSS() {
  cssOutput.value = palette.value
    .map((c, i) => `--color-${i + 1}: ${c};`)
    .join("\n");
}

function importJSON(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (Array.isArray(data)) {
        imported.value = data;
      }
    } catch {
      alert("Ошибка чтения файла");
    }
  };

  reader.readAsText(file);
}
</script>

<style scoped>
.export-page {
  padding: 20px;
  max-width: 700px;
  margin: auto;
}

textarea {
  width: 100%;
  height: 150px;
  margin-top: 10px;
}
</style>

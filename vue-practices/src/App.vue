<template>
  <div class="app">
    <h1>Генератор палитр</h1>

    <div class="controls">
      <button @click="generateColors">Генерировать палитру (пробел)</button>
      
      <div class="palette-size">
        <label>Количество цветов:</label>
        <button 
          v-for="size in [3, 5, 7]" 
          :key="size"
          @click="setPaletteSize(size)"
          :class="{ active: paletteSize === size }"
        >
          {{ size }}
        </button>
      </div>
      
      <div class="format-toggle">
        <label>Формат:</label>
        <button 
          @click="colorFormat = 'HEX'"
          :class="{ active: colorFormat === 'HEX' }"
        >
          HEX
        </button>
        <button 
          @click="colorFormat = 'RGB'"
          :class="{ active: colorFormat === 'RGB' }"
        >
          RGB
        </button>
      </div>
    </div>
    
    <div class="palette">
      <ColorCard 
        v-for="(color, index) in colors" 
        :key="index"
        :color="color"
        :format="colorFormat"
        :isLocked="lockedColors[index]"
        @lock="toggleLock(index)"
      />
    </div>
    <PreviewMockup :colors="colors" />
  </div>
</template>

<script setup>
  import { ref, watch, onMounted, onUnmounted } from 'vue';
  import ColorCard from './components/ColorCard.vue';
  import { generateHarmoniousPalette } from './utils/colorUtils.js';
  import PreviewMockup from './components/PreviewMockup.vue';

  const colors = ref([]);
  const lockedColors = ref([]);
  const paletteSize = ref(5); 
  const colorFormat = ref('HEX'); 

  function generateColors() {
    if (colors.value.length === 0) {
      colors.value = generateHarmoniousPalette(paletteSize.value);
      lockedColors.value = Array(paletteSize.value).fill(false);
    } else {
      const newPalette = generateHarmoniousPalette(paletteSize.value);
      colors.value = colors.value.map((color, index) => 
        lockedColors.value[index] ? color : newPalette[index]
      );
    }
    savePalette();
  }

  function setPaletteSize(size) {
    paletteSize.value = size;
    colors.value = generateHarmoniousPalette(size);
    lockedColors.value = Array(size).fill(false);
    savePalette();
  }

  function toggleLock(index) {
    lockedColors.value[index] = !lockedColors.value[index];
    savePalette();
  }

  function savePalette() {
    const data = {
      colors: colors.value,
      lockedColors: lockedColors.value,
      paletteSize: paletteSize.value,
      colorFormat: colorFormat.value
    };
    localStorage.setItem('colorPalette', JSON.stringify(data));
  }

  function loadPalette() {
    const saved = localStorage.getItem('colorPalette');
    if (saved) {
      const data = JSON.parse(saved);
      colors.value = data.colors || [];
      lockedColors.value = data.lockedColors || [];
      paletteSize.value = data.paletteSize || 5;
      colorFormat.value = data.colorFormat || 'HEX';
    } else {
      generateColors();
    }
  }

  function handleKeyPress(event) {
    if (event.code === 'Space' && event.target.tagName !== 'INPUT') {
      event.preventDefault();
      generateColors();
    }
  }

  onMounted(() => {
    loadPalette();
    window.addEventListener('keydown', handleKeyPress);
  });

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeyPress);
  });

  watch(colorFormat, savePalette);
</script>

<style scoped>
  .app {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
  }

  h1 {
    text-align: center;
    margin-bottom: 30px;
  }

  .controls {
    display: flex;
    gap: 20px;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    flex-wrap: wrap;
  }

  .palette-size, .format-toggle {
    display: flex;
    gap: 10px;
    align-items: center;
  }

  button {
    padding: 10px 20px;
    border: 2px solid #ddd;
    border-radius: 8px;
    background: white;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s;
  }

  button:hover {
    background: #f0f0f0;
  }

  button.active {
    background: #42b883;
    color: white;
    border-color: #42b883;
  }

  .palette {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
  }
</style>

<template>
  <div class="palette-wrapper">
    <div
      v-for="(color, index) in colors"
      :key="index"
      class="color-item"
      :style="{ backgroundColor: color }"
    >
      <div class="color-info">
        <span>{{ color }}</span>
        <button class="lock-btn" @click="$emit('toggle-lock', index)">
          <span v-if="lockedColors[index]">🔒</span>
          <span v-else>🔓</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  colors: {
    type: Array,
    required: true
  },
  lockedColors: {
    type: Array,
    required: true
  }
});
</script>

<style scoped>
.palette-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 30px;
  justify-content: center;
}

.color-item {
  width: 120px;
  height: 140px;
  border-radius: 10px;
  position: relative;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  color: white;
  font-weight: bold;
  padding: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;
}

.color-item:hover {
  transform: translateY(-5px);
}

.color-info {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(0, 0, 0, 0.4);
  padding: 8px;
  border-radius: 6px;
  backdrop-filter: blur(5px);
}

.lock-btn {
  background: rgba(255, 255, 255, 0.25);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
  padding: 5px 10px;
  font-size: 16px;
  transition: all 0.2s;
}

.lock-btn:hover {
  background: rgba(255, 255, 255, 0.4);
}

@media (max-width: 768px) {
  .palette-wrapper {
    gap: 10px;
  }
  
  .color-item {
    width: 100px;
    height: 120px;
  }
  
  .color-info {
    flex-direction: column;
    gap: 5px;
  }
  
  .color-info span {
    font-size: 12px;
    text-align: center;
  }
}
</style>
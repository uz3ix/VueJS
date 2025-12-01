<template>
  <div class="preview-container">
    <h3>Превью палитры</h3>
    
    <div class="theme-toggle">
      <button class="switch-theme" @click="darkMode = !darkMode">
        {{ darkMode ? 'Светлый' : 'Тёмный' }}
      </button>
    </div>

    <div class="mockup" :class="{ dark: darkMode }">
      <h1 :style="{ color: colors[0] }">Заголовок</h1>
      
      <div class="card" :style="{ borderColor: colors[1] }">
        <h3 :style="{ color: colors[1] }">Карточка</h3>
        <p>Пример текста в карточке с использованием вашей палитры.</p>
      </div>
      
      <button 
        class="preview-btn"
        :style="{ 
          backgroundColor: colors[2], 
          color: '#fff' 
        }"
      >
        Кнопка
      </button>
    </div>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  defineProps({
    colors: {
      type: Array,
      required: true
    }
  })

  const darkMode = ref(false)
</script>

<style scoped>
  .preview-container {
    margin-top: 40px;
    padding: 20px;
  }

  h3 {
    text-align: center;
    margin-bottom: 20px;
  }

  .theme-toggle {
    text-align: center;
    margin-bottom: 20px;
  }

  .mockup {
    background: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transition: all 0.3s;
  }

  .mockup.dark {
    background: #1a1a1a;
    color: #fff;
  }

  .card {
    border: 2px solid;
    border-radius: 8px;
    padding: 20px;
    margin: 20px 0;
  }

  .preview-btn {
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
  }

  .switch-theme {
    padding: 8px 16px;
    border: 2px solid #ddd;
    border-radius: 8px;
    background: white;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s;
  }
  .switch-theme:hover {
    background: #f0f0f0;
    transform: translateY(-2px);
  }
</style>

<template>
  <div id="app">
    <nav class="navbar">
      <router-link to="/">Генератор</router-link>
      <router-link to="/custom">Моя палитра</router-link>
      <router-link to="/export">Импорт / Экспорт</router-link>
    </nav>

    <router-view />
  </div>
</template>
<style>
#app {
  font-family: Arial, sans-serif;
}

.navbar {
  display: flex;
  gap: 20px;
  padding: 15px;
  border-bottom: 1px solid #ddd;
  margin-bottom: 30px;
  background: #f8f9fa;
}

.navbar a {
  text-decoration: none;
  color: #333;
  padding: 8px 16px;
  border-radius: 4px;
  transition: all 0.3s;
}

.navbar a:hover {
  background: #e9ecef;
}

.navbar a.router-link-active {
  background: #007bff;
  color: white;
  font-weight: bold;
}
</style>

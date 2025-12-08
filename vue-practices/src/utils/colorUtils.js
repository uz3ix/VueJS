// ==========================================
// БАЗОВЫЕ ФУНКЦИИ КОНВЕРТАЦИИ
// ==========================================

export function generateRandomHex() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
}

export function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgb(${r}, ${g}, ${b})`
}

export function hexToHsl(hex) {
  let r = parseInt(hex.slice(1, 3), 16) / 255
  let g = parseInt(hex.slice(3, 5), 16) / 255
  let b = parseInt(hex.slice(5, 7), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h, s, l = (max + min) / 2

  if (max === min) {
    h = s = 0 // ахроматический
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }

  return { 
    h: Math.round(h * 360), 
    s: Math.round(s * 100), 
    l: Math.round(l * 100) 
  }
}

export function hslToHex(h, s, l) {
  // Нормализуем значения
  h = h % 360
  if (h < 0) h += 360
  s = Math.max(0, Math.min(100, s)) / 100
  l = Math.max(0, Math.min(100, l)) / 100

  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs((h / 60) % 2 - 1))
  const m = l - c / 2

  let r = 0, g = 0, b = 0

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x
  }

  const toHex = (val) => {
    const hex = Math.round((val + m) * 255).toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

// ==========================================
// ГЕНЕРАЦИЯ ПАЛИТР (СЛУЧАЙНАЯ)
// ==========================================

export function generateHarmoniousPalette(count = 5) {
  const baseHue = Math.random() * 360
  return Array.from({ length: count }, (_, i) => {
    const hue = (baseHue + i * 30) % 360
    const saturation = 60 + Math.random() * 30
    const lightness = 50 + Math.random() * 20
    return hslToHex(hue, saturation, lightness)
  })
}

// ==========================================
// ГЕНЕРАЦИЯ НА ОСНОВЕ БАЗОВОГО ОТТЕНКА
// ==========================================

// Аналогичная палитра (соседние оттенки на круге)
export function generateAnalogous(baseHue, count = 5) {
  const colors = []
  const step = 30 // шаг в градусах
  const start = -(Math.floor(count / 2) * step) // центрируем вокруг базового

  for (let i = 0; i < count; i++) {
    const hue = (baseHue + start + i * step) % 360
    const sat = 65 + Math.random() * 15
    const light = 50 + Math.random() * 20
    colors.push(hslToHex(hue, sat, light))
  }

  return colors
}

// Монохромная палитра (один оттенок, разная яркость)
export function generateMonochromatic(baseHue, count = 5) {
  const colors = []
  
  for (let i = 0; i < count; i++) {
    const light = 15 + (i * 70 / (count - 1)) // от тёмного к светлому
    const sat = 70 - (Math.abs(i - count / 2) * 5) // больше насыщенности в середине
    colors.push(hslToHex(baseHue, sat, light))
  }

  return colors
}

// Триада (3 цвета через 120°)
export function generateTriadic(baseHue, count = 3) {
  const colors = []
  const angles = [0, 120, 240] // триада

  for (let i = 0; i < count; i++) {
    const hue = (baseHue + angles[i % 3]) % 360
    const sat = 70 + Math.random() * 15
    const light = 50 + Math.random() * 15
    colors.push(hslToHex(hue, sat, light))
  }

  // Если нужно больше 3, добавляем вариации
  while (colors.length < count) {
    const baseIndex = colors.length % 3
    const hue = (baseHue + angles[baseIndex]) % 360
    const sat = 60 + Math.random() * 20
    const light = 40 + Math.random() * 30
    colors.push(hslToHex(hue, sat, light))
  }

  return colors
}

// Комплементарная (противоположные цвета)
export function generateComplementary(baseHue, count = 2) {
  const colors = []
  
  // Основной цвет
  colors.push(hslToHex(baseHue, 70, 50))
  
  // Комплементарный (противоположный)
  colors.push(hslToHex((baseHue + 180) % 360, 70, 50))

  // Если нужно больше цветов, добавляем вариации
  while (colors.length < count) {
    const isBase = colors.length % 2 === 0
    const hue = isBase ? baseHue : (baseHue + 180) % 360
    const sat = 60 + Math.random() * 25
    const light = 35 + Math.random() * 35
    colors.push(hslToHex(hue, sat, light))
  }

  return colors
}

// ==========================================
// ГЕНЕРАЦИЯ ПО НАСТРОЕНИЮ
// ==========================================

export function generateByMood(mood, count = 5) {
  const moods = {
    calm: { // Спокойные (пастельные, холодные)
      hueRange: [180, 240], // Синие, голубые
      satRange: [30, 50],
      lightRange: [60, 80]
    },
    energetic: { // Энергичные (яркие, тёплые)
      hueRange: [0, 60], // Красные, оранжевые, жёлтые
      satRange: [70, 90],
      lightRange: [45, 65]
    },
    professional: { // Профессиональные (приглушённые)
      hueRange: [200, 240], // Синие
      satRange: [20, 40],
      lightRange: [30, 50]
    }
  }

  const config = moods[mood] || moods.calm
  const baseHue = config.hueRange[0] + Math.random() * (config.hueRange[1] - config.hueRange[0])

  const colors = []
  for (let i = 0; i < count; i++) {
    const hue = (baseHue + i * 25) % 360
    const sat = config.satRange[0] + Math.random() * (config.satRange[1] - config.satRange[0])
    const light = config.lightRange[0] + Math.random() * (config.lightRange[1] - config.lightRange[0])
    colors.push(hslToHex(hue, sat, light))
  }

  return colors
}

// ==========================================
// КОНТРАСТНОСТЬ И ДОСТУПНОСТЬ (WCAG)
// ==========================================

export function getLuminance(hex) {
  const rgb = [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16)
  ].map(val => {
    val = val / 255
    return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
  })
  
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]
}

export function getContrastRatio(color1, color2) {
  const lum1 = getLuminance(color1)
  const lum2 = getLuminance(color2)
  const brightest = Math.max(lum1, lum2)
  const darkest = Math.min(lum1, lum2)
  
  return (brightest + 0.05) / (darkest + 0.05)
}

export function getWCAGLevel(ratio) {
  if (ratio >= 7) {
    return { level: 'AAA', text: 'Отлично', color: '#27ae60' }
  }
  if (ratio >= 4.5) {
    return { level: 'AA', text: 'Хорошо', color: '#f39c12' }
  }
  if (ratio >= 3) {
    return { level: 'AA Large', text: 'Для крупного текста', color: '#e67e22' }
  }
  return { level: 'Fail', text: 'Недостаточно', color: '#e74c3c' }
}

// ==========================================
// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
// ==========================================

// Проверка валидности HEX
export function isValidHex(hex) {
  return /^#[0-9A-F]{6}$/i.test(hex)
}

// Затемнение цвета
export function darken(hex, percent) {
  const hsl = hexToHsl(hex)
  hsl.l = Math.max(0, hsl.l - percent)
  return hslToHex(hsl.h, hsl.s, hsl.l)
}

// Осветление цвета
export function lighten(hex, percent) {
  const hsl = hexToHsl(hex)
  hsl.l = Math.min(100, hsl.l + percent)
  return hslToHex(hsl.h, hsl.s, hsl.l)
}

// Изменение насыщенности
export function saturate(hex, percent) {
  const hsl = hexToHsl(hex)
  hsl.s = Math.min(100, hsl.s + percent)
  return hslToHex(hsl.h, hsl.s, hsl.l)
}

export function desaturate(hex, percent) {
  const hsl = hexToHsl(hex)
  hsl.s = Math.max(0, hsl.s - percent)
  return hslToHex(hsl.h, hsl.s, hsl.l)
}

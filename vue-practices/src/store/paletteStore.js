import { defineStore } from "pinia";
import { ref } from "vue";

export const usePaletteStore = defineStore("paletteStore", () => {
  const colors = ref([]);
  const lockedColors = ref([]);
  const paletteSize = ref(5);

  function setPalette(newColors, newLocks) {
    colors.value = [...newColors];
    lockedColors.value = [...newLocks];
    paletteSize.value = newColors.length;

    localStorage.setItem(
      "globalPalette",
      JSON.stringify({
        colors: colors.value,
        lockedColors: lockedColors.value,
        paletteSize: paletteSize.value
      })
    );
  }

  function loadPalette() {
    const saved = JSON.parse(localStorage.getItem("globalPalette"));
    if (saved) {
      colors.value = saved.colors;
      lockedColors.value = saved.lockedColors;
      paletteSize.value = saved.paletteSize;
    }
  }

  return { colors, lockedColors, paletteSize, setPalette, loadPalette };
});

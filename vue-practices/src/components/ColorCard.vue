<template>
    <div 
        class="color-card" 
        :style="{ backgroundColor: color }"
    >
        <button 
            class="lock-btn"
            @click.stop="$emit('lock')"
            :class="{ locked: isLocked }"
        >
            {{ isLocked ? '🔒' : '🔓' }}
        </button>

        <h2 @click="copyToClipboard">{{ displayColor }}</h2>
        
        <div v-if="copied" class="copied-message">
            Скопировано!
        </div>
    </div>
</template>

<script setup>
    import { ref, computed } from 'vue'
    import { hexToRgb } from '@/utils/colorUtils'

    const props = defineProps({
        color: {
            type: String,
            required: true
        },
        format: {
            type: String,
            default: 'HEX'
        },
        isLocked: {
            type: Boolean,
            default: false
        }
    })

    defineEmits(['lock'])

    const copied = ref(false)

    const displayColor = computed(() => {
        if (props.format === 'RGB') {
            return hexToRgb(props.color)
        }
        return props.color
    })

    function copyToClipboard() {
        navigator.clipboard.writeText(displayColor.value)
            .then(() => {
                copied.value = true
                setTimeout(() => {
                    copied.value = false
                }, 1000)
            })
    }
</script>

<style scoped>
    .color-card {
        width: 150px;
        height: 150px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        color: #fff;
        font-weight: bold;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        margin: 10px;
        position: relative;
        transition: transform 0.2s;
    }

    .color-card:hover {
        transform: scale(1.05);
    }

    h2 {
        cursor: pointer;
        margin: 0;
        font-size: 12px;
        text-align: center;
        padding: 5px;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 4px;
    }

    .lock-btn {
        position: absolute;
        top: 10px;
        right: 10px;
        background: rgba(255, 255, 255, 0.3);
        border: none;
        border-radius: 50%;
        width: 35px;
        height: 35px;
        font-size: 16px;
        cursor: pointer;
        transition: all 0.3s;
        backdrop-filter: blur(5px);
    }

    .lock-btn:hover {
        background: rgba(255, 255, 255, 0.5);
        transform: scale(1.1);
    }

    .lock-btn.locked {
        background: rgba(255, 255, 255, 0.9);
    }

    .copied-message {
        position: absolute;
        bottom: 10px;
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 5px 10px;
        border-radius: 4px;
        font-size: 12px;
        animation: fadeIn 0.3s;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
</style>

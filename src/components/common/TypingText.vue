<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue';

const props = defineProps({
    text: {
        type: [String, Array],
        required: true,
    },
    speed: {
        type: Number,
        default: 100,
    },
    startDelay: {
        type: Number,
        default: 0,
    },
    loop: {
        type: Boolean,
        default: false,
    },
    eraseSpeed: {
        type: Number,
        default: 50,
    },
    eraseDelay: {
        type: Number,
        default: 1500,
    },
    showCursor: {
        type: Boolean,
        default: true,
    },
    cursorClass: {
        type: String,
        default: '',
    },
    textClass: {
        type: String,
        default: '',
    },
});

const emit = defineEmits(['typed', 'erased', 'finishedLoop']);

const currentText = ref('');
const charIndex = ref(0);
const isTyping = ref(true);
const currentStringIndex = ref(0);
let intervalId: ReturnType<typeof setInterval> | null = null;
let timeoutId: ReturnType<typeof setTimeout> | null = null;

const strings = computed(() => {
    if (Array.isArray(props.text)) {
        return props.text;
    }

    return [props.text];
});

const currentString = computed(() => strings.value[currentStringIndex.value]);

const cleanup = () => {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }

    if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
    }
};

const typeCharacter = () => {
    if (charIndex.value < currentString.value.length) {
        currentText.value += currentString.value.charAt(charIndex.value);
        charIndex.value++;

        return;
    }

    clearInterval(intervalId as any);
    intervalId = null;
    emit('typed', currentText.value);

    if (props.loop || currentStringIndex.value < strings.value.length - 1) {
        timeoutId = setTimeout(startErasing, props.eraseDelay);
    }
};

const eraseCharacter = () => {
    if (charIndex.value > 0) {
        currentText.value = currentString.value.substring(0, charIndex.value - 1);
        charIndex.value--;

        return;
    }

    clearInterval(intervalId as any);
    intervalId = null;
    emit('erased');

    if (currentStringIndex.value < strings.value.length - 1) {
        currentStringIndex.value++;
    } else if (props.loop) {
        currentStringIndex.value = 0;
        emit('finishedLoop');
    } else {
        return; // End of strings, not looping
    }

    timeoutId = setTimeout(startTyping, props.speed);
};

const startTyping = () => {
    cleanup();

    isTyping.value = true;
    intervalId = setInterval(typeCharacter, props.speed);
};

const startErasing = () => {
    cleanup();

    isTyping.value = false;
    intervalId = setInterval(eraseCharacter, props.eraseSpeed);
};

watch(() => props.text, () => {
    cleanup();
    currentText.value = '';
    charIndex.value = 0;
    currentStringIndex.value = 0;
    timeoutId = setTimeout(startTyping, props.startDelay);
}, { deep: true });

onMounted(() => {
    timeoutId = setTimeout(startTyping, props.startDelay);
});

onUnmounted(() => {
    cleanup();
});
</script>

<template>
    <span class="typewriter-container">
        <span :class="['typing-display', textClass]">
            {{ currentText }}
        </span>
        <span v-if="showCursor" :class="['cursor-block', cursorClass]"></span>
    </span>
</template>

<style scoped>
.typewriter-container {
    display: inline-block;
    white-space: nowrap;
    vertical-align: top;
    min-height: 1.1em;
}

.typing-display {
    display: inline;
}

.cursor-block {
    display: inline-block;
    width: 0.6em;
    height: 1.1em;
    background-color: rgb(var(--v-theme-primary));
    margin-left: 4px;
    vertical-align: middle;
    animation: blink-caret 1s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    opacity: 1;
}

@keyframes blink-caret {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
}
</style>

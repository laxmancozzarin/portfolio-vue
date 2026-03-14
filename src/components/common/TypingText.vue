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
        <span v-if="showCursor" :class="['cursor', cursorClass]">
            |
        </span>
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

.cursor {
    display: inline-block;
    margin-left: 2px;
    vertical-align: top;
    animation: blink-caret .75s step-end infinite;
    color: orange;
}

@keyframes blink-caret {
    from, to { opacity: 0; }
    50% { opacity: 1; }
}
</style>

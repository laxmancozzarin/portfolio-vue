<template>
    <div class="three-container">
        <canvas ref="canvasRef" class="three-canvas"></canvas>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue';
import * as THREE from 'three';
import { useTheme } from 'vuetify';

const props = defineProps<{
    color: string
}>();

const canvasRef = ref<HTMLCanvasElement | null>(null);
const theme = useTheme();

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let renderer: THREE.WebGLRenderer;
let particles: THREE.Points;
let lines: THREE.LineSegments;

let animationFrameId: number;

const PARTICLE_COUNT = 120;
const MAX_DISTANCE = 180;
let time = 0;

const initThree = () => {
    if (!canvasRef.value) {
        return;
    }

    scene = new THREE.Scene();
    scene.background = new THREE.Color(getBackgroundColor());

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 400;

    renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.value,
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0); // Transparent background

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocitiesArr = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 1000;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 1000;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 1000;

        velocitiesArr[i * 3] = (Math.random() - 0.5) * 0.7;
        velocitiesArr[i * 3 + 1] = (Math.random() - 0.5) * 0.7;
        velocitiesArr[i * 3 + 2] = (Math.random() - 0.5) * 0.7;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocitiesArr, 3));

    const material = new THREE.PointsMaterial({
        size: 4,
        color: props.color,
        transparent: true,
        opacity: 0.7
    });

    particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const lineGeometry = new THREE.BufferGeometry();
    const lineMaterial = new THREE.LineBasicMaterial({
        color: props.color,
        transparent: true,
        opacity: 0.7,
        depthWrite: false
    });

    lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    window.addEventListener('resize', handleResize);
};

const getBackgroundColor = () => {
    return theme.global.current.value.dark ? 0x0a0a0a : 0xf5f5f5;
};

watch(() => props.color, (newColor) => {
    const bgColor = getBackgroundColor();
    if (particles) {
        (particles.material as THREE.PointsMaterial).color.set(newColor);
    }
    if (lines) {
        (lines.material as THREE.LineBasicMaterial).color.set(newColor);
    }
    if (scene) {
        scene.background = new THREE.Color(bgColor);
    }
});

const handleResize = () => {
    if (!camera || !renderer) {
        return;
    }

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
};

const animate = () => {
    animationFrameId = requestAnimationFrame(animate);
    time += 0.005;

    const positions = particles.geometry.attributes.position.array as Float32Array;
    const velocities = particles.geometry.attributes.velocity.array as Float32Array;
    const linePositions = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        positions[i * 3] += velocities[i * 3] + Math.sin(time + i) * 0.1;
        positions[i * 3 + 1] += velocities[i * 3 + 1] + Math.cos(time + i) * 0.1;
        positions[i * 3 + 2] += velocities[i * 3 + 2] + Math.sin(time * 0.5 + i) * 0.1;

        if (positions[i * 3] < -500 || positions[i * 3] > 500) velocities[i * 3] *= -1;
        if (positions[i * 3 + 1] < -500 || positions[i * 3 + 1] > 500) velocities[i * 3 + 1] *= -1;
        if (positions[i * 3 + 2] < -500 || positions[i * 3 + 2] > 500) velocities[i * 3 + 2] *= -1;

        for (let j = i + 1; j < PARTICLE_COUNT; j++) {
            const dx = positions[i * 3] - positions[j * 3];
            const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
            const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
            const dynamicMaxDistance = MAX_DISTANCE + Math.sin(time * 0.5) * 30;

            if (distance < dynamicMaxDistance) {
                linePositions.push(
                    positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
                    positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
                );
            }
        }
    }

    particles.geometry.attributes.position.needsUpdate = true;

    lines.geometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));

    if (lines) {
        (lines.material as THREE.LineBasicMaterial).opacity = 0.5 + Math.sin(time) * 0.2;
    }

    renderer.render(scene, camera);
};

onMounted(() => {
    initThree();
    animate();
});

onUnmounted(() => {
    cancelAnimationFrame(animationFrameId);
    window.removeEventListener('resize', handleResize);

    if (renderer) {
        renderer.dispose();
    }
});
</script>

<style scoped>
.three-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    z-index: -1;
    pointer-events: none;
    opacity: 0.65;
}
.three-canvas {
    display: block;
}
</style>

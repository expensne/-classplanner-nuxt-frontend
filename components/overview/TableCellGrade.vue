<script setup lang="ts">
import { GRADE_STYLES } from "~/constants";

const props = defineProps<{
    points: number | null;
    minPoints: number;
    maxPoints: number;
    gradingScale: GradingScale;
}>();

const emit = defineEmits<{ scoreChanged: [score: Score] }>();

const grade = computed(() => computeGrade(props.points, props.maxPoints, props.gradingScale));
const gradeStyle = computed(() => (grade.value ? GRADE_STYLES[grade.value] : null));
</script>

<template>
    <span v-if="gradeStyle" class="pa-0 ma-0 cellGrade" :style="{ color: gradeStyle?.color }">
        ({{ gradeStyle?.label }})
    </span>
    <span v-else class="pa-0 ma-0 cellGrade">-</span>
</template>

<style scoped>
.cellGrade {
    font-size: 0.8rem;
    color: #666;
    min-width: 1rem;
}
</style>

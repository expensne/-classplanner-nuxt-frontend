<script setup lang="ts">
import { GRADE_STYLES } from "~/constants";

const props = defineProps<{
    score: Score;
    minPoints: number;
    maxPoints: number;
    gradingScale: GradingScale;
}>();

const scoreRef = ref(props.score);

const emit = defineEmits<{ scoreChanged: [score: Score] }>();

const grade = computed(() => computeGrade(scoreRef.value.pointsScored, props.maxPoints, props.gradingScale));
const gradeStyle = computed(() => (grade.value ? GRADE_STYLES[grade.value] : null));

watch(scoreRef.value, (newScore) => {
    emit("scoreChanged", newScore);
});

function handlePointsChanged(e: Event) {
    const target = e.target as HTMLInputElement;
    scoreRef.value.pointsScored = parsePointsScored(target.value);
}

function parsePointsScored(points: string): number | null {
    let parsedPoints: number | null = null;
    if (points.trim() === "") {
        parsedPoints = null;
    } else {
        parsedPoints = parseFloat(points);
        parsedPoints = Math.min(Math.max(parsedPoints, props.minPoints), props.maxPoints);
    }
    return parsedPoints;
}
</script>

<template>
    <td>
        <span style="display: flex; align-items: center">
            <input
                type="number"
                class="pa-0 ma-0 cellInput"
                :value="scoreRef.pointsScored"
                :min="$props.minPoints"
                :max="$props.maxPoints"
                @input="handlePointsChanged"
            />
            <OverviewTableCellGrade
                :points="scoreRef.pointsScored"
                :minPoints="props.minPoints"
                :maxPoints="props.maxPoints"
                :gradingScale="props.gradingScale"
            />
        </span>
    </td>
</template>

<style scoped>
.cellInput {
    width: 3rem;
    text-align: right;
}
</style>

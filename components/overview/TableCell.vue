<script setup lang="ts">
interface GradeStyle {
    label: string;
    color: string;
    hexColor: string;
}

const GRADE_STYLES: Record<string, GradeStyle> = {
    A: { label: "1", color: "green", hexColor: "#4caf50" },
    B: { label: "2", color: "light-green", hexColor: "#8bc34a" },
    C: { label: "3", color: "lime", hexColor: "#cddc39" },
    D: { label: "4", color: "amber", hexColor: "#ffc107" },
    E: { label: "5", color: "orange", hexColor: "#ff9800" },
    F: { label: "6", color: "red", hexColor: "#f44336" },
};

const props = defineProps<{
    pointsScored: number | null;
    minPoints: number;
    maxPoints: number;
    gradingScale: GradingScale;
}>();

const emit = defineEmits<{ pointsScoredChanged: [value: number | null] }>();

const pointsScored = ref(props.pointsScored);
const grade = computed(() => computeGrade(pointsScored?.value, props.maxPoints, props.gradingScale));
const gradeStyle = computed(() => (grade.value ? GRADE_STYLES[grade.value] : null));

watch(pointsScored, (newVal) => {
    emit("pointsScoredChanged", newVal);
});

function handlePointsScoredChange(e: Event) {
    const target = e.target as HTMLInputElement;
    pointsScored.value = parsePointsScored(target.value);
}

function parsePointsScored(pointsScored: string): number | null {
    let pointScoredNumber: number | null = null;
    if (pointsScored.trim() === "") {
        pointScoredNumber = null;
    } else {
        pointScoredNumber = parseFloat(pointsScored);
        pointScoredNumber = Math.min(Math.max(pointScoredNumber, props.minPoints), props.maxPoints);
    }
    return pointScoredNumber;
}
</script>

<template>
    <td>
        <span style="display: flex; align-items: center">
            <input
                type="number"
                class="pa-0 ma-0 cellInput"
                :value="pointsScored"
                :min="minPoints"
                :max="maxPoints"
                @input="handlePointsScoredChange"
            />
            <span v-if="gradeStyle" class="pa-0 ma-0 cellGrade" :style="{ color: gradeStyle?.color }">
                ({{ gradeStyle?.label }})
            </span>
            <span v-else class="pa-0 ma-0 cellGrade">-</span>
        </span>
    </td>
</template>

<style scoped>
.cellInput {
    width: 3rem;
    text-align: right;
}
.cellGrade {
    font-size: 0.8rem;
    color: #666;
    min-width: 1rem;
}
</style>

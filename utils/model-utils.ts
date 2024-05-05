export function computeGrade(pointsScored: number | null, maxPoints: number, gradingScale: GradingScale) {
    if (pointsScored === undefined) {
        throw new Error("pointsScored is undefined");
    }

    if (pointsScored === null) {
        return null;
    }

    let pointsAsPercentage = (pointsScored / maxPoints) * 100.0;

    let gradeOrder = ["A", "B", "C", "D", "E", "F"];
    let gradeIndex = 0;
    while (pointsAsPercentage < gradingScale[gradeOrder[gradeIndex]]) {
        gradeIndex++;
    }

    gradeIndex = Math.min(gradeIndex, gradeOrder.length - 1);
    return gradeOrder[gradeIndex];
}

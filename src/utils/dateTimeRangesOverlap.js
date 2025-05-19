export default function dateTimeRangesOverlap(start1, end1, start2, end2) {
    const d_start1 = new Date(start1);
    const d_end1 = new Date(end1);
    const d_start2 = new Date(start2);
    const d_end2 = new Date(end2);
    return d_start1 < d_end2 && d_end1 > d_start2;
}

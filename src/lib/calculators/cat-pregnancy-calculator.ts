export function calculateCatPregnancy(inputs: Record<string, unknown>) {
  const matingDate = new Date(String(inputs.matingDate));
  if (isNaN(matingDate.getTime())) throw new Error('Please enter a valid mating date');

  const gestationDays = 65; // 63–67 days, 65 is the midpoint
  const dueDateMs = matingDate.getTime() + gestationDays * 24 * 60 * 60 * 1000;
  const dueDate = new Date(dueDateMs);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysSinceMating = Math.max(0, Math.floor((today.getTime() - matingDate.getTime()) / (24 * 60 * 60 * 1000)));
  const daysRemaining = Math.max(0, gestationDays - daysSinceMating);

  const vetVisitDate = new Date(matingDate.getTime() + 21 * 24 * 60 * 60 * 1000);
  const nestingDate = new Date(matingDate.getTime() + 56 * 24 * 60 * 60 * 1000);

  let stage = 'Pre-pregnancy';
  if (daysSinceMating >= gestationDays) {
    stage = 'Due / Post-due';
  } else if (daysSinceMating > 56) {
    stage = 'Nesting Phase (Day 57–65)';
  } else if (daysSinceMating > 28) {
    stage = 'Late Pregnancy (Day 29–56)';
  } else if (daysSinceMating > 0) {
    stage = 'Early Pregnancy (Day 1–28)';
  }

  const formatDate = (d: Date) => d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return {
    dueDate: formatDate(dueDate),
    daysSinceMating,
    daysRemaining,
    stage,
    recommendedVetVisit: formatDate(vetVisitDate),
    nestingStartDate: formatDate(nestingDate),
  };
}

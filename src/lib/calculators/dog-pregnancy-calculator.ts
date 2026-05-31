export function calculateDogPregnancy(inputs: Record<string, unknown>) {
  const matingDate = new Date(String(inputs.matingDate));
  if (isNaN(matingDate.getTime())) throw new Error('Please enter a valid mating date');

  const gestationDays = 63;
  const dueDateMs = matingDate.getTime() + gestationDays * 24 * 60 * 60 * 1000;
  const dueDate = new Date(dueDateMs);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysSinceMating = Math.max(0, Math.floor((today.getTime() - matingDate.getTime()) / (24 * 60 * 60 * 1000)));
  const daysRemaining = Math.max(0, gestationDays - daysSinceMating);

  const trimester1End = new Date(matingDate.getTime() + 21 * 24 * 60 * 60 * 1000);
  const trimester2End = new Date(matingDate.getTime() + 42 * 24 * 60 * 60 * 1000);

  let stage = 'Pre-pregnancy';
  if (daysSinceMating >= gestationDays) {
    stage = 'Due / Post-due';
  } else if (daysSinceMating > 42) {
    stage = 'Third Trimester (Day 43–63)';
  } else if (daysSinceMating > 21) {
    stage = 'Second Trimester (Day 22–42)';
  } else if (daysSinceMating > 0) {
    stage = 'First Trimester (Day 1–21)';
  }

  const formatDate = (d: Date) => d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return {
    dueDate: formatDate(dueDate),
    daysSinceMating,
    daysRemaining,
    stage,
    trimester1End: formatDate(trimester1End),
    trimester2End: formatDate(trimester2End),
  };
}

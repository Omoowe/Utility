export function calculatePregnancy(inputs: Record<string, unknown>) {
  const lmpDate = new Date(String(inputs.lmpDate));
  if (isNaN(lmpDate.getTime())) throw new Error('Please enter your last menstrual period date');

  const gestationDays = 280; // 40 weeks
  const dueDateMs = lmpDate.getTime() + gestationDays * 24 * 60 * 60 * 1000;
  const dueDate = new Date(dueDateMs);

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const daysPregnant = Math.max(0, Math.floor((today.getTime() - lmpDate.getTime()) / (24 * 60 * 60 * 1000)));
  const weeksPregnant = Math.floor(daysPregnant / 7);
  const remainingDays = daysPregnant % 7;
  const daysRemaining = Math.max(0, gestationDays - daysPregnant);

  // Trimester boundaries
  let trimester = '1st Trimester';
  if (daysPregnant >= 196) trimester = '3rd Trimester';
  else if (daysPregnant >= 98) trimester = '2nd Trimester';

  // Key milestone dates
  const firstTrimesterEnd = new Date(lmpDate.getTime() + 98 * 24 * 60 * 60 * 1000);
  const secondTrimesterEnd = new Date(lmpDate.getTime() + 196 * 24 * 60 * 60 * 1000);
  const heartbeatDate = new Date(lmpDate.getTime() + 42 * 24 * 60 * 60 * 1000);
  const anatomyScaleDate = new Date(lmpDate.getTime() + 140 * 24 * 60 * 60 * 1000);

  const formatDate = (d: Date) => d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  const pregnancyStatus = daysPregnant === 0
    ? 'Not yet pregnant'
    : daysPregnant > gestationDays
    ? 'Past due date'
    : `${weeksPregnant}w ${remainingDays}d pregnant`;

  return {
    dueDate: formatDate(dueDate),
    pregnancyStatus,
    weeksPregnant,
    trimester,
    daysRemaining: Math.max(0, daysRemaining),
    conceptionDate: formatDate(new Date(lmpDate.getTime() + 14 * 24 * 60 * 60 * 1000)),
    heartbeatWeek: formatDate(heartbeatDate),
    anatomyScan: formatDate(anatomyScaleDate),
    firstTrimesterEnd: formatDate(firstTrimesterEnd),
    secondTrimesterEnd: formatDate(secondTrimesterEnd),
  };
}

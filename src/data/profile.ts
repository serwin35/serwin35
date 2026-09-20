import data from './profile.json';

export const profile = data;

export function yearsOfExperience(today = new Date()): number {
  return today.getFullYear() - profile.careerStartYear;
}

export function age(today = new Date()): number {
  const birth = new Date(`${profile.birthDate}T00:00:00`);
  let years = today.getFullYear() - birth.getFullYear();
  const beforeBirthday =
    today.getMonth() < birth.getMonth() ||
    (today.getMonth() === birth.getMonth() &&
      today.getDate() < birth.getDate());

  if (beforeBirthday) years--;
  return years;
}

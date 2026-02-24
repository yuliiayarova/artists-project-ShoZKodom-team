import './placeholder.css';

export function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word[0].toUpperCase())
    .join('');
}

export function stringToColor(str = '') {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const color1 = `hsl(${hash % 360}, 60%, 55%)`;
  const color2 = `hsl(${(hash + 60) % 360}, 60%, 45%)`;

  return `linear-gradient(135deg, ${color1}, ${color2})`;
}

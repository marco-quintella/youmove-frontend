export default function getContrastColor(bg: string) {
  if (bg.indexOf('#') === 0)
    bg = bg.slice(1)

  if (bg.length === 3)
    bg = bg.split('').map(char => char + char).join('')

  if (bg.length !== 6)
    throw new Error('Invalid HEX color.')

  const r = parseInt(bg.slice(0, 2), 16)
  const g = parseInt(bg.slice(2, 4), 16)
  const b = parseInt(bg.slice(4, 6), 16)

  return (r * 0.299 + g * 0.587 + b * 0.114) > 186 ? '#212427' : '#fff'
}

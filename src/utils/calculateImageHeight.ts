export const calculateImageHeight = (
  originalWidth: number,
  originalHeight: number,
  currentWidth: number
) => {
  const ratio = originalHeight / originalWidth
  return currentWidth * ratio
}

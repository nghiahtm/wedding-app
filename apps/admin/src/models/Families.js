export const emptyFamilies = {
  groom: { father: '', mother: '' },
  bride: { father: '', mother: '' }
};

export function createFamiliesModel(data = {}) {
  const pick = (side) => ({ father: String(data[side]?.father ?? ''), mother: String(data[side]?.mother ?? '') });
  return { groom: pick('groom'), bride: pick('bride') };
}

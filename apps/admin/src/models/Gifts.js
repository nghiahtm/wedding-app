const emptyGift = { bank: '', account: '', holder: '' };

export const emptyGifts = { groom: { ...emptyGift }, bride: { ...emptyGift } };

// Tài khoản nhận mừng cưới của từng bên: ngân hàng, số tài khoản, chủ tài khoản.
export function createGiftsModel(data = {}) {
  const pick = (side) => ({
    bank: String(data[side]?.bank ?? ''),
    account: String(data[side]?.account ?? ''),
    holder: String(data[side]?.holder ?? '')
  });
  return { groom: pick('groom'), bride: pick('bride') };
}

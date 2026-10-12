export const emptyGifts = {
  groom: { bank: "", account: "", holder: "" },
  bride: { bank: "", account: "", holder: "" },
};

// Tài khoản nhận mừng cưới của từng bên (nhập ở admin), hiện dưới mã QR trong hộp quà.
export function createGiftsModel(data = {}) {
  const pick = (side) => ({
    bank: String(data[side]?.bank ?? "").trim(),
    account: String(data[side]?.account ?? "").trim(),
    holder: String(data[side]?.holder ?? "").trim(),
  });
  return { groom: pick("groom"), bride: pick("bride") };
}

export function hasGiftAccount(account) {
  return Boolean(account && (account.bank || account.account || account.holder));
}

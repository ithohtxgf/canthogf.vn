export type ChietTinhInputs = {
  listPrice: number;
  discountPct: number;
  insExchange: number;
  registrationPct: number;
  phiDangKi: number;
  phiEpBien: number;
  phiDangKiem: number;
  phiDichVu: number;
  phiBhTnds: number;
  phiDuongBo: number;
  phiBhThanXe: number;
};

export type ChietTinhQuote = {
  listPrice: number;
  discountAmt: number;
  insExchange: number;
  carValue: number;
  regFee: number;
  /** Phí thủ tục (trước bạ, đăng ký, TNDS, đường bộ…) — chưa gồm BH thân xe */
  phuLucFees: number;
  bodyIns: number;
  /** phuLucFees + bodyIns */
  phuLucTotal: number;
  totalCash: number;
};

export function clampNonNegative(value: number): number {
  if (!Number.isFinite(value) || value < 0) return 0;
  return value;
}

export function clampPercent(value: number, max = 100): number {
  if (!Number.isFinite(value) || value < 0) return 0;
  return Math.min(value, max);
}

/**
 * Chiết tính mua xe VinFast — Cần Thơ GF
 *
 * 1. Giá trị xe = Giá niêm yết − Ưu đãi (%) − Quy đổi bảo hiểm
 * 2. Phí trước bạ = Giá trị xe × % trước bạ (mặc định 0% — xe điện thường miễn)
 * 3. Phụ lục (thủ tục) = trước bạ + các phí đăng ký, dịch vụ, TNDS, đường bộ
 * 4. BH thân xe = số tiền nhập trực tiếp (tách dòng STT 2)
 * 5. Tổng thanh toán = Giá trị xe + Phụ lục + BH thân xe
 */
export function computeVinfastChietTinhQuote(input: ChietTinhInputs): ChietTinhQuote {
  const listPrice = clampNonNegative(input.listPrice);
  const discountPct = clampPercent(input.discountPct, 50);
  const insExchange = clampNonNegative(input.insExchange);
  const registrationPct = clampPercent(input.registrationPct);

  const phiDangKi = clampNonNegative(input.phiDangKi);
  const phiEpBien = clampNonNegative(input.phiEpBien);
  const phiDangKiem = clampNonNegative(input.phiDangKiem);
  const phiDichVu = clampNonNegative(input.phiDichVu);
  const phiBhTnds = clampNonNegative(input.phiBhTnds);
  const phiDuongBo = clampNonNegative(input.phiDuongBo);
  const bodyIns = clampNonNegative(input.phiBhThanXe);

  const discountAmt = Math.round((listPrice * discountPct) / 100);
  const carValue = Math.max(listPrice - discountAmt - insExchange, 0);
  const regFee = Math.round((carValue * registrationPct) / 100);

  const phuLucFees =
    regFee +
    phiDangKi +
    phiEpBien +
    phiDangKiem +
    phiDichVu +
    phiBhTnds +
    phiDuongBo;

  const phuLucTotal = phuLucFees + bodyIns;
  const totalCash = carValue + phuLucTotal;

  return {
    listPrice,
    discountAmt,
    insExchange,
    carValue,
    regFee,
    phuLucFees,
    bodyIns,
    phuLucTotal,
    totalCash,
  };
}

// Minh hoạ hồ sơ vận doanh theo nhận diện EV Green: nét Navy, mảng Sky và Tint, vệt sáng xiên 59° như nét logo.
// Mỗi hình là vật thật của loại hồ sơ đó; riêng biển số giữ nền vàng như biển xe kinh doanh vận tải.
const N = "#0A3572";
const S = "#0AA8F5";
const T = "#E6F5FE";

const PATHS = {
  plate: (
    <>
      <rect x="4" y="13" width="34" height="24" rx="3" fill="#F5C400" stroke={N} strokeWidth="2.5" />
      <rect x="7.2" y="16.2" width="27.6" height="17.6" rx="1.4" fill="none" stroke={N} strokeWidth="1" opacity=".5" />
      <text x="21" y="23.6" textAnchor="middle" fontSize="7.4" fontWeight="800" fill={N} letterSpacing=".3">51H</text>
      <text x="21" y="31.6" textAnchor="middle" fontSize="7.4" fontWeight="800" fill={N}>123.45</text>
      <circle cx="38" cy="13" r="7.5" fill={S} stroke="#fff" strokeWidth="2" />
      <path d="M39.3 8.2l-4 5.6h3.1l-1.5 4.6 4.4-6h-3.1z" fill="#fff" />
    </>
  ),
  badge: (
    <>
      <path d="M8.2 33.6L13 14.6c.5-2.2 2-3.6 4.3-3.6h13.4c2.3 0 3.8 1.4 4.3 3.6l4.8 19c.6 2.3-.9 3.9-3.2 3.9H11.4c-2.3 0-3.8-1.6-3.2-3.9z" fill="#fff" stroke={N} strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M15.5 33L23 15M20.5 33L25.6 21" stroke={T} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M13.5 34.2l8.5-5.2" stroke={N} strokeWidth="2" strokeLinecap="round" />
      <rect x="25" y="14.4" width="9" height="9" rx="1.4" fill={S} stroke={N} strokeWidth="1.6" />
      <path d="M27.3 17.6h4.4M27.3 20.4h2.8" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
    </>
  ),
  pin: (
    <>
      <path d="M25.5 13.4a5 5 0 0 1 0 7.2M28.8 10.2a9.6 9.6 0 0 1 0 13.6" fill="none" stroke={S} strokeWidth="2.2" strokeLinecap="round" />
      <path d="M21 24v-5.6" stroke={N} strokeWidth="2" strokeLinecap="round" />
      <circle cx="21" cy="17" r="1.7" fill={N} />
      <rect x="6" y="24" width="21" height="15" rx="2.6" fill="#fff" stroke={N} strokeWidth="2.5" />
      <circle cx="11.6" cy="31.5" r="2.1" fill={S} />
      <path d="M16.6 29.4h6.2M16.6 33.6h6.2" stroke={N} strokeWidth="1.8" strokeLinecap="round" />
      <path d="M39 26s-6-5.5-6-10a6 6 0 0 1 12 0c0 4.5-6 10-6 10z" fill={N} />
      <circle cx="39" cy="16" r="2.3" fill="#fff" />
      <path d="M33.5 37.5h9" stroke={N} strokeWidth="2" strokeLinecap="round" strokeDasharray="2.4 2.6" />
    </>
  ),
  app: (
    <>
      <rect x="12" y="4" width="22" height="40" rx="4" fill="#fff" stroke={N} strokeWidth="2.5" />
      <rect x="15.5" y="9" width="15" height="18" rx="1.5" fill={T} />
      <path d="M18.6 23.6c2.2-4.6 6.6-2 8.6-9.4" fill="none" stroke={S} strokeWidth="2" strokeLinecap="round" strokeDasharray="2.2 2.2" />
      <circle cx="18.6" cy="23.8" r="1.9" fill={N} />
      <circle cx="27.4" cy="13.4" r="2.3" fill={S} stroke={N} strokeWidth="1.3" />
      <rect x="15.5" y="30.5" width="15" height="4.6" rx="2.3" fill={S} />
      <circle cx="35.5" cy="36.5" r="7.2" fill={N} stroke="#fff" strokeWidth="2" />
      <path d="M32.3 36.6l2.2 2.2 4.3-4.7" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
} as const;

export type IconName = keyof typeof PATHS;

export function Icon({ name }: { name: IconName }) {
  return (
    <svg className="icon" viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
      {PATHS[name]}
    </svg>
  );
}

// Cụm ba vạch: yếu tố đồ họa duy nhất, dài 100 : 80 : 100, luôn chạm một mép.
export function Bars({ className = "" }: { className?: string }) {
  return (
    <div className={`bars ${className}`} aria-hidden="true">
      <span /><span /><span />
    </div>
  );
}

// Biểu tượng nét mảnh 24px cho các mục trang chủ: nét theo màu chữ, chi tiết "acc" màu Sky.
const LINE_PATHS = {
  coop: (
    <>
      <path d="M3 20V10l5-3 5 3v10M13 20v-7l4-2.5 4 2.5v7" />
      <path className="acc" d="M2 20h20" />
      <path d="M6.5 13h3M6.5 16.5h3" />
    </>
  ),
  docs: (
    <>
      <path d="M7 3.5h7l4 4V20a.5.5 0 0 1-.5.5h-10.5a.5.5 0 0 1-.5-.5V4a.5.5 0 0 1 .5-.5z" />
      <path d="M14 3.5V8h4" />
      <path className="acc" d="M9 13l2 2 4-4.5" />
    </>
  ),
  steps: (
    <>
      <path d="M4 19h4v-4h4v-4h4V7h4" />
      <path className="acc" d="M16 4l4 3-4 3" />
    </>
  ),
  headset: (
    <>
      <path d="M4 14v-2a8 8 0 0 1 16 0v2" />
      <rect x="3" y="13" width="4" height="6" rx="1.5" /><rect x="17" y="13" width="4" height="6" rx="1.5" />
      <path className="acc" d="M19 19c0 1.5-2 2.5-5 2.5" />
    </>
  ),
  phone: (
    <path d="M6.6 3.5h3l1.5 4-2 1.3a10.5 10.5 0 0 0 6.1 6.1l1.3-2 4 1.5v3a2 2 0 0 1-2.1 2A16.4 16.4 0 0 1 4.5 5.6a2 2 0 0 1 2.1-2.1z" />
  ),
  callback: (
    <>
      <path d="M6.6 5.5h3l1.5 4-2 1.3a10.5 10.5 0 0 0 6.1 6.1l1.3-2 4 1.5v3a2 2 0 0 1-2.1 2A16.4 16.4 0 0 1 4.5 7.6a2 2 0 0 1 2.1-2.1z" />
      <path className="acc" d="M15 3v5h5M15 8l6-6" />
    </>
  ),
  car: (
    <>
      <path d="M3 15.5V12l2.2-4.6A2 2 0 0 1 7 6.2h10a2 2 0 0 1 1.8 1.2L21 12v3.5a1 1 0 0 1-1 1h-1.2M5.2 16.5H4a1 1 0 0 1-1-1" />
      <circle cx="7.5" cy="16.5" r="2" /><circle cx="16.5" cy="16.5" r="2" />
      <path className="acc" d="M12.6 8.6l-2 3h2.8l-2 3" />
    </>
  ),
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
} as const;

export type LineIconName = keyof typeof LINE_PATHS;

export function LineIcon({ name, className = "" }: { name: LineIconName; className?: string }) {
  return (
    <svg className={`line-icon ${className}`} viewBox="0 0 24 24" aria-hidden="true">
      {LINE_PATHS[name]}
    </svg>
  );
}

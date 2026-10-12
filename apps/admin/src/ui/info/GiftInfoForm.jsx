import { Save } from 'lucide-react';

const SIDES = [
  { side: 'groom', title: 'Nhà trai (chú rể)' },
  { side: 'bride', title: 'Nhà gái (cô dâu)' }
];

const FIELDS = [
  { key: 'bank', label: 'Ngân hàng', placeholder: 'Ví dụ: Vietcombank' },
  { key: 'account', label: 'Số tài khoản', placeholder: 'Ví dụ: 1023456789', inputMode: 'numeric' },
  { key: 'holder', label: 'Chủ tài khoản', placeholder: 'Ví dụ: NGUYEN VAN AN' }
];

// Form tài khoản mừng cưới: hiện dưới mã QR trong hộp quà mừng. Mã QR vẫn tải ở tab Hình ảnh.
function GiftInfoForm({ giftForm }) {
  const { form, loading, saving, isDirty, message, maxLength, updateField, handleSubmit } = giftForm;

  return (
    <form className="panel info-form" onSubmit={handleSubmit}>
      <div className="panel-heading">
        <div><h2>Mừng cưới (mã QR)</h2><p>Hiện dưới mã QR trong hộp quà mừng của thiệp. Để trống ô nào thì thiệp ẩn ô đó. Mã QR tải ở tab Hình ảnh.</p></div>
      </div>
      {loading ? <p className="empty-state">Đang tải thông tin...</p> : (
        <div className="info-grid">
          {SIDES.map(({ side, title }) => (
            <fieldset className="info-card" key={side}>
              <legend>{title}</legend>
              {FIELDS.map(({ key, label, placeholder, inputMode }) => (
                <label className="info-field" key={key}>
                  <span>{label}</span>
                  <input type="text" inputMode={inputMode} value={form[side][key]} maxLength={maxLength} placeholder={placeholder} onChange={(event) => updateField(side, key, event.target.value)} />
                </label>
              ))}
            </fieldset>
          ))}
        </div>
      )}
      <div className="info-actions">
        {message.text && <p className={`info-message is-${message.type}`} role="status">{message.text}</p>}
        {isDirty && !message.text && <p className="info-message">Có thay đổi chưa lưu</p>}
        <button type="submit" className="primary-button" disabled={loading || saving || !isDirty}>
          <Save size={15} strokeWidth={1.9} aria-hidden="true" />
          {saving ? 'Đang lưu...' : 'Lưu tài khoản'}
        </button>
      </div>
    </form>
  );
}

export default GiftInfoForm;

import { Save } from 'lucide-react';
import GiftInfoForm from './GiftInfoForm.jsx';

const SIDES = [
  { side: 'groom', title: 'Nhà trai', childLabel: 'Chú rể', nameKey: 'groomName' },
  { side: 'bride', title: 'Nhà gái', childLabel: 'Cô dâu', nameKey: 'brideName' }
];

function ParentField({ label, value, placeholder, maxLength, onChange }) {
  return (
    <label className="info-field">
      <span>{label}</span>
      <input type="text" value={value} maxLength={maxLength} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} />
    </label>
  );
}

// Tab Thông tin: tên bố mẹ hai bên (mục "Thông tin lễ cưới" trên thiệp) và tài khoản mừng cưới (dưới mã QR).
function InfoTab({ familyForm, giftForm, wedding }) {
  const { form, loading, saving, isDirty, message, maxLength, updateField, handleSubmit } = familyForm;

  return (
    <div className="tab-content">
      <form className="panel info-form" onSubmit={handleSubmit}>
        <div className="panel-heading">
          <div><h2>Gia đình hai bên</h2><p>Để trống nếu chưa muốn hiển thị. Thiệp sẽ ghi "Ông …" và "Bà …" trước tên.</p></div>
        </div>
        {loading ? <p className="empty-state">Đang tải thông tin...</p> : (
          <div className="info-grid">
            {SIDES.map(({ side, title, childLabel, nameKey }) => (
              <fieldset className="info-card" key={side}>
                <legend>{title}</legend>
                <p className="info-child">{childLabel}: <strong>{wedding[nameKey]}</strong></p>
                <ParentField label="Họ tên bố" value={form[side].father} placeholder="Ví dụ: Nguyễn Văn An" maxLength={maxLength} onChange={(value) => updateField(side, 'father', value)} />
                <ParentField label="Họ tên mẹ" value={form[side].mother} placeholder="Ví dụ: Trần Thị Bình" maxLength={maxLength} onChange={(value) => updateField(side, 'mother', value)} />
              </fieldset>
            ))}
          </div>
        )}
        <div className="info-actions">
          {message.text && <p className={`info-message is-${message.type}`} role="status">{message.text}</p>}
          {isDirty && !message.text && <p className="info-message">Có thay đổi chưa lưu</p>}
          <button type="submit" className="primary-button" disabled={loading || saving || !isDirty}>
            <Save size={15} strokeWidth={1.9} aria-hidden="true" />
            {saving ? 'Đang lưu...' : 'Lưu thông tin'}
          </button>
        </div>
      </form>
      <GiftInfoForm giftForm={giftForm} />
    </div>
  );
}

export default InfoTab;

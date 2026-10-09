import { MapPin } from 'lucide-react';

function InvitationPage({ isOpen, isOpening, isScrollRevealEnabled, revealedSections, onOpen, form, fieldErrors, message, submitting, updateField, handleSubmit, weddingDetails }) {
  if (!isOpen) {
    return (
      <main className={`invitation-cover${isOpening ? ' is-opening' : ''}`}>
        <section className="cover-content" aria-label="Bìa thiệp cưới">
          <p className="cover-eyebrow">THIỆP CƯỚI</p>
          <h1 className="cover-title">{weddingDetails.groomName}<span>&</span>{weddingDetails.brideName}</h1>
          <div className="envelope-card">
            <div className="envelope-panel envelope-panel-h"><span>N</span></div>
            <div className="envelope-panel envelope-panel-n"><span>H</span></div>
            <button className="envelope-seal" type="button" onClick={onOpen} disabled={isOpening} aria-label={isOpening ? 'Đang mở thiệp' : 'Mở thiệp cưới'}>
              <span>N · H</span>
            </button>
          </div>
          <p className="cover-date">{weddingDetails.dateLong}</p>
        </section>
      </main>
    );
  }

  return (
    <main className={`invitation-content${isScrollRevealEnabled ? ' has-scroll-reveal' : ''}`}>
      <header className="masthead">
        <a className="monogram" href="#home" aria-label={`${weddingDetails.groomName} và ${weddingDetails.brideName}`}>M<span>&</span>Đ</a>
        <nav aria-label="Điều hướng chính"><a href="#story">Lời ngỏ</a><a href="#details">Thời gian & địa điểm</a><a href="#rsvp">Hồi đáp</a></nav>
        <span className="date-label">{weddingDetails.dateShort}</span>
      </header>

      <section className="hero" id="home">
        <div className="hero-copy">
          <p className="eyebrow">Trân trọng kính mời</p>
          <h1>{weddingDetails.groomName} <span>&</span><br />{weddingDetails.brideName}</h1>
          <p className="hero-note">Một ngày vui sẽ trọn vẹn hơn khi có bạn bên cạnh.</p>
          <a className="text-link" href="#details">Tham dự ngày vui <span aria-hidden="true">↘</span></a>
        </div>
        <div className="portrait" role="img" aria-label="Khung ảnh kỷ niệm của cô dâu và chú rể">
          <div className="portrait-inner"><span>Ảnh cưới</span><span>của chúng mình</span></div>
          <span className="portrait-caption">Một chương mới, cùng nhau.</span>
        </div>
        <span className="hero-index">01 / 03</span>
      </section>

      <section className={`story section scroll-reveal from-left${revealedSections.includes('story') ? ' is-visible' : ''}`} id="story" data-scroll-reveal>
        <p className="eyebrow">Thân gửi gia đình và bạn bè</p>
        <h2>Chúng mình sắp<br />về chung một nhà.</h2>
        <p className="story-copy">Sau những ngày tháng cùng nhau đi qua, {weddingDetails.groomName} và {weddingDetails.brideName} mong được sẻ chia khoảnh khắc đáng nhớ này với những người thương yêu nhất.</p>
        <span className="story-date">{weddingDetails.dateLong}</span>
      </section>

      <section className={`details section scroll-reveal from-right${revealedSections.includes('details') ? ' is-visible' : ''}`} id="details" data-scroll-reveal>
        <div><p className="eyebrow">Lễ thành hôn</p><h2>Hẹn gặp bạn<br />ở ngày vui nhé.</h2></div>
        <div className="detail-list">
          <div><span>Ngày cưới</span><strong>{weddingDetails.dateLong}</strong></div>
          {weddingDetails.locations.map((location) => <div className="location-detail" key={location.name}><span>{location.name}</span><div className="location-info"><strong>{location.address}</strong><a className="map-link" href={location.mapUrl} target="_blank" rel="noreferrer" aria-label={`Mở bản đồ ${location.name}`}><MapPin size={17} strokeWidth={1.8} aria-hidden="true" /><span>Mở bản đồ</span></a></div></div>)}
        </div>
      </section>

      <section className={`rsvp section scroll-reveal from-left${revealedSections.includes('rsvp') ? ' is-visible' : ''}`} id="rsvp" data-scroll-reveal>
        <div className="rsvp-heading"><p className="eyebrow">Hồi đáp ngày {weddingDetails.dateShort}</p><h2>Bạn sẽ đến<br />chứ?</h2><p>Cho chúng mình biết để chuẩn bị đón bạn chu đáo nhé.</p></div>
        <form onSubmit={handleSubmit} noValidate>
          <label>Họ và tên<input type="text" name="name" autoComplete="name" value={form.name} onChange={updateField} placeholder="Tên của bạn" aria-required="true" aria-invalid={Boolean(fieldErrors.name)} aria-describedby={fieldErrors.name ? 'rsvp-name-error' : undefined} />{fieldErrors.name && <span className="field-error" id="rsvp-name-error">{fieldErrors.name}</span>}</label>
          <label>Số điện thoại<input type="tel" inputMode="tel" name="phone" autoComplete="tel" value={form.phone} onChange={updateField} placeholder="Số điện thoại liên hệ" aria-required="true" aria-invalid={Boolean(fieldErrors.phone)} aria-describedby={fieldErrors.phone ? 'rsvp-phone-error' : undefined} />{fieldErrors.phone && <span className="field-error" id="rsvp-phone-error">{fieldErrors.phone}</span>}</label>
          <label>Bạn sẽ tham dự?
            <select name="attendance" value={form.attendance} onChange={updateField}>
              <option value="attending">Mình sẽ đến chung vui</option>
              <option value="declined">Rất tiếc, mình không thể đến</option>
            </select>
          </label>
          {form.attendance === 'attending' && <label>Số khách<input type="text" inputMode="numeric" name="guests" value={form.guests} onChange={updateField} aria-invalid={Boolean(fieldErrors.guests)} aria-describedby={fieldErrors.guests ? 'rsvp-guests-error' : undefined} />{fieldErrors.guests && <span className="field-error" id="rsvp-guests-error">{fieldErrors.guests}</span>}</label>}
          <label>Lời nhắn <span className="optional">(không bắt buộc)</span><textarea maxLength="500" name="note" value={form.note} onChange={updateField} rows="3" placeholder="Gửi lời chúc đến chúng mình..." /></label>
          <button type="submit" disabled={submitting}>{submitting ? 'Đang gửi...' : 'Gửi hồi đáp'} <span aria-hidden="true">↗</span></button>
          {message && <p className="form-message" role="status">{message}</p>}
        </form>
      </section>

      <footer><a className="monogram" href="#home">M<span>&</span>Đ</a><p>Cảm ơn bạn đã là một phần trong câu chuyện của chúng mình.</p><span>{weddingDetails.dateShort}</span></footer>
    </main>
  );
}

export default InvitationPage;
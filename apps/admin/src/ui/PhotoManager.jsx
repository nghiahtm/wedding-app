import QrCropDialog from './QrCropDialog.jsx';

const ACCEPT = 'image/jpeg,image/png,image/webp';

function pickFiles(handler) {
  return (event) => {
    if (event.target.files.length > 0) handler(event.target.files);
    event.target.value = '';
  };
}

function PhotoSlot({ label, hint, photo, busy, onUpload, onRemove, fit = 'cover' }) {
  return (
    <figure className="photo-slot">
      <div className={`photo-frame${photo ? '' : ' is-empty'}`}>
        {photo ? <img src={photo.url} alt={label} className={`fit-${fit}`} /> : <span>{hint}</span>}
        {busy && <span className="photo-busy">Đang xử lý...</span>}
      </div>
      <figcaption>
        <strong>{label}</strong>
        <span className="photo-actions">
          <label className={`photo-button${busy ? ' is-disabled' : ''}`}>
            {photo ? 'Thay ảnh' : 'Tải ảnh'}
            <input type="file" accept={ACCEPT} disabled={busy} onChange={pickFiles((files) => onUpload(files[0]))} />
          </label>
          {photo && <button type="button" className="photo-button danger" disabled={busy} onClick={() => onRemove(photo)}>Xóa</button>}
        </span>
      </figcaption>
    </figure>
  );
}

function PhotoManager({ loading, message, busyKeys, couplePhotos, maxCouplePhotos, slots, uploadCouplePhotos, uploadSlotPhoto, qrCrop, removePhoto }) {
  const coupleBusy = busyKeys.includes('couple');
  const coupleFull = couplePhotos.length >= maxCouplePhotos;
  const slotProps = (category, side) => ({
    photo: slots[category][side],
    busy: busyKeys.includes(`${category}-${side}`) || busyKeys.includes(slots[category][side]?.id),
    onUpload: (file) => (category === 'qr' ? qrCrop.request(side, file) : uploadSlotPhoto(category, side === 'main' ? null : side, file)),
    onRemove: removePhoto
  });

  return (
    <section className="panel photo-section">
      <div className="panel-heading"><div><h2>Hình ảnh thiệp</h2><p>Ảnh tải lên sẽ hiển thị ngay trên thiệp mời</p></div></div>
      {message && <p className="notice" role="status">{message}</p>}
      {loading ? <p className="empty-state photo-loading">Đang tải hình ảnh...</p> : (
        <div className="photo-groups">
          <div className="photo-group">
            <div className="photo-group-heading"><h3>Ảnh tiêu đề</h3><span>Ảnh polaroid đầu trang thiệp · tách riêng khỏi album</span></div>
            <div className="photo-slots">
              <PhotoSlot label="Ảnh tiêu đề" hint="Chưa có ảnh tiêu đề" {...slotProps('cover', 'main')} />
            </div>
          </div>

          <div className="photo-group">
            <div className="photo-group-heading"><h3>Album ảnh cưới</h3><span>{couplePhotos.length}/{maxCouplePhotos} ảnh</span></div>
            <div className="photo-grid">
              {couplePhotos.map((photo, index) => (
                <figure className="photo-thumb" key={photo.id}>
                  <img src={photo.url} alt={`Ảnh cưới ${index + 1}`} />
                  <button type="button" className="photo-remove" disabled={busyKeys.includes(photo.id)} onClick={() => removePhoto(photo)} aria-label={`Xóa ảnh cưới ${index + 1}`}>×</button>
                </figure>
              ))}
              {!coupleFull && (
                <label className={`photo-add${coupleBusy ? ' is-disabled' : ''}`}>
                  <span aria-hidden="true">+</span>{coupleBusy ? 'Đang tải lên...' : 'Thêm ảnh'}
                  <input type="file" accept={ACCEPT} multiple disabled={coupleBusy} onChange={pickFiles(uploadCouplePhotos)} />
                </label>
              )}
            </div>
          </div>

          <div className="photo-group">
            <div className="photo-group-heading"><h3>Thiệp cưới</h3><span>Mỗi bên một ảnh thiệp</span></div>
            <div className="photo-slots">
              <PhotoSlot label="Nhà trai" hint="Chưa có ảnh thiệp nhà trai" {...slotProps('invitation', 'groom')} />
              <PhotoSlot label="Nhà gái" hint="Chưa có ảnh thiệp nhà gái" {...slotProps('invitation', 'bride')} />
            </div>
          </div>

          <div className="photo-group">
            <div className="photo-group-heading"><h3>QR mừng cưới</h3><span>Hiện trong hộp quà khi khách mở · chọn ảnh rồi cắt sát mã QR</span></div>
            <div className="photo-slots">
              <PhotoSlot label="QR chú rể" hint="Chưa có mã QR chú rể" fit="contain" {...slotProps('qr', 'groom')} />
              <PhotoSlot label="QR cô dâu" hint="Chưa có mã QR cô dâu" fit="contain" {...slotProps('qr', 'bride')} />
            </div>
          </div>
        </div>
      )}
      {qrCrop.pending && <QrCropDialog url={qrCrop.pending.url} onConfirm={qrCrop.confirm} onCancel={qrCrop.cancel} />}
    </section>
  );
}

export default PhotoManager;

function MusicManager({ music, loading, busy, message, accept, selectMusic, removeMusic }) {
  function handleFile(event) {
    const [file] = event.target.files;
    if (file) selectMusic(file);
    event.target.value = '';
  }

  return (
    <section className="panel music-section">
      <div className="panel-heading"><div><h2>Nhạc nền</h2><p>Nhạc sẽ phát khi khách bấm mở thiệp · MP3, M4A, OGG hoặc WAV, tối đa 15MB</p></div></div>
      {message && <p className="notice" role="status">{message}</p>}
      <div className="music-body">
        {loading ? <p className="music-empty">Đang tải nhạc nền...</p> : music ? (
          <div className="music-track">
            <span className="music-disc" aria-hidden="true">♪</span>
            <div className="music-info">
              <strong>{music.title}</strong>
              <small>{(music.size / 1024 / 1024).toFixed(1)} MB</small>
              <audio controls preload="none" src={music.url}>Trình duyệt không hỗ trợ phát nhạc.</audio>
            </div>
          </div>
        ) : <p className="music-empty">Chưa có nhạc nền. Thiệp sẽ mở mà không phát nhạc.</p>}
        <div className="music-actions">
          <label className={`photo-button music-pick${busy ? ' is-disabled' : ''}`}>
            {busy ? 'Đang xử lý...' : music ? 'Đổi nhạc' : 'Chọn nhạc'}
            <input type="file" accept={accept} disabled={busy} onChange={handleFile} />
          </label>
          {music && <button type="button" className="photo-button danger" disabled={busy} onClick={removeMusic}>Xóa</button>}
        </div>
      </div>
    </section>
  );
}

export default MusicManager;

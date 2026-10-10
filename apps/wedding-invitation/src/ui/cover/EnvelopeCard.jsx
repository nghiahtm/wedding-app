import Bouquet from "./Bouquet.jsx";

// Phong bì rượu vang mở sẵn: ảnh album đầu tiên nghiêng nhô ra khỏi miệng thư, bó hoa cài bên trái, dấu sáp hình tim.
function EnvelopeCard({ photo, alt, initials }) {
  return (
    <div className="envelope-card">
      <div className="envelope">
        <span className="envelope-flap" aria-hidden="true" />
        <figure className="envelope-photo">
          {photo ? (
            <img src={photo.url} alt={alt} />
          ) : (
            <span className="envelope-monogram" role="img" aria-label={alt}>
              {initials.groom}
              <em>&</em>
              {initials.bride}
            </span>
          )}
        </figure>
        <span className="envelope-front" aria-hidden="true" />
        <span className="envelope-pocket" aria-hidden="true" />
        <span className="envelope-seal" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M12 18.5C7 14.6 5 12 5 9.3 5 7.3 6.5 6 8.3 6c1.5 0 2.7.8 3.7 2.2C13 6.8 14.2 6 15.7 6 17.5 6 19 7.3 19 9.3c0 2.7-2 5.3-7 9.2z" />
          </svg>
        </span>
        <Bouquet className="envelope-bouquet" />
      </div>
    </div>
  );
}

export default EnvelopeCard;

import { Eye } from "lucide-react";
import Monogram from "../shared/Monogram.jsx";

const numberFormat = new Intl.NumberFormat("vi-VN");

// Chân trang: chữ lồng, lời cảm ơn, ngày cưới và số người đã xem thiệp.
function Footer({ weddingDetails, visitSummary }) {
  return (
    <footer>
      <a className="monogram" href="#home">
        <Monogram initials={weddingDetails.initials} />
      </a>
      <p>Cảm ơn bạn đã là một phần trong câu chuyện của chúng mình.</p>
      <span>{weddingDetails.dateShort}</span>
      {visitSummary && (
        <p className="visit-count">
          <Eye size={15} strokeWidth={1.8} aria-hidden="true" />
          <span>
            <strong>{numberFormat.format(visitSummary.uniqueVisitors)}</strong>{" "}
            người đã ghé thăm thiệp
          </span>
        </p>
      )}
    </footer>
  );
}

export default Footer;

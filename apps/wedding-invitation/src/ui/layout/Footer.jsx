import { Eye } from "lucide-react";

const numberFormat = new Intl.NumberFormat("vi-VN");

// Chân trang: lời cảm ơn và số người đã xem thiệp.
function Footer({ visitSummary }) {
  return (
    <footer>
      <p>Cảm ơn bạn đã là một phần trong câu chuyện của chúng mình.</p>
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

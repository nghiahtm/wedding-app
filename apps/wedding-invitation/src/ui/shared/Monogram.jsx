// Chữ lồng tên viết tắt của chú rể và cô dâu, ví dụ "N & H".
function Monogram({ initials, separator = "&" }) {
  return (
    <>
      {initials.groom}
      <span>{separator}</span>
      {initials.bride}
    </>
  );
}

export default Monogram;

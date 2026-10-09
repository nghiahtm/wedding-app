// Nhãn trạng thái tham dự của một hồi đáp.
function StatusPill({ attendance }) {
  return (
    <span className={`status ${attendance}`}>
      {attendance === 'attending' ? 'Sẽ tham dự' : 'Không tham dự'}
    </span>
  );
}

export default StatusPill;

// Dấu * báo trường bắt buộc (ẩn với trình đọc màn hình vì ô đã có aria-required).
export function RequiredMark() {
  return (
    <span className="required-mark" aria-hidden="true">
      *
    </span>
  );
}

// Ô nhập có nhãn và thông báo lỗi gắn với aria-describedby.
function TextField({ label, name, error, required = false, ...inputProps }) {
  const errorId = `rsvp-${name}-error`;
  return (
    <label>
      <span>
        {label}
        {required && <RequiredMark />}
      </span>
      <input
        name={name}
        aria-required={required ? "true" : undefined}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        {...inputProps}
      />
      {error && (
        <span className="field-error" id={errorId}>
          {error}
        </span>
      )}
    </label>
  );
}

export default TextField;

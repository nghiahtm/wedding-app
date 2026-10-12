import { Send } from "lucide-react";
import RevealSection from "../shared/RevealSection.jsx";
import SectionTitle from "../shared/SectionTitle.jsx";
import TextField, { RequiredMark } from "../shared/TextField.jsx";
import LetterFlight from "./LetterFlight.jsx";

function RsvpSection({ rsvp, revealed }) {
  const {
    form,
    fieldErrors,
    message,
    submitting,
    isLetterFlying,
    maxNoteLength,
    updateField,
    handleSubmit,
  } = rsvp;
  const noteLength = form.note.length;

  return (
    <RevealSection id="rsvp" className="rsvp" from="left" revealed={revealed}>
      <div className="rsvp-heading">
        <SectionTitle>
          Bạn sẽ đến chứ?
        </SectionTitle>
        <p>Cho chúng mình biết để chuẩn bị đón bạn chu đáo, và gửi đôi lời chúc nhé.</p>
      </div>
      <div className={`rsvp-form-wrap rsvp-card${isLetterFlying ? " is-sending" : ""}`}>
        {isLetterFlying && <LetterFlight />}
        <form onSubmit={handleSubmit} noValidate>
          <TextField
            label="Họ và tên"
            type="text"
            name="name"
            autoComplete="name"
            value={form.name}
            onChange={updateField}
            placeholder="Tên của bạn"
            required
            error={fieldErrors.name}
          />
          <TextField
            label="Số điện thoại"
            type="tel"
            inputMode="tel"
            name="phone"
            autoComplete="tel"
            value={form.phone}
            onChange={updateField}
            placeholder="Số điện thoại liên hệ"
            required
            error={fieldErrors.phone}
          />
          <label>
            <span>
              Bạn sẽ tham dự?
              <RequiredMark />
            </span>
            <select
              name="attendance"
              value={form.attendance}
              onChange={updateField}
            >
              <option value="attending">Mình sẽ đến chung vui</option>
              <option value="declined">Rất tiếc, mình không thể đến</option>
            </select>
          </label>
          {form.attendance === "attending" && (
            <TextField
              label="Số khách"
              type="text"
              inputMode="numeric"
              name="guests"
              value={form.guests}
              onChange={updateField}
              required
              error={fieldErrors.guests}
            />
          )}
          <label>
            Lời nhắn
            <textarea
              maxLength={maxNoteLength}
              name="note"
              value={form.note}
              onChange={updateField}
              rows="3"
              placeholder="Gửi lời chúc đến chúng mình..."
              aria-invalid={Boolean(fieldErrors.note)}
              aria-describedby="rsvp-note-count"
            />
            <span
              className={`note-count${noteLength >= maxNoteLength ? " is-full" : ""}`}
              id="rsvp-note-count"
            >
              {noteLength}/{maxNoteLength} ký tự
            </span>
            {fieldErrors.note && (
              <span className="field-error">{fieldErrors.note}</span>
            )}
          </label>
          <button type="submit" disabled={submitting || isLetterFlying}>
            {submitting ? "Đang gửi..." : "Gửi lời chúc"}{" "}
            <span className="button-icon" aria-hidden="true">
              <Send size={15} strokeWidth={1.8} />
            </span>
          </button>
          {message && (
            <p className="form-message" role="status">
              {message}
            </p>
          )}
        </form>
      </div>
    </RevealSection>
  );
}

export default RsvpSection;

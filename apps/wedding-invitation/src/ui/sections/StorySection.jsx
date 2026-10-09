import RevealSection from "../shared/RevealSection.jsx";
import SectionTitle from "../shared/SectionTitle.jsx";
import WeddingCalendar from "./WeddingCalendar.jsx";

// Lời ngỏ: máy tính chia 2 cột (lời ngỏ | lịch), điện thoại xếp dọc.
function StorySection({ weddingDetails, revealed }) {
  const { groomName, brideName, dateLong, date } = weddingDetails;

  return (
    <RevealSection id="story" className="story" from="left" revealed={revealed}>
      <div className="story-copy-block">
        <SectionTitle eyebrow="Thân gửi gia đình và bạn bè" align="start">
          Chúng mình sắp
          <br />
          về chung một nhà.
        </SectionTitle>
        <p className="story-copy">
          Sau những ngày tháng cùng nhau đi qua, {groomName} và {brideName} mong
          được sẻ chia khoảnh khắc đáng nhớ này với những người thương yêu nhất.
        </p>
        <span className="story-date">{dateLong}</span>
      </div>
      <WeddingCalendar {...date} />
    </RevealSection>
  );
}

export default StorySection;

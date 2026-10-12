import RevealSection from "../shared/RevealSection.jsx";
import AlbumSection from "./AlbumSection.jsx";
import EventInfo from "./EventInfo.jsx";
import WeddingInfo from "./WeddingInfo.jsx";

// Thông tin: tấm giấy "Thông tin lễ cưới" (bố mẹ hai bên), album ảnh, rồi tấm giấy "Thông tin tiệc cưới" (ngày giờ, lịch, xác nhận).
function StorySection({ weddingDetails, families, couplePhotos, revealed, onNavigate }) {
  return (
    <RevealSection id="story" className="story" from="left" revealed={revealed}>
      <WeddingInfo families={families} weddingDetails={weddingDetails} />
      <AlbumSection couplePhotos={couplePhotos} revealed={revealed} />
      <EventInfo weddingDetails={weddingDetails} onNavigate={onNavigate} />
    </RevealSection>
  );
}

export default StorySection;

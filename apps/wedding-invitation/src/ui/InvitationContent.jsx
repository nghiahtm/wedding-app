import Footer from "./layout/Footer.jsx";
import MusicToggle from "./layout/MusicToggle.jsx";
import DetailsSection from "./sections/DetailsSection.jsx";
import GiftSection from "./sections/GiftSection.jsx";
import HeroSection from "./sections/HeroSection.jsx";
import RsvpSection from "./sections/RsvpSection.jsx";
import StorySection from "./sections/StorySection.jsx";
import WishesCorner from "./wishes/WishesCorner.jsx";
import PetalFall from "./shared/PetalFall.jsx";

// Nội dung thiệp sau khi mở bìa: header điều hướng và các mục theo thứ tự.
function InvitationContent({
  weddingDetails,
  photos,
  families,
  gifts,
  onNavigate,
  reveal,
  rsvp,
  gift,
  music,
  visitSummary,
  wishes,
}) {
  const { revealed } = reveal;

  return (
    <main
      className={`invitation-content${reveal.isEnabled ? " has-scroll-reveal" : ""}`}
    >
      <PetalFall />
      <HeroSection weddingDetails={weddingDetails} coverPhoto={photos.cover} />
      <StorySection
        weddingDetails={weddingDetails}
        families={families}
        couplePhotos={photos.couple}
        revealed={revealed}
        onNavigate={onNavigate}
      />
      <DetailsSection weddingDetails={weddingDetails} revealed={revealed} />
      <RsvpSection rsvp={rsvp} revealed={revealed} />
      <GiftSection
        weddingDetails={weddingDetails}
        qrPhotos={photos.qr}
        accounts={gifts}
        gift={gift}
        revealed={revealed}
      />
      <WishesCorner wishes={wishes} />
      <MusicToggle music={music} />
      <Footer visitSummary={visitSummary} />
    </main>
  );
}

export default InvitationContent;

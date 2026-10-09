import Footer from "./layout/Footer.jsx";
import Masthead from "./layout/Masthead.jsx";
import MusicToggle from "./layout/MusicToggle.jsx";
import AlbumSection from "./sections/AlbumSection.jsx";
import DetailsSection from "./sections/DetailsSection.jsx";
import FamilySection from "./sections/FamilySection.jsx";
import GiftSection from "./sections/GiftSection.jsx";
import HeroSection from "./sections/HeroSection.jsx";
import InvitationCardsSection from "./sections/InvitationCardsSection.jsx";
import RsvpSection from "./sections/RsvpSection.jsx";
import StorySection from "./sections/StorySection.jsx";
import WishesCorner from "./wishes/WishesCorner.jsx";

// Nội dung thiệp sau khi mở bìa: header điều hướng và các mục theo thứ tự.
function InvitationContent({
  weddingDetails,
  photos,
  families,
  sections,
  activeSection,
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
      <Masthead
        weddingDetails={weddingDetails}
        sections={sections}
        activeSection={activeSection}
        onNavigate={onNavigate}
      />
      <HeroSection weddingDetails={weddingDetails} coverPhoto={photos.couple[0]} />
      <StorySection weddingDetails={weddingDetails} revealed={revealed} />
      <FamilySection families={families} revealed={revealed} onNavigate={onNavigate} />
      <AlbumSection couplePhotos={photos.couple} revealed={revealed} />
      <DetailsSection weddingDetails={weddingDetails} revealed={revealed} />
      <InvitationCardsSection
        invitationPhotos={photos.invitation}
        revealed={revealed}
      />
      <RsvpSection weddingDetails={weddingDetails} rsvp={rsvp} revealed={revealed} />
      <GiftSection
        weddingDetails={weddingDetails}
        qrPhotos={photos.qr}
        gift={gift}
        revealed={revealed}
      />
      <WishesCorner wishes={wishes} />
      <MusicToggle music={music} />
      <Footer weddingDetails={weddingDetails} visitSummary={visitSummary} />
    </main>
  );
}

export default InvitationContent;

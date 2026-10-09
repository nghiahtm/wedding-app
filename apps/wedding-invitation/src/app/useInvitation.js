import { scrollToSection } from "./scrollToSection.js";
import { useActiveSection } from "./useActiveSection.js";
import { useBackgroundMusic } from "./useBackgroundMusic.js";
import { useCover } from "./useCover.js";
import { useGift } from "./useGift.js";
import { useInvitationData } from "./useInvitationData.js";
import { useRsvpForm } from "./useRsvpForm.js";
import { useScrollReveal } from "./useScrollReveal.js";
import { useWishes } from "./useWishes.js";

function hasSectionData(section, photos, families) {
  if (section.requires === "families") return families.length > 0;
  if (section.requires === "couplePhotos") return photos.couple.length > 0;
  if (section.requires === "invitationCards") {
    return Boolean(photos.invitation.groom || photos.invitation.bride);
  }
  return true;
}

// Ghép state của từng phần. Bìa (cover) và nội dung (content) nhận props riêng.
export function useInvitation() {
  const { weddingDetails, sections, photos, music, visitSummary, families } =
    useInvitationData();
  const backgroundMusic = useBackgroundMusic(music);
  const cover = useCover(backgroundMusic.play);
  const reveal = useScrollReveal(cover.isOpen, `${photos.couple.length}-${families.length}`);
  const wishes = useWishes(cover.isOpen);
  const rsvp = useRsvpForm(wishes.refresh);
  const gift = useGift();
  const visibleSections = sections.filter((section) =>
    hasSectionData(section, photos, families),
  );
  const activeSection = useActiveSection(
    visibleSections.map((section) => section.id),
    cover.isOpen,
  );

  return {
    isOpen: cover.isOpen,
    cover: {
      weddingDetails,
      coverPhoto: photos.couple[0],
      stage: cover.stage,
      onEnter: cover.enterInvitation,
      isCurtainOpen: cover.isCurtainOpen,
      onOpenCurtain: cover.openCurtain,
      hasMusic: backgroundMusic.hasMusic,
    },
    content: {
      weddingDetails,
      photos,
      families,
      sections: visibleSections,
      activeSection,
      onNavigate: scrollToSection,
      reveal,
      rsvp,
      gift,
      music: backgroundMusic,
      visitSummary,
      wishes,
    },
  };
}

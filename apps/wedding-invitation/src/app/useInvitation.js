import { scrollToSection } from "./scrollToSection.js";
import { useBackgroundMusic } from "./useBackgroundMusic.js";
import { useCover } from "./useCover.js";
import { useGift } from "./useGift.js";
import { useInvitationData } from "./useInvitationData.js";
import { useRsvpForm } from "./useRsvpForm.js";
import { useScrollReveal } from "./useScrollReveal.js";
import { useWishes } from "./useWishes.js";

// Ghép state của từng phần. Bìa (cover) và nội dung (content) nhận props riêng.
export function useInvitation() {
  const { weddingDetails, photos, music, visitSummary, families, gifts } =
    useInvitationData();
  const backgroundMusic = useBackgroundMusic(music);
  const cover = useCover(backgroundMusic.play);
  const reveal = useScrollReveal(cover.isOpen, `${photos.couple.length}-${families.length}`);
  const wishes = useWishes(cover.isOpen);
  const rsvp = useRsvpForm(wishes.refresh);
  const gift = useGift();

  return {
    isOpen: cover.isOpen,
    cover: {
      weddingDetails,
      onEnter: cover.enterInvitation,
      isLeaving: cover.isLeaving,
      hasMusic: backgroundMusic.hasMusic,
    },
    content: {
      weddingDetails,
      photos,
      families,
      gifts,
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

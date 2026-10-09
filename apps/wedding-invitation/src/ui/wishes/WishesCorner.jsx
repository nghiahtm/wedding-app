import BottomSheet from "../shared/BottomSheet.jsx";
import WishBubble from "./WishBubble.jsx";
import WishesPanel from "./WishesPanel.jsx";
import WishesPill from "./WishesPill.jsx";

// Lời chúc ở góc trái: máy tính hiện khung tự cuộn, điện thoại hiện nút gọn + bảng trượt.
function WishesCorner({ wishes }) {
  const { isMobile } = wishes;
  if (wishes.wishes.length === 0) return null;

  if (!isMobile) {
    return (
      <WishesPanel
        wishes={wishes.wishes}
        latestId={wishes.latestId}
        freshId={wishes.freshId}
        canAutoScroll={wishes.canAutoScroll}
        isCollapsed={wishes.isCollapsed}
        onToggleCollapsed={wishes.toggleCollapsed}
      />
    );
  }

  return (
    <>
      <WishesPill
        count={wishes.wishes.length}
        tickerWish={wishes.tickerWish}
        onOpen={wishes.openSheet}
      />
      {wishes.isSheetOpen && (
        <BottomSheet
          id="wishes-sheet"
          eyebrow="Từ khách mời"
          title="Lời chúc gửi tới chúng mình"
          onClose={wishes.closeSheet}
        >
          <ul className="wishes-sheet-list">
            {wishes.wishes.map((wish) => (
              <WishBubble wish={wish} isFresh={wish.id === wishes.freshId} key={wish.id} />
            ))}
          </ul>
        </BottomSheet>
      )}
    </>
  );
}

export default WishesCorner;

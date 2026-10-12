import { useEffect, useState } from "react";
import { emptyGifts } from "../models/Gift.js";
import { emptyPhotos } from "../models/Photo.js";
import { getFamilies } from "../repositories/familyRepository.js";
import { getGifts } from "../repositories/giftRepository.js";
import { getMusic } from "../repositories/musicRepository.js";
import { listPhotos } from "../repositories/photoRepository.js";
import {
  getVisitSummary,
  recordVisit,
} from "../repositories/visitRepository.js";
import { getWeddingDetails } from "../repositories/weddingRepository.js";

const weddingDetails = getWeddingDetails();

// Tải dữ liệu dùng chung cho thiệp. Thiệp vẫn hiển thị nếu chưa tải được ảnh hoặc nhạc.
export function useInvitationData() {
  const [photos, setPhotos] = useState(emptyPhotos);
  const [music, setMusic] = useState(null);
  const [visitSummary, setVisitSummary] = useState(null);
  const [families, setFamilies] = useState([]);
  const [gifts, setGifts] = useState(emptyGifts);

  useEffect(() => {
    listPhotos()
      .then(setPhotos)
      .catch(() => {});
    getMusic()
      .then(setMusic)
      .catch(() => {});
    getFamilies()
      .then(setFamilies)
      .catch(() => {});
    getGifts()
      .then(setGifts)
      .catch(() => {});
    // Ghi lượt xem trước rồi mới đếm, để con số đã gồm cả người đang xem.
    recordVisit()
      .catch(() => {})
      .then(getVisitSummary)
      .then(setVisitSummary)
      .catch(() => {});
  }, []);

  return { weddingDetails, photos, music, visitSummary, families, gifts };
}

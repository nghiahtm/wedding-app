import { useEffect, useState } from "react";
import { emptyPhotos } from "../models/Photo.js";
import { hasParentNames } from "../models/Family.js";
import { getFamilies } from "../repositories/familyRepository.js";
import { getMusic } from "../repositories/musicRepository.js";
import { listPhotos } from "../repositories/photoRepository.js";
import { getSections } from "../repositories/sectionRepository.js";
import {
  getVisitSummary,
  recordVisit,
} from "../repositories/visitRepository.js";
import { getWeddingDetails } from "../repositories/weddingRepository.js";

const weddingDetails = getWeddingDetails();
const sections = getSections();

// Tải dữ liệu dùng chung cho thiệp. Thiệp vẫn hiển thị nếu chưa tải được ảnh hoặc nhạc.
export function useInvitationData() {
  const [photos, setPhotos] = useState(emptyPhotos);
  const [music, setMusic] = useState(null);
  const [visitSummary, setVisitSummary] = useState(null);
  const [families, setFamilies] = useState([]);

  useEffect(() => {
    listPhotos()
      .then(setPhotos)
      .catch(() => {});
    getMusic()
      .then(setMusic)
      .catch(() => {});
    getFamilies()
      .then((list) => setFamilies(hasParentNames(list) ? list : []))
      .catch(() => {});
    // Ghi lượt xem trước rồi mới đếm, để con số đã gồm cả người đang xem.
    recordVisit()
      .catch(() => {})
      .then(getVisitSummary)
      .then(setVisitSummary)
      .catch(() => {});
  }, []);

  return { weddingDetails, sections, photos, music, visitSummary, families };
}

import { HeartHandshake, Image, LayoutDashboard, Music, Users } from 'lucide-react';

// Icon cho từng tab (id lấy từ navigationRepository).
export const tabIcons = {
  overview: LayoutDashboard,
  info: HeartHandshake,
  guests: Users,
  photos: Image,
  music: Music
};

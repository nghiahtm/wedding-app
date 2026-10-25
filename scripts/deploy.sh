#!/usr/bin/env bash
# Chạy trên server production: lấy mã mới, build lại và khởi động lại các container.
# Dùng: ./scripts/deploy.sh   (hoặc: npm run deploy)
set -euo pipefail
cd "$(dirname "$0")/.."

[ -f .env ] || { echo "Thiếu file .env ở $(pwd) — tạo .env (ADMIN_API_KEY...) trước khi deploy." >&2; exit 1; }

git pull --ff-only
docker compose --profile prod up --build -d
docker image prune -f >/dev/null

# Đợi API báo kết nối MongoDB rồi mới báo xong.
for _ in $(seq 1 20); do
  if docker compose exec -T api node -e "fetch('http://127.0.0.1:4000/api/health').then((r)=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))" 2>/dev/null; then
    echo "Đã deploy xong, API hoạt động."
    docker compose --profile prod ps
    exit 0
  fi
  sleep 3
done
echo "Đã build xong nhưng API chưa trả lời. Xem log: docker compose logs --tail=50 api" >&2
exit 1

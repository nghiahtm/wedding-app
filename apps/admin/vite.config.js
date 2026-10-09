import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
	// Admin chỉ chạy local. Đọc cấu hình từ .env gốc; khóa được proxy gắn vào request, không đưa vào mã trình duyệt.
	const {
		ADMIN_API_KEY = '',
		ADMIN_API_TARGET = 'http://localhost:4000',
		INVITATION_PUBLIC_URL = 'http://localhost:5173'
	} = loadEnv(mode, '../..', '');

	const target = new URL(ADMIN_API_TARGET);
	const isLocalTarget = ['localhost', '127.0.0.1'].includes(target.hostname);
	if (!isLocalTarget && target.protocol !== 'https:') {
		console.warn(`[admin] ADMIN_API_TARGET=${ADMIN_API_TARGET} không dùng HTTPS: khóa quản trị sẽ bị gửi dạng không mã hóa.`);
	}

	return {
		plugins: [react()],
		define: { 'import.meta.env.VITE_INVITATION_URL': JSON.stringify(INVITATION_PUBLIC_URL) },
		server: {
			proxy: {
				'/api': {
					target: ADMIN_API_TARGET,
					changeOrigin: true,
					secure: true,
					headers: ADMIN_API_KEY ? { 'X-Admin-Key': ADMIN_API_KEY } : {}
				}
			}
		}
	};
});

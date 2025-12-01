# Dockerfile
FROM node:18

# تعيين مجلد العمل داخل الحاوية
WORKDIR /app

# نسخ package.json و package-lock.json ثم تثبيت الحزم أولاً لتسريع البناء
COPY package*.json ./

RUN npm ci --only=production

# نسخ باقي الملفات
COPY . .

# نبني إن كان هناك build step (اختياري)
# RUN npm run build

# تعريض المنفذ
EXPOSE 4000

# الأمر الافتراضي لتشغيل التطبيق (في الإنتاج)
CMD ["node", "src/index.js"]

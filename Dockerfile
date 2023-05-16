FROM node:16-alpine

# Установка зависимостей
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --save-dev @tsconfig/node16
RUN npm ci --only=production

# Копирование исходного кода
COPY . .

# Команда запуска приложения
CMD ["npm", "start"]

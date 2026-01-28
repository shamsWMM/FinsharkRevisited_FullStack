# build stage
FROM node:20-alpine AS build
WORKDIR /app/react-app
COPY package.json package-lock.json* ./
RUN npm ci
COPY . .
RUN npm run build


# production stage
FROM node:20-alpine AS production
WORKDIR /app/react-app
COPY --from=build /app/react-app/dist ./dist
COPY package.json package-lock.json* ./
COPY vite.config.ts ./
RUN npm ci

EXPOSE 8080
CMD ["npm", "run", "preview"]
FROM node:latest

RUN mkdir -p /app/src
WORKDIR /app/src
COPY package.json . 
RUN npm install
COPY . .
EXPOSE 9040-9049
CMD ["npm", "start"]
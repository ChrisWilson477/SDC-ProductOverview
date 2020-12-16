FROM node:12.18-alpine

WORKDIR /SDC-ProductOverview/database-postgres


COPY . .


RUN npm install --production




EXPOSE 4000

CMD ["npm", "start"]

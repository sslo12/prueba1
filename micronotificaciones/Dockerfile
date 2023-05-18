FROM node  

EXPOSE 3003

WORKDIR /micronotificaciones

COPY src/controllers /micronotificaciones/controllers
COPY src/models /micronotificaciones/models
COPY src/index.js /micronotificaciones

RUN npm init --yes
RUN npm install express morgan mysql mysql2 axios 

CMD node index.js


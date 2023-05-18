FROM node  

EXPOSE 3004

WORKDIR /microdatos

COPY src/controllers /microdatos/controllers
COPY src/models /microdatos/models
COPY src/index.js /microdatos

RUN npm init --yes
RUN npm install express morgan mysql mysql2 axios 

CMD node index.js


FROM node  

EXPOSE 3001

WORKDIR /microusuarios

COPY src/controllers /microusuarios/controllers
COPY src/models /microusuarios/models
COPY src/index.js /microusuarios

RUN npm init --yes
RUN npm install express morgan mysql mysql2 axios 

CMD node index.js


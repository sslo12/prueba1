FROM node  

EXPOSE 3002

WORKDIR /micropaquetes

COPY src/controllers /micropaquetes/controllers
COPY src/models /micropaquetes/models
COPY src/index.js /micropaquetes

RUN npm init --yes
RUN npm install express morgan mysql mysql2 axios 

CMD node index.js


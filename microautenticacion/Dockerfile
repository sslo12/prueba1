FROM node  

EXPOSE 3000

WORKDIR /microautenticacion

COPY src/controllers /microautenticacion/controllers
COPY src/models /microautenticacion/models
COPY src/index.js /microautenticacion

RUN npm init --yes
RUN npm install express morgan mysql mysql2 axios 

CMD node index.js


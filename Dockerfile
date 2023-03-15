FROM node:16.13.1

ARG WORk_DIR=/frontend
ENV PATH ${WORk_DIR}/node_modules/.bin:$PATH
RUN mkdir ${WORk_DIR}

COPY ./package.json ${WORk_DIR}/package.json
COPY ./package-lock.json ${WORk_DIR}/package-lock.json

RUN npm install @angular/cli
RUN npm install

COPY . ${WORk_DIR}

EXPOSE 4200

CMD ng serve --host 0.0.0.0 



# Dockerfile

# base image
FROM node:alpine

# create & set working directory
RUN mkdir -p /usr/src
WORKDIR /usr/src

# copy source files
COPY . /usr/src

RUN npm build
# install dependencies

RUN npm install

# start app

EXPOSE 80
CMD npm run start

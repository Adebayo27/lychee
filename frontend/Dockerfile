# #stage 1
# FROM node:17-alpine as builder
# WORKDIR /app
# COPY package.json .
# COPY package-lock.json .
# RUN npm install
# COPY . .
# RUN npm run build


# #stage 2
# FROM nginx: 1.19.0
# WORKDIR /usr/share/ngnix/html
# RUN rm -rf ./*
# COPY --from=builder /app/build .
# ENTRYPOINT ["ngnix", "-g", "daemon off;"]
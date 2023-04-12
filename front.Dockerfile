FROM node:alpine

# Create an application directory
WORKDIR /app/frontend

COPY package.json .
COPY package-lock.json .
RUN npm install
RUN npm install -g @angular/cli

COPY . ./

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]
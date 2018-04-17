FROM windy/node-server

# Create app directory
WORKDIR /opt/windyty/scripts/geo-tz-server

# Add Tini
ENV TINI_VERSION v0.17.0
ADD https://github.com/krallin/tini/releases/download/${TINI_VERSION}/tini /tini
RUN chmod +x /tini
ENTRYPOINT ["/tini", "--"]

COPY package*.json ./

RUN npm install

# ### cache end

# Bundle app source
COPY . .

EXPOSE 8100
CMD ["node-server", "server.js"]

module.exports = {
  "war-room-server": {
    input: "http://127.0.0.1:3000/v3/api-docs",
    output: {
      mode: "single",
      target: "./src/index.ts",
      client: "swr",
    },
  },
};

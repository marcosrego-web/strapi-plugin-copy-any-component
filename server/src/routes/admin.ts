export default [
  {
    method: "GET",
    path: "/hello",
    handler: "controller.hello",
    config: {
      policies: [],
    },
  },
];


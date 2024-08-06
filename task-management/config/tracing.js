const {
  Tracer,
  BatchRecorder,
  jsonEncoder: { JSON_V2 },
  ExplicitContext,
} = require("zipkin");
const { HttpLogger } = require("zipkin-transport-http");
const expressMiddleware = require("zipkin-instrumentation-express/src/expressMiddleware");

let tracer;

const initializeTracer = async () => {
  const zipkinBaseUrl = process.env.ZIPKIN_BASEURL;

  const ctxImpl = new ExplicitContext();
  const recorder = new BatchRecorder({
    logger: new HttpLogger({
      endpoint: `${zipkinBaseUrl}/api/v2/spans`,
      jsonEncoder: JSON_V2,
    }),
  });

  tracer = new Tracer({
    ctxImpl,
    recorder,
    localServiceName: process.env.EUREKA_APPNAME,
  });

  console.log("Zipkin tracer initialized");
};
const getTracer = () => {
  if (!tracer) {
    throw new Error("Tracer not initialized");
  }
  return tracer;
};

module.exports = { initializeTracer, getTracer, expressMiddleware };

import { createServer } from "http";
import { once } from "events";
import Person from "./person.js";

const server = createServer(async (request, response) => {
  if (request.method !== "POST" || request.url !== "/persons") {
    response.writeHead(404);
    response.end("not found");
    return;
  }

  try {
    const data = (await once(request, "data")).toString();
    const result = Person.process(JSON.parse(data));
    return response.end(JSON.stringify({ result }));
  } catch (error) {
    if (error.message.includes("required")) {
      response.writeHead(400);
      response.write(
        JSON.stringify({
          validationError: error.message
        })
      );
      response.end();
      return;
    }

    console.error("deu ruim", error);
    response.writeHead(500);
    response.end();
  }
});

export default server;

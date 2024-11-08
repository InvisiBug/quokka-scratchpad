// const localBffUrl = "http://localhost:8082/api?_ak=Q5vPQGFHSYfsasIo";
const localBffUrl = "https://apitbd.betfair.com.nxt.ppbdev.com/api/tbd/bff-gql/v6/?_ak=K61C39rIC0WKzoQ7";

export const makeRequest = async ({ query, sportVariables, overrideVariables = {} }: Args) => {
  try {
    const start = Date.now();

    const variables = {
      ...sportVariables,
      ...overrideVariables,
    };

    const response = await fetch(localBffUrl, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    // console.log(response);

    const responseTime = Date.now() - start;
    // console.log(response);

    const contentLength: number = parseInt(response.headers.get("content-length") || "");
    // console.log("Content Length:", response.headers);

    // Read the response body as a buffer
    const buffer = await response.arrayBuffer();
    const encodedBodySize = buffer.byteLength;
    // console.log("Encoded Body Size:", encodedBodySize);

    // Convert the buffer to a string and parse it as JSON
    const text = new TextDecoder().decode(buffer);
    const { errors, data } = JSON.parse(text);
    // console.log("Data", data);

    if (errors) {
      console.log(errors);
    }

    return { errors, data, responseTime, contentLength, encodedBodySize };
  } catch {
    return { errors: undefined, data: undefined, responseTime: undefined, contentLength: undefined, encodedBodySize: undefined };
  }
};

interface Args {
  query: {};
  sportVariables: {};
  overrideVariables: {};
}

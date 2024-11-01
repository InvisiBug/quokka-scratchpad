const localBffUrl = "http://localhost:8082/api?_ak=Q5vPQGFHSYfsasIo";

export const makeRequest = async ({ query, sportVariables, overrideVariables = {} }: Args) => {
  const start = Date.now();

  const variables = {
    ...sportVariables,
    ...overrideVariables,
  };

  const response = await fetch(localBffUrl, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  // console.log(response);

  const responseTime = Date.now() - start;

  const contentLength: number = parseInt(response.headers.get("content-length") || "");

  const { errors, data } = await response.json();

  if (errors) {
    // console.log(errors);
  }

  return { errors, data, responseTime, contentLength };
};

interface Args {
  query: {};
  sportVariables: {};
  overrideVariables: {};
}

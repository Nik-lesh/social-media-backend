// funtion to write browser cashe for get request

export const cashe = (req, res, next) => {
  if (req.method === "GET") {
    res.set("Cache-Control", "public, max-age=3600");
  } else {
    res.set("Cache-Control", "no-cache, no-store, must-revalidate");
  }
  next();
};

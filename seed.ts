import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.listen(3000, () => {
  console.log("listening on port 3000");
});

app.use(express.json());
/* app.use(express.urlencoded({ extended: true }))
 */
app.get("/", (req, res) => {
  res.send("hola mundo");
});

app.post("/post", async (req, res) => {
  try {
    const { title, year, duration } = req.body;
    const result = await prisma.movie.create({
      data: {
        title,
        year,
        duration,
      },
    });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.send(error);
  }
});

app.put("/post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, year, duration } = req.body;
    const post = await prisma.movie.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        year,
        duration,
      },
    });
    res.send(post);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.delete("/post/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await prisma.movie.delete({
      where: { id: Number(id) },
    });
    res.json("eliminado");
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

/* 
const newMovie = await prisma.movie.create({
    data: {
        title: "The Incredibles",
        duration: 124,
        year: 2004,
        
    }
});
 */
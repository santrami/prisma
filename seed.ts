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
  const { title, year, duration } = req.body;
  const result = await prisma.movie.create({
    data: {
      title,
      year,
      duration,
    },
  });
  res.json(result);
});

app.delete('/post/:id', async (req, res) => {
    const {id}= req.params;
    const post = await prisma.movie.delete({
        where: {id:Number (id)}
    });
    res.json('eliminado');
})

/* 
const newMovie = await prisma.movie.create({
    data: {
        title: "The Incredibles",
        duration: 124,
        year: 2004,
        
    }
});
 */

import express from 'express';
import {PrismaClient} from '@prisma/client'

const app= express();

app.listen(3000, ()=>{
    console.log('listening on port 3000');
    
});
const prisma = new PrismaClient();

app.use(express.json())
/* app.use(express.urlencoded({ extended: true }))
 */
app.get('/', (req, res) => {
    res.send('hola mundo');
})

app.post('/post', async(req, res) => {
    const {title, year, duration}= req.body;
    const result = await prisma.movie.create({
        data: {
            title, year, duration
        }
    });
    res.json(result)
});

console.log('listening on port 3000');

/* 
const newMovie = await prisma.movie.create({
    data: {
        title: "The Incredibles",
        duration: 124,
        year: 2004,
        
    }
});
 */
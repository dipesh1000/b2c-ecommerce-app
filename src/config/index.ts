let SECRET_KEY = process.env.SECRET_KEY
export const MONGO_URI=`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vukvwps.mongodb.net/?retryWrites=true&w=majority`;
export const SECRET_JWT_KEY=SECRET_KEY


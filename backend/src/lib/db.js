import mongoose from 'mongoose'

export const CONNECTDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected successfully `)
    } catch (error) {
        console.error('Erro connection to MONGODB', error)
        process.exit(1);
    }
}
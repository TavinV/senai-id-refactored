import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const uri = process.env.MONGODB_CONNECTION;
        await mongoose.connect(uri, { dbName: "senaiid_db" });
        console.log("Conexão com o banco de dados estabelecida com sucesso.");
    } catch (err) {
        console.error("Conexão com o banco de dados falhou.", err);
        process.exit(1); // Finaliza o processo em caso de erro
    }
};

export default connectDB;
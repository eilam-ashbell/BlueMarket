class Config {
    public dbName = "shopping"
    public connectionString = "mongodb://127.0.0.1:27017/" + this.dbName; 
    public port = 3001;
}

const config = new Config();

export default config;

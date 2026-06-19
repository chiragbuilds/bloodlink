const app = require("./app")
const config = require('./utils/config')

app.listen(config.PORT, ()=>{
    console.log(`app is running on port ${config.PORT}`)
    console.log(`URL : http://localhost:${config.PORT}`)
})
const SampleData1API = require( "./DataExtraction/SampleInvoke");
const http = require("http");
const express = require("express");
const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

app.listen(PORT, (res) => {
    console.log("Server running on port 3001");
});
app.get("/pepStatus", (req, res, next) => {
    let name = req.query.name.replace(/'/g, '"');
   SampleData1API.getPosts(name).then(() => {
            console.log(SampleData1API.dataSetInfo);
            if(SampleData1API.dataSetInfo.length !==0) {
                res.json(SampleData1API.dataSetInfo);
                while (SampleData1API.dataSetInfo.length) {
                    SampleData1API.dataSetInfo.pop();
                }
            }else{
                res.json({"message":"Person not found!"});
            }
        });
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });

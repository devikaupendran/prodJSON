let http = require('http');
let fs = require('fs');

let index_html = fs.readFileSync('./Template/index.html','utf-8'); // reading index.html page
let productDetailsJson = JSON.parse(fs.readFileSync('./Data/productDetails.json','utf-8')); // reading js file and convert into js array of Object
let productDetailsHtml = fs.readFileSync('./Template/productDetails.html','utf-8'); //reading details of product

let productArray = productDetailsJson.map((prod) =>{
    let output = productDetailsHtml.replace('{{%IMAGE%}}',prod.productImage)
    output = output.replace('{{%NAME%}}',prod.name);
    output = output.replace('{{%MODELNAME%}}',prod.modeName);
    output = output.replace('{{%MODELNO%}}',prod.modelNumber);
    output = output.replace('{{%SIZE%}}',prod.size);
    output = output.replace('{{%CAMERA%}}',prod.camera);
    output = output.replace('{{%PRICE%}}',prod.price);
    output = output.replace('{{%COLOR%}}',prod.color);

    return output;
})
let server = http.createServer( (req,res) =>{
    let path = req.url;
    if( path === '/' || path.toLocaleLowerCase() === '/home'){
        res.writeHead(200,'OK',{'Content-Type' : 'text/html'})
        res.end(index_html.replace('{{%CONTENT%}}','This is Home page'));
    }
    else if( path.toLocaleLowerCase() === '/about'){
        res.writeHead(200,'OK',{'Content-Type' : 'text/html'})
        res.end(index_html.replace('{{%CONTENT%}}','This is About page'));
    }
    else if( path.toLocaleLowerCase() === '/contact'){
        res.writeHead(200,"OK",{ 'Content-Type' : 'text/html'})
        res.end(index_html.replace('{{%CONTENT%}}','This is Contact page'));
    }
    else if( path.toLocaleLowerCase() === '/products'){
        let htmlResponse = index_html.replace('{{%CONTENT%}}',productArray.join(','))
        res.writeHead(200,'Ok',{'Content-Type' : 'text/html'});
        res.end(htmlResponse);
    }
    else{
        res.writeHead(404,'ERROR',{'Content-Type' : 'text/html'})
        res.end(index_html.replace('{{%CONTENT%}}','404 :Page Not Found'));
    }
});

server.listen(3000,'127.0.0.1',() => {
    console.log("Server has started");
});
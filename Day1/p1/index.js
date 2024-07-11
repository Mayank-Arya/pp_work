const http = require('http')

const server = http.createServer((req,res) => {
    res.write(200, {'Content-type': 'text/plan'});
    res.end('Hello World!!')
})


server.listen(9090, () => {
    console.log('Server running on 9090')
})
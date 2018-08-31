let Parser = require('rss-parser');
let parser = new Parser();
async function getRss(io) {
    var feed = await parser.parseURL('https://www.sydsvenskan.se/rss.xml?latest=1&id=b322c84f-7e97-4af6-a23a-62f61504a910');
    if(feed.items.length > 0){
        io.sockets.emit('rss', feed)
    }
}
module.exports.rss = io => {
    getRss(io);
}
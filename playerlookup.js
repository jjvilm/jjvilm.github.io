url = 'https://www.wildernessp2e.com:5001/highscore'

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
db = httpGet(url)
console.log(db)

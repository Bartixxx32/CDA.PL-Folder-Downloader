var moment = require('moment');
var fs = require('fs');
var url = require('url');
var util  = require('util');
var Crawler = require("crawler");
var request = require('request').defaults({jar: true});
var progress = require('request-progress');
var setCookie = require('set-cookie-parser');
var readlineSync = require('readline-sync');
var cookies;
var js_beautify = require("js-beautify").js_beautify;

var downloads = {};
var filenamePrefix = "";
var title; 
var savedResult = "";

function findBetween(strToParse, strStart, strFinish) {
    var str = strToParse.match(strStart + "(.*?)" + strFinish);
    if (str===null) return "";
    if (str.length < 2) return "";
    return str[1];
}

function rot13(str) {
  var input     = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  var output    = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm';
  var index     = x => input.indexOf(x);
  var translate = x => index(x) > -1 ? output[index(x)] : x;
  return str.split('').map(translate).join('');
}

    ma = function(a) {
        a = a.replace(".cda.mp4", "");
        a = a.replace(".2cda.pl", ".cda.pl");
        a = a.replace(".3cda.pl", ".cda.pl");
        return "https://" + a + ".mp4"
    }
	ia = function(a) {
        for (var b = [], e = 0; e < a.length; e++) {
            var f = a.charCodeAt(e);
            b[e] = 33 <= f && 126 >= f ? String.fromCharCode(33 + (f + 14) % 94) : String.fromCharCode(f)
        }
        return ma(b.join(""))
    }
	ja = function(a) {
        String.fromCharCode(("Z" >= a ? 82 : 132) >= (c = a.charCodeAt(0) + 11) ? c : c - 55);
        return ia(a)
    }
    la = function(a) {
        return decodeURIComponent(a)
    }
    ka = function(a) {
        return ja(la(L(a)))
    }
    L = function(a) {
        return a.replace(/[a-zA-Z]/g, function(a) {
            return String.fromCharCode(("Z" >= a ? 90 : 122) >= (a = a.charCodeAt(0) + 13) ? a : a - 26)
        })
    }
	M = function(a) {
        String.fromCharCode(("Z" >= a ? 11 : 344) >= (c = a.charCodeAt(0) + 22) ? c : c - 11);
        a = a.replace("_XDDD", "");
        a = a.replace("_CDA", "");
        a = a.replace("_ADC", "");
        a = a.replace("_CXD", "");
        a = a.replace("_QWE", "");
        a = a.replace("_Q5", "");
        a = a.replace("_IKSDE", "");
        a = ka(L(a));
        return a;
    }

function downloadMovie(movieURL) {
    // in 2020 urls use M()
    if (M(movieURL)==M("")) {
    	throw "empty movieURL";
    }
    if (M(movieURL).includes(".mp4")) {
    	console.log("input:\t", movieURL);
    	movieURL = M(movieURL);
    	console.log("M():\t", movieURL);
    	// url has extra 3 characters before extension just to get HTTP 302 
    	//movieURL = movieURL.replace(".mp4","").slice(0,-3)+".mp4";
    	//console.log("trim3:", movieURL);
    }
    // in 2019 urls are ROT13 encoded
    if (movieURL.startsWith("uggc")) {
    	console.log("input:\t", movieURL);
    	movieURL = rot13(movieURL);
    	console.log("rot13:\t", movieURL);
    	// url has extra 3 characters before extension just to get HTTP 302 
    	movieURL = movieURL.replace(".mp4","").slice(0,-3)+".mp4";
    	console.log("trim3:\t", movieURL);
    }
    if (movieURL===null || movieURL==="" || movieURL.indexOf(".mp4")===-1) {
    	console.log("aborting, bad videourl:", movieURL);
	 	fs.writeFileSync('result.html', savedResult, {flags:'w+'});
        return;
    }
    console.log("v.url:\t", movieURL);
	var startTime = process.hrtime();
    var fl = movieURL.split("?")[0].split("/").pop().trim();

    filenamePrefix = title.replace(/[^a-z0-9]/gi, '.');

    fl = filenamePrefix + "." + fl.split("/").pop().trim();
    fl = (title + ".mp4")
    console.log("outfile:", fl);
    fs.appendFileSync('lista.txt', movieURL+'\r\n');
    fs.appendFileSync('lista.txt', " out="+fl+'\r\n');
    process.exit()

}


var c = new Crawler({
    userAgent: 'cdadl', // Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.87 Safari/537.36
    encoding: null,
    maxConnections: 1,
    // This will be called for each crawled page
    callback: function(error, result, $) {

	savedResult = result.body;

    try{
        if (result.uri.indexOf("?wers") == -1) {
            // first get the formats

            cookies = setCookie.parse(result);

            var formatArr = [];
            $('a.quality-btn').each(function() {
            	formatArr.push($(this).html());
    		});
    		if (formatArr.length===0) formatArr.push("unknown");
   			console.log("formats:  "+formatArr.join(" ") );

    		// if format is passed into command line
    		if (process.argv.length>3 && formatArr.indexOf(process.argv[3])>-1)
    		{
    		    var fmt=process.argv[3];
                if ($("a.quality-btn:contains("+fmt+")").length) {
                    $("a.quality-btn:contains("+fmt+")").last().each(function(a) {
                        c.queue(this.attribs.href);
                        return;
                    });
                }
    		}
			else
			{
        		// if not get the best
                if ($("a.quality-btn").length) {
                    $("a.quality-btn").last().each(function(a) {
                        //console.log(this.attribs.href);
                        c.queue(this.attribs.href);
                        return;
                    });
                } else {
                	// get anything
                    c.queue(result.uri + "?wers");
                }
            }
        } else {
            //console.log(result.body);
            // then get the video
            title = $("title").text();
            console.log("title:    " + title);
            console.log("fetching: " + result.uri);
            //$("[id^=mediaplayer]").each((a,e)=>{ console.log("e:"+e.attribs.id); });
            $("[id^=mediaplayer]").first().each(function(a) {
                var movieURL = "";
            	try{
	               	var id = this.attribs.id;
    	            var ss = "document.getElementById\\(\\'" + this.attribs.id + "\\'\\).href = \\'";
        	        movieURL = findBetween(result.body, ss, "\\';");
                	downloadMovie(movieURL);
                } catch(ex) {
                	console.log("first method failed:"+ex);
                }

                try {
                	if (movieURL===null || movieURL==="")
	                {
    	            	movieURL = JSON.parse(this.attribs.player_data).video.file;
        	        	//console.log(this.attribs.player_data);
//	 	fs.writeFileSync('result.html', result.body, {flags:'w+'});
//        process.exit();
//						movieURL = movieURL.slice(0,-2);
            	        downloadMovie(movieURL);
                	}
                } catch (ex) {
                    console.log("second method failed:"+ex);
                }
            });

            try {
                /* old method didn't work so try with new one. its obfuscated JS so use http://deobfuscatejavascript.com/# */
                var output="";
                DEOBEVILJS = eval;
                eval = function(input_string){var out = js_beautify(input_string); output = out;};
                window = {};
                document = {};
                window.eval = function(input_string){var out = js_beautify(input_string); output = out;};
                write = function(input_string){var out = js_beautify(input_string); output = out;};
                document.write = function(input_string){var out = js_beautify(input_string); output = out;};
                writeln = function(input_string){var out = js_beautify(input_string); output = out;};
                document.writeln = function(input_string){var out = js_beautify(input_string); output = out;};
                createPopup = function(input_string){var out = js_beautify(input_string); output = out;};
                window.createPopup = function(input_string){var out = js_beautify(input_string); output = out;};
                createElement = function(input_string){var out = js_beautify(input_string); output = out;};
                document.createElement = function(input_string){var out = js_beautify(input_string); output = out;};
                appendChild = function(input_string){var out = js_beautify(input_string); output = out;};

                var script = $("script").text();
                if (script!==null && script.indexOf("eval(function(p,")>-1) {
                    var code = "eval(function(p,a,c,k,e,d)" + script.split("eval(function(p,a,c,k,e,d)")[1].split("\n")[0];
                    DEOBEVILJS(code); // 'output' holds the result
                    url = output.split('<video src="')[1].split('" style="')[0];
                    downloadMovie(url);
                }
            } catch (ex) {
                console.log("third method failed");
                console.log(ex);
            }
        }
    }
    catch (ex) {
    	console.error("unexpected error happend, see result.html and investigate the website");
	 	fs.writeFileSync('result.html', result.body, {flags:'w+'});
        console.log(ex);
        process.exit();
    }
    }
});


// start
if (process.argv.length<3)
{
	console.log("syntax: cdadl URL [format] [filename-prefix]");

	// process.argv[0] exe
	// process.argv[1] script
	// process.argv[2] url
	// process.argv[3] format
	// process.argv[4] prefix

	process.exit();
}

paramurl = process.argv[2];
if (process.argv.length>3) filenamePrefix = process.argv[process.argv.length-1] || "";

if (paramurl.substring(0, 4) != "http") {
    console.error("O gosh, there is no URL");
    var paramurl = readlineSync.question('Enter URL or video ID now:');
}

if (paramurl.length > 0) {
    var s = paramurl.split("/");
    paramurl = "http://ebd.cda.pl/666x666/" + s.pop();
    //console.log(paramurl);
    c.queue(paramurl);
} else {
    process.exit();
}

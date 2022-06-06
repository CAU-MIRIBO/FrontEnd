var $jscomp = {
    scope: {},
    findInternal: function (a, d, c) {
        a instanceof String && (a = String(a));
        for (var g = a.length, f = 0; f < g; f++) {
            var l = a[f];
            if (d.call(c, l, f, a)) return { i: f, v: l };
        }
        return { i: -1, v: void 0 };
    },
};

$jscomp.defineProperty =
    "function" == typeof Object.defineProperties
        ? Object.defineProperty
        : function (a, d, c) {
              if (c.get || c.set) throw new TypeError("ES3 does not support getters and setters.");
              a != Array.prototype && a != Object.prototype && (a[d] = c.value);
          };
$jscomp.getGlobal = function (a) {
    return "undefined" != typeof window && window === a ? a : "undefined" != typeof global && null != global ? global : a;
};

$jscomp.global = $jscomp.getGlobal(this);

$jscomp.polyfill = function (a, d, c, g) {
    if (d) {
        c = $jscomp.global;
        a = a.split(".");
        for (g = 0; g < a.length - 1; g++) {
            var f = a[g];
            f in c || (c[f] = {});
            c = c[f];
        }
        a = a[a.length - 1];
        g = c[a];
        d = d(g);
        d != g && null != d && $jscomp.defineProperty(c, a, { configurable: !0, writable: !0, value: d });
    }
};
//
$jscomp.polyfill(
    "Array.prototype.find",
    function (a) {
        return a
            ? a
            : function (a, c) {
                  return $jscomp.findInternal(this, a, c).v;
              };
    },
    "es6-impl",
    "es3"
);

$(function () {
	//loading func
    function a(a) {
        a.prepend('<div id="lp-loading-screen"><div id="lp-loading-screen-icon"></div><div id="lp-loading-screen-message">Loading... Please Wait.</div></div>');
        a = $("#lp-loading-screen");
        var c = $("#lp-loading-screen-icon"),
            b = $("#lp-loading-screen-message");
        a.css({ "align-items": "center", background: "#fff", display: "flex", "flex-direction": "column", height: "100%", "justify-content": "center", position: "absolute", width: "100%", "z-index": "100" });
        /*c.css({ animation: "spin 0.3s linear infinite", "border-radius": "50%", "border-top": "3px solid #010451", height: "50px", margin: "0 auto", width: "50px" });
        b.css({ color: "#010451", "margin-top": "16px" });*/
        return a;
    }

	function loadingState1(a){
		a.prepend('<div id="status_loading1" style="position: absolute; left: 2%; top: 50%; transform: translate(-3%,-50%); z-index: 100"> <img src="" alt="Why..." width="20" height="20"></div>');
		$("#status_loading1 img").attr("src", chrome.runtime.getURL("/img/status/yellow.png"));
		console.log("YELLOW print1");

		return a;
	}
	function loadingState2(a){
		a.prepend('<div id="status_loading2" style="position: absolute; left: 2%; top: 50%; transform: translate(-3%,-50%); z-index: 100"> <img src="" alt="Why..." width="20" height="20"></div>');
		$("#status_loading2 img").attr("src", chrome.runtime.getURL("/img/status/yellow.png"));
		console.log("YELLOW print2");

		return a;
	}
	function loadingState3(a){
		a.prepend('<div id="status_loading3" style="position: absolute; left: 2%; top: 50%; transform: translate(-3%,-50%); z-index: 100"> <img src="" alt="Why..." width="20" height="20"></div>');
		$("#status_loading3 img").attr("src", chrome.runtime.getURL("/img/status/yellow.png"));
		console.log("YELLOW print3");

		return a;
	}
	function loadingState4(a){
		a.prepend('<div id="status_loading4" style="position: absolute; left: 2%; top: 50%; transform: translate(-3%,-50%); z-index: 100"> <img src="" alt="Why..." width="20" height="20"></div>');
		$("#status_loading4 img").attr("src", chrome.runtime.getURL("/img/status/yellow.png"));
		console.log("YELLOW print4");

		return a;
	}




	//add message
    function d(a, c) {
        a.prepend('<div id="lp-action-screen">' + c + "</div>");
        var b = $("#lp-action-screen");
        b.css({
            "align-items": "center",
            background: "rgba(0, 0, 0, 0.8)",
            color: "#fff",
            display: "flex",
            "flex-direction": "column",
            "font-size": "19px",
            height: "100%",
            "justify-content": "center",
            position: "absolute",
            width: "100%",
            "z-index": "1000001",
        });
        return b;
    }


    function f() {
        void 0 != w && w && clearTimeout(w);
        void 0 != y && y && clearTimeout(y);
        void 0 != n && n && n.remove();
        void 0 != p && p && (p = !1);
        void 0 != q && q && (q = !1);
        void 0 != k && k && (k = !1);
        void 0 != x && x && x.css("cursor", "pointer");
    }

    function l() {
        (void 0 != k && k) ||
            (w = setTimeout(function () {
                f();
            }, (1e3 * 0.5) / 2));
    }


	//--------------------------------- Title 받아오기 --------------------------------
	function get_title(url1){
        var title='Click Here to Enter Webpage'
        try{
            $.ajax({
                type: 'get',
                url:"https://proxyformiribo.herokuapp.com/"+url1,
                async: true,
                //data: 'JSONP',
                success: function(result){
                        
                    console.log("[Get Title Response] : [Success]")

                    let parser=new DOMParser();
                    const doc=parser.parseFromString(result, 'text/html');
                    try{
                        title1=doc.querySelector('meta[property~="og:title"]').content;
                        if(!title1){
                            console.log(title1)
							$("#boxTitle-link").text(title1);
                            //return title1;
                        }
                    }
                    catch{
                        // maybe no og:title
                    }

                    try{
                        title2=doc.querySelector('title').innerText;
                    } catch{
                        //no title
                        title2=title
                    }
                        
                    console.log(title2)
					$("#boxTitle-link").text(title2);
                    //return title2
                      
                },
                error : function(e){
                    console.log("[Get Title Resoonse] : [Fail] ");  
					$("#boxTitle-link").text(title);
                    //return title             
                }
            });
        } catch (e){
            console.log("[Weird Error : OMG No~ ]: "+e.message);
        }
	}



	//----------------------------- option 1 & 2 ---------------------------------------
	function summary(url, option1, option2, setOption){
		var postdata = {
            'url':url.toString(),
            'option1':option1,
            'option2':option2
			}

        //outputs - if output get in here done! =====  THIS IS OUTPUT DATA
        var keywords;
        var summary;

		if(setOption==1){
			loadingState1($("#status"));
		}
		if(setOption==2){
			loadingState2($("#status"));
		}


        $.ajax({
            type: 'POST',
            url:'http://127.0.0.1:5000/ajax',
            async: true,
            data: JSON.stringify(postdata),
            dataType : 'JSON',
            contentType: "application/json",
            headers : {
                'Access-Control-Allow-Origin' : '*'
            },
            success: function(data){

                //console.log("[requestPostBodyJson] : [result] : Success !!: "+data.status);
                //console.log('option1 : ' + data.option1)
                //console.log('option2 : ' + data.option2)

                keywords=data.option1;
                summary=data.option2;

                if(setOption==1){
					$("#loadingclass1").remove();
					if(keywords == "null"){
						var div = document.createElement("div");
						div.innerHTML='<div id="NoResult">\nNo Result</div>\n';
						$("#lp-box-keyword").append(div).on("load", function(){ $("#status_loading1").remove(); });
					}
					else{
						//var resT1 = JSON.stringify(keywords);
						var resT1 = JSON.parse(keywords);
						//console.log("KEYWORD!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
						KeywordUI(resT1);
					}
					
                }
                else if (setOption==2){
					if(summary == "null"){
						var div = document.createElement("div");
						div.innerHTML='<div id="NoResult">\nNo Result</div>\n';
						$("#lp-box-summarize").append(div);
						$("#status_loading2").remove(); 
						console.log("loading2 remove");
					}
					else {
						var U = url.toString();
						//console.log("Summary result type : " + text);

						if(U.includes('stackoverflow.com/questions/')){
							var text = JSON.parse(summary);
							console.log("STACKOVERFLOW!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
							stack_op2_tidy(text);
						}
						else {
							console.log("no stackoverflow");
							$("#loadingclass2").remove();
							$("#lp-box-summarize").text(summary);
							$("#status_loading2").remove();
							console.log("loading2 remove");
						}
					}
					
					
                }
            },
            error : function(request, status, error){
                //alert(error.responseText)
                console.log(error);
                console.log("[requestPostBodyJson] : [error] : Failed Sorry");    
				
				var div = document.createElement("div");
				div.innerHTML='<div id="NoResult">\nNo Result</div>\n';	

				if(setOption==1){		
					$("#loadingclass1").remove();
					$("#lp-box-keyword").append(div).on("load", function(){ $("#status_loading1").remove(); });
				}
				if(setOption==2){
					$("#loadingclass2").remove();
					$("#lp-box-summarize").append(div).on("load", function(){ $("#status_loading2").remove(); });
				}
            },
            complete : function(data, textStatus){
                console.log("[requestPostBodyJson] : [complete] : Done anyway");
            }    
        });
	
	}

	//keyword UI
	function KeywordUI(result){
		str = result;
		$("#loadingclass1").remove();
		//console.log("keyword result type : " + typeof(result) + result);
		
		
		for(var i in str['keywords']){
			tmp=JSON.stringify(str['keywords'][i]);
			tmp=JSON.parse(tmp);

			//console.log("keyword result type : !!!!!!!!!!!!!!!!!!!!!!!!!" + tmp);
			var div = document.createElement("div");
			div.className= 'inline-block';
            div.innerHTML=
				'<div id="keyword">\n'+
				tmp+
				'</div>\n';

			$("#lp-box-keyword").append(div);
		}
		$("#status_loading1").remove();
	}


	//옵션2 그중에서도 Stackoverflow
	function stack_op2_tidy(text){
		$("#loadingclass2-2").remove();
		str=text;
        //console.log(str);

        //제목
        //$("#lp-box-summarize").append(str['header']['header']+"<br><br>");
            
        //ask
        $("#lp-box-summarize-SF").append("<b>Question</b>");
		$("#lp-box-summarize-SF").append("<div>");
        //paragraph, code 마다 구별해서 html 에 출력
        for (var i in str['id']['ask']){
			if(str['id']['ask'][i]==0){
				tmp=JSON.stringify(str['text']['ask'][i]);
				tmp=replaceBrTag(tmp); //엔터 위해
				tmp=JSON.parse(tmp);
				$("#lp-box-summarize-SF").append(tmp);
			}
			else {
				tmp=JSON.stringify(str['text']['ask'][i]);
                tmp=replaceBrTag(tmp);
                tmp=JSON.parse(tmp);

                var div = document.createElement("div");
                div.innerHTML=
					'<details>\n'+
					'<summary>Code</summary>\n'+
					tmp+'\n'+
					'</details>\n';

                $("#lp-box-summarize-SF").append(div);
            }
        }

        $("#lp-box-summarize-SF").append("</div>");
        
		$("#lp-box-summarize-SF").append("<br>=======================================================");
        //ans
        $("#lp-box-summarize-SF").append("<br><b>Answer</b>");
        $("#lp-box-summarize-SF").append("<div>");

        for (var i in str['id']['ans']){
            if(str['id']['ans'][i]==0){
                //console.log(str['text']['ans'][i]);
                tmp=JSON.stringify(str['text']['ans'][i]);
                tmp=replaceBrTag(tmp);
                tmp=JSON.parse(tmp);
                $("#lp-box-summarize-SF").append(tmp);
            }
            else{
                tmp=JSON.stringify(str['text']['ans'][i]);
                tmp=replaceBrTag(tmp);
                tmp=JSON.parse(tmp);

                var div = document.createElement("div");

                div.innerHTML=
                    '<details>\n'+
                    '<summary>Code</summary>\n'+
                    tmp+'\n'+
                    '</details>\n';

                $("#lp-box-summarize-SF").append(div);
 
            }
        }

        $("#lp-box-summarize-SF").append("</div>");
		$("#status_loading2").remove(); 
		console.log("loading2 remove");
	}
	function replaceBrTag(str) {
		if(str==undefined||str==null){
                return "";
        }
        str=str.replace(/\r\n/ig,'<br>');
        str=str.replace(/\\n/ig,'<br>');
        str=str.replace(/\n/ig,'<br>');

        //console.log(typeof(str))
        var sliceStr = str.substr(str.length-2,1);
        //console.log(sliceStr)
        if(sliceStr!='>'){
             str=str.substr(0,str.length-1);   //"
             str=str.concat("<br>");
             str=str.concat("\"");
             //console.log(str)
        }
        return str;
    }


	

	
	//----------------------------- option 3 ------------------------------------

	//현재 페이지의 검색어 찾기
	function findSearchword(){
		var SearchwordInUrl = decodeURI(window.location.search);

		var swSplit = SearchwordInUrl.split('&');
		var SearchwordBefore = swSplit[0];
		var SearchWord='';

		for(var i=3; i<SearchwordBefore.length; i++){
			if(SearchwordBefore[i] != '%'){
				if(SearchwordBefore[i] == '+'){
					SearchWord = SearchWord + ' ';
				}
				else{
					SearchWord = SearchWord + SearchwordBefore[i];
				}
				
			}
			else if(SearchwordBefore[i] == '%'){
				var n = SearchwordBefore[i+1] + SearchwordBefore[i+2];
				SearchWord = SearchWord + String.fromCharCode(n);

				i = i+2;
			}
		}
		return SearchWord;
	}

    var search_word;    
    var stopwords=['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', "you're", "you've", "you'll", "you'd", 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', "she's", 'her', 'hers', 'herself', 'it', "it's", 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', "that'll", 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', "don't", 'should', "should've", 'now', 'd', 'll', 'm', 'o', 're', 've', 'y', 'ain', 'aren', "aren't", 'couldn', "couldn't", 'didn', "didn't", 'doesn', "doesn't", 'hadn', "hadn't", 'hasn', "hasn't", 'haven', "haven't", 'isn', "isn't", 'ma', 'mightn', "mightn't", 'mustn', "mustn't", 'needn', "needn't", 'shan', "shan't", 'shouldn', "shouldn't", 'wasn', "wasn't", 'weren', "weren't", 'won', "won't", 'wouldn', "wouldn't"]
	
	// 가장 중요한 함수!!
    function load_ajax(url1, search_word1, cmd1, cmd2) {
        try{
			$.ajax({
				type: 'get',
				url:"https://proxyformiribo.herokuapp.com/"+url1,
				async: true,
				//data: 'JSONP',
				success: function(result){

					//console.log("[requestPostBodyJson] : [result] : Success");
					output=result;

					if(cmd1==1 || cmd1==2){
					//output 1: show keyword paragraph =====================================
					search_word = search_word1;
						if (!!search_word){
							var search_sen=find_search_word(cmd1, output);
							//console.log('NULL!!!!!!!!!!!!!!!!!!!!!!!!!!!!' + typeof(search_sen)+search_sen);

							if(Object.keys(search_sen).length === 0){
								$("#lp-box-sentance").empty();
								//console.log('NULL!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
								var div = document.createElement("div");
									div.innerHTML='<div id="NoResult">\nNo Result</div>\n';
									$("#lp-box-sentance").append(div).on("load", function(){ 
										$("#status_loading3").remove(); 
										console.log("status 3 remove");
									});
									$("#status_loading3").remove(); 
										console.log("status 3 remove");
							}
							else{
								try{
								// <<<<<<<<<<<<<<< 검색어 출력부 >>>>>>>>>>>>>>>>>>
								//$('#search_word_area').css('height', '100')
								$("#lp-box-sentance").html(search_sen).on("load", function(){ 
									$("#status_loading3").remove(); 
									console.log("status 3 remove"); 
								});
								$("#status_loading3").remove(); 
								console.log("status 3 remove");
								}catch{
									console.log('search word display error catch')
								}
								search_word='';
							}	
						}
					}

					if(cmd2==1){
						// output 2 : show entire webpage preview================================
						var display_html;
						var urlStr = url1.toString();

						//case 1 - stackoverflow
						if(urlStr.includes('stackoverflow.com/questions/')){
							display_html=stackoverflow_filtering(output);
						}
						//case 3 - all case
						else{
							display_html=show_page();
						}
						// Display 하는 부분
						try{
							//$("#whole_preview_frame").attr('srcdoc', display_html.outerHTML);
							display_preview_on_screen(1, display_html, url1);
						}catch{
							console.log('all display error catch');
						}
					}
				},
				error : function(e){
					//alert(e.responseText)
					console.log(e);
					console.log("[requestPostBodyJson] : [error] : Fail >> "+e.statusText);
					//$("#whole_preview_frame").attr('src', url1);
				},
				complete : function(data, textStatus){
					console.log("[requestPostBodyJson] : [complete]");
				}
			});
		} catch (e){
		console.log("[Weird Error : OMG No~ ]: "+e.message);
		}
	}

    // display on screen <<<<<<<<<<<<<<<< 전체 미리보기 출력부 >>>>>>>>>>>>>>>>>>>>>>>>>
	//이전버전
	/*
    function display_preview_on_screen(option, display_html, url){
		var e = $("#lp-box-content");
		var t = a(e);
		t.remove();

		
		var urlStr = url.toString();
		if(urlStr.includes("stackoverflow")){
			try{
				$("#whole_preview_frame").css('sandbox' , 'allow-scripts allow-same-origin');
				$("#whole_preview_frame").attr('srcdoc', display_html.outerHTML).on("load", function(){ 
					$("#status_loading4").remove();
					console.log("status 4 remove");
				});
				return
			}catch{
				console.log('cannot display with 1.')
			}
		}
		else if (urlStr.includes("velog.io") || urlStr.includes('quora.com')){
			try{
				$("#whole_preview_frame").attr('src', url).on("load", function(){ 
					$("#status_loading4").remove(); 
					console.log("status 4 remove");
				});
				return
			}catch{
				console.log('cannot display with 2.');
			}
		}
		else{
			try{    // 일단 1번 --> 거의 얘로 돌아가
				console.log("!!!!!!!!!!!!!!!!!!!!!!!!INTO page load start   " + url);
				$("#whole_preview_frame").attr('srcdoc', display_html.outerHTML).on("load", function(){ 
					$("#status_loading4").remove(); 
					console.log("status 4 remove");
				});
			} catch {
				console.log("cannot display with 1")
			}
			try{    // 2번
				$("#whole_preview_frame").attr('src', url).on("load", function(){ 
					$("#status_loading4").remove(); 
					console.log("status 4 remove");
				});
				return
			}catch{
				console.log('cannot display with 2')
			}
		}
    }*/


	//새버전
	// display on screen <<<<<<<<<<<<<<<< 전체 미리보기 출력부 >>>>>>>>>>>>>>>>>>>>>>>>>
    function display_preview_on_screen(option, display_html, url){

        var url = url.toString();
        //$("#whole_preview_frame").css('height', '400')
        if(url.includes("stackoverflow")){
            try{
                $("#whole_preview_frame").css('sandbox' , 'allow-same-origin')
				$("#whole_preview_frame").attr('srcdoc', display_html.innerHTML);
                //return
            }catch{
                console.log('cannot display with 1.')
            }

        }
        else if (bool_website(url)){
            try{
                //$("#whole_preview_frame").css('sandbox' , 'allow-same-origin')
                $("#whole_preview_frame").attr('src', url);
                //return
            }catch{
                console.log('cannot display with 2.')
            }
        }
        else{ 
            try{    // 일단 1번 --> 거의 얘로 돌아가
                $("#whole_preview_frame").attr('srcdoc', display_html.innerHTML);
            } catch {
                console.log("cannot display with 1")
            }
        }    
		$("#status_loading4").remove();
		console.log("status 4 remove");
    }
	//
	function bool_website(url){
            tf=(url.includes("velog.io") || url.includes('quora.com') || url.includes('wikipedia') || url.includes('www.w3schools.com')
            || url.includes('www.khan.co.kr') || url.includes('www.animal.go.kr') || url.includes('http://encykorea') || url.includes('http://www.tcpschool.com/') 
            || url.includes('http://www.dreamy.pe.') || url.includes('https://programmers.co.kr') || url.includes('https://campustown.seoul.go')
            || url.includes('https://www.seoul.co.kr') || url.includes('naver.com') || url.includes('wiktionary.org')
            || url.includes('http://ncov.mohw.go')) 
            return tf
    }


    // stackoverflow page special treatment ===================================================================
    function stackoverflow_filtering(output){

		let parser=new DOMParser();
		const doc=parser.parseFromString(output, 'text/html');

		header_container=doc.getElementsByTagName('footer');
		while(header_container.length>0){
		header_container[0].parentNode.removeChild(header_container[0])
		}

		cookie_container=doc.getElementsByClassName('ff-sans ps-fixed z-nav-fixed ws4 sm:w-auto p32 sm:p16 bg-black-750 fc-white bar-lg b16 l16 r16 js-consent-banner');
		while(cookie_container.length>0){
		cookie_container[0].parentNode.removeChild(cookie_container[0])
		}
		//header_container=doc.getElementsByClassName('s-topbar ps-fixed t0 l0 js-top-bar');
		//while(header_container.length>0){
		//    header_container[0].parentNode.removeChild(header_container[0])
		//}
		survey_container=doc.getElementsByClassName('d-flex jc-space-between wmx12 mx-auto px16 py8');
		while(survey_container.length>0){
		survey_container[0].parentNode.removeChild(survey_container[0])
		}

		filtered_html=doc.documentElement;
		return filtered_html;
    }

    // Quora ㅈ망 어쩌지.. 안되는디...
    function quora_filtering(){
		window.location.href=url1;
    }

    // show whole preview
    function show_page(){
		let parser=new DOMParser();
		const doc=parser.parseFromString(output, 'text/html');

		// find all tag with text
		text_tags='html';
		text_container=doc.querySelectorAll(text_tags);

		header_container=doc.getElementsByTagName('footer');
		while(header_container.length>0){
			header_container[0].parentNode.removeChild(header_container[0])
		}
		show_html=doc.documentElement;

		return show_html;
    }

    // check if there are searchwords in crawled html ================================================================
    function find_search_word(word_option, output){


		//console.log(search_word);

		let parser=new DOMParser();
		const doc=parser.parseFromString(output, 'text/html');

		// find all tag with text
		text_tags='br, p, span, h1, h2, h3, h4, strong, em, blockquote, code, li';
		text_container=doc.querySelectorAll(text_tags);

		// innerText =="" remove
		inner_container=[];
		for (var i=0; i<text_container.length; i++){
		if (text_container[i].innerText!=""){
		inner_container.push(text_container[i]);
		}
		}

		// find all matching elements
		match_element=[]
		if(word_option==1){
		try{
		match_element=word_option1(inner_container)
		} catch{
		console.log('Error in matching for searchword op 1')
		}
		}
		else if(word_option==2){
		try{
		match_element=word_option2(inner_container)
		} catch{
		console.log('Error in matching for searchword op2')
		}
		}
		else{
		console.log("Wrong Search Word Sentence Option : should be 1 or 2")
		}

		//match_element.push('mark { background-color: red; }');
		//<span style="background-color: #DAA"></span>

		return match_element
    }

    // don't split search word option
    function word_option1(inner_container){
		temp_container=[]
		for (var i=0; i<inner_container.length; i++){
		if (inner_container[i].innerText.toLowerCase().includes(search_word.toLowerCase())){

		if(inner_container[i].innerHTML.includes('href')){
		continue;
		}
		if(temp_container.includes(inner_container[i].innerText)){
		continue;
		}
		new_html=use_sentence_original_html(inner_container[i], search_word);
		//new_html=make_new_sentence_html(inner_container[i], search_word);

		temp_container.push(inner_container[i].innerText);
		match_element.push(new_html+'<br>');
		}
		}
		return match_element
    }

    //  split search word option
    function word_option2(inner_container){
		const split_words=search_word.split(' ');
		var words=[]
		temp_container=[]

		for(var i=0; i<split_words.length; i++){
		if (stopwords.includes(split_words[i].toLowerCase())){
		continue;
		}
		words.push(split_words[i])

		}
		console.log(words)

		for (var i=0; i<inner_container.length; i++){
		for (var j=0; j<words.length; j++){
		if (inner_container[i].innerText.toLowerCase().includes(words[j].toLowerCase())){

		if(inner_container[i].innerHTML.includes('href')){
		continue;
		}
		if(temp_container.includes(inner_container[i].innerText)){
		continue;
		}
		new_html=use_sentence_original_html(inner_container[i], words[j]);
		//new_html=make_new_sentence_html(inner_container[i], words[j]);

		temp_container.push(inner_container[i].innerText);
		match_element.push(new_html+'<br>');
		}
		}
		}
		return match_element
    }

    // use webpage's original html src - GwanJong html problem
    function use_sentence_original_html(i_container, word1){
		match_html=i_container.innerHTML;
		var bcolor="#c4ede1"

		var english=/^[A-Za-z0-9]*$/;
		if (english.test(word1)){     // 검색어가 영어면 일케 처리 - 대소문자 달라도 강조처리 해줘야하니까
			reg=new RegExp(word1, 'gi');
			//console.log(reg);
			new_html=match_html.replace(reg, function(str){
				return "<mark style=\"background-color:"+bcolor+"\">"+str+"</mark>"    // 여기서 강조처리- 다른 강조로 바꾸기 가능
			});
		}
		else{ // 검색어가 한국어이면 대소문자 노상관
		highlight_mark="<mark style=\"background-color:"+bcolor+"\">"+word1+"</mark>";  // 여기서 강조처리- 다른 강조로 바꾸기 가능
		new_html=match_html.replace(word1, highlight_mark)
		}
		return new_html
		}

		// html reconstrucntion with bold font
		function make_new_sentence_html(i_container, word2){
		match_html=i_container.innerText;

		var english=/^[A-Za-z0-9]*$/;
		if (english.test(word2)){     // 영어 검색어
		reg=new RegExp(word2, 'gi');
		//console.log(reg);
		new_html=match_html.replace(reg, function(str){
		return "<b>"+str+"</b>"     // 여기서 강조처리- 다른 강조로 바꾸기 가능
		});
		new_html=new_html;
		}
		else{   // 한국어 검색어
		highlight_mark="<b>"+word2+"</b>";    // 여기서 강조처리- 다른 강조로 바꾸기 가능
		new_html=match_html.replace(word2, highlight_mark)
		}
		return new_html
    }

    // useless but will be used somehow
    function loadURL(){
		var url="https://stackoverflow.com/questions/51861577/python-list-function-or-list-comprehension";

		var xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
		xmlhttp.open("GET", url1.value, "false");
		xmlhttp.send();
		document.all.output.innerText=xmlhttmp.responseText;
		alert(xmlhttmp.responseText);
	}

	function loading(){
		window.location.href=url1;
    }



    function C(h, mouseX, mouseY) {
		console.log('window open!');

        (void 0 != k && k) ||
        (void 0 != q && q) ||
        (void 0 != p && p) ||
        chrome.storage.sync.get(function (v) {
				var b = 0.5,
					op1 = v.IpKeywordData,
					op2 = v.IpSummarizationData,
					op3 = v.IpSentenceData,
					op4 = v.IpShowAllData,
					SWoption = v.IpSWoption;
					
					((n = $(".lp-box")),
                    f(),
                    (x = $(h)),
                    x.css("cursor", "progress"),
                    (y = setTimeout(function () {
                        $.get(chrome.runtime.getURL("link-previewer-box.html"), function (b) {

							$("body").append(b);
                            n = $("#lp-box");

							get_title(h);
							$("#boxTitle-link").click(function (){
								window.open(h);
							});

							//console.log(String(h));

							$("#status img").attr("src", chrome.runtime.getURL("/img/status/green.png")); //loading...
							//var state = $("#status");
							//var loading = loadingState(state);
							

                            chrome.storage.sync.get(function (b) {
                                function v() {
									//var state = $("#status");
									loadingState4($("#status"));
                                    try {
 
										e.show();
										//$("#lp-box-content iframe").attr({src: h}).on("load", function () { t.remove(); });
										//$("#lp-box-content iframe").attr({src: h}).on("load", function () { t.remove(); });
										load_ajax(h, 0, 0, 1);

                                    } catch (ea) {}
                                }

								
	
                                var N = b.lpBoxSizeData,
                                    F = String(window.location),
                                    m = x.attr("href"),
                                    u = "",
                                    O = $("#lp-box-info"),
                                    D = $("#lp-box-info-message"),
                                    P = $("#lp-box-info-url"),
                                    e = $("#lp-box-content"),

									keywordBox = $("#lp-box-keyword"),
									summarizeBox = $("#lp-box-summarize"),
									sentanceBox = $("#lp-box-sentance"),
									 

                                    E;

								var setOp1 = 0,
									setOp2 = 0;

								if(op1 == !0){
									setOp1 = "1";
								}
								if(op2 == !0){
									setOp2 = "1";
								}
								

								
								if(setOp1 == 1 || setOp2 == 1){
								//option1
									if(setOp1 == 1){
										console.log("op1 : " + setOp1);
										$("#loadingclass1").text("Finding keywords...");
										keywordBox.show();
										//summary(h, setOp1, setOp2, 1);
									}
									else { keywordBox.hide(); }

									//option2
									if(setOp2 == 1){
										console.log("op2 : " + setOp2);
										var U = h.toString();
										$("#lp-box-summarize-SF").hide();
										summarizeBox.hide(); 

										if(U.includes('stackoverflow.com/questions/')){
											$("#loadingclass2-2").text("Summarizing...");
											console.log("op2!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
											$("#lp-box-summarize-SF").show();
											summarizeBox.hide(); 
										}
										else {
											console.log("op2==================================================");
											$("#loadingclass2").text("Summarizing...");
											summarizeBox.show();
											$("#lp-box-summarize-SF").hide();
										}

										//summary(h, setOp1, setOp2, 2);			
									}
									else { 
										$("#lp-box-summarize-SF").hide();
										summarizeBox.hide(); 
									}

									summary(h, setOp1, setOp2, 1);
								}

								
								if(setOp1 == 1){
									console.log("op1 : " + setOp1);
									$("#loadingclass1").text("Finding keywords...");
									keywordBox.show();
									summary(h, setOp1, setOp2, 1);
									}
								else { keywordBox.hide(); }


								if(setOp2 == 1){
									console.log("op2 : " + setOp2);
									var U = h.toString();
									$("#lp-box-summarize-SF").hide();
									summarizeBox.hide(); 

									if(U.includes('stackoverflow.com/questions/')){
										$("#loadingclass2-2").text("Summarizing...");
										console.log("op2!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
										$("#lp-box-summarize-SF").show();
										summarizeBox.hide(); 
									}
									else {
										console.log("op2==================================================");
										$("#loadingclass2").text("Summarizing...");
										summarizeBox.show();
										$("#lp-box-summarize-SF").hide();
									}

									summary(h, setOp1, setOp2, 2);			
								}
								else { 
									$("#lp-box-summarize-SF").hide();
									summarizeBox.hide(); 
								}
								

								if(op3 == !0){
									sentanceBox.text("Finding sentence...");	
									sentanceBox.show();
									var sw = "";
									sw = findSearchword();

									if(sw == ""){
										//console.log("NULL SearchWord?????????" + sw);
										sentanceBox.empty();
										var div = document.createElement("div");
											div.innerHTML='<div id="NoResult">\nNo Result</div>\n';
											$("#lp-box-sentance").append(div).on("load", function(){ $("#status_loading1").remove(); });
									}
									else{
										loadingState3($("#status"));
										// Hello world
										if(SWoption == "1"){
											try{
												load_ajax(h, sw, 1, 0);
											}catch(ea){}	
										}
										// Hello / world
										else {
											try{
												load_ajax(h, sw, 2, 0);
											}catch(ea){}
										}
									}			
								}
								else { sentanceBox.hide(); }

								if(op4 == !0){
									v();		
								}
								else { e.hide(); }

										
                                n.draggable({
                                    cursor: "move",
                                    start: function () {
                                        q = !0;
                                        //E = d(e, "Dragging...");
                                    },
                                    stop: function () {
                                        q = !1;
                                        //E.remove();
                                    },
                                }).resizable({
                                    start: function () {
                                        p = !0;
                                        //E = d(e, "Resizing...");
                                    },
                                    stop: function () {
                                        p = !1;
                                       // E.remove();
                                    },
                                });

								if(mouseX == 0 && mouseY == 0){
									n.css({ top: h.getBoundingClientRect().bottom, left: h.getBoundingClientRect().left }).addClass("lp-show lp-box-size-" + N + " lp-border-style-modern");
								}
								else{
									n.css({ top: mouseY, left: mouseX }).addClass("lp-show lp-box-size-" + N + " lp-border-style-modern");
								}
									
                                M.on("keydown", function (a) {
                                    27 == a.keyCode && ($(this).off("keydown"), f());
                                });
                            });
						});
					}
					)));
            });
    }

    function K() {
        (void 0 != k && k) ||
            (void 0 != q && q) ||
            (void 0 != p && p) ||
            void 0 == x ||
            void 0 == n ||
            (l(),
            n
                .on("mouseenter", function () {
                    clearTimeout(w);
                })
                .on("mouseleave", function () {
                    l();
                })
				);
    }

    var M = $(window),
        r = $("body"),
		timerVar,
        x,
        n,
        y,
        w,
        //A = 0,
        //h,
        z,
        k = !1,
        q = !1,
        p = !1;

    $("a[href]").on("mouseenter", function () {
		var a = this;
		clearTimeout(timerVar);
		function timer(){
			chrome.storage.sync.get(function (c) {
                var b = c.lpBlocklistData;
                //c = c.lpTriggerModeData;
                try {
                    if (-1 != $.inArray(String(window.location.hostname), b) || -1 != $.inArray(String(new URL($(a).attr("href")).hostname), b)) return;
                } catch (ea) {}

				C(a, 0, 0);
            });
		}

		timerVar = setTimeout(timer, 1000);	  
	});


	function selectHref(){
		var selectionText = "";

		if (document.getSelection) { 
			selectionText = document.getSelection(); 
		} else if (document.selection) { 
			selectionText = document.selection.createRange().text; 
		} 
		return selectionText; 
	}


	
	window.addEventListener("contextmenu", (event) => {
		event.preventDefault();

		var a = "",
			x = event.clientX,
			y = event.clientY;

		console.log('click open!');
		a = selectHref();
		console.log('hello?' + a);

		chrome.storage.sync.get(function (c) {
				var b = c.lpBlocklistData;
                //c = c.lpTriggerModeData;
                try {
                    if (-1 != $.inArray(String(window.location.hostname), b) || -1 != $.inArray(String(new URL($(a).attr("href")).hostname), b)) return;
                } catch (ea) {}
                
				C(a, x, y);
         });	
	});
	
	window.addEventListener("click", (e) => {
		n = $("#lp-box")
		if(n.has(e.target).length === 0){
			console.log('close');
			l();
		}
	});

});

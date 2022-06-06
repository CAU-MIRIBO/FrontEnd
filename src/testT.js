<!DOCTYPE html>
<html lang="ko">
<head>
    <title>Come Come Come</title>
    <script src="https://code.jquery.com/jquery-latest.min.js"></script>

</head>
<body>
    <h2>Work it Work it >> plz : </h2>
    <button type="button" id="btn_data" style="WIDTH: 120pt; HEIGHT: 20pt">Push Push Baby</button>
    <br>
    <input type="text" id="url11" placeholder="URL" style="WIDTH: 100pt; HEIGHT: 15pt">
    <br>
    <input type="text" id="search" placeholder="검색어" style="WIDTH: 100pt; HEIGHT: 15pt">
    <br>

    <!--  여기서 부터 복붙 -->
    <!-- 여기서부터 검색어 문장 관련 css 삽입한 곳 -->
    <style>
        #search_word_area {
            background-color: #fdf8f3;
            color: black;
            padding: 1em;
            border-radius: 7px;
            border: none;
            outline: none;
            font-family: sans-serif;
            font-size: 12px;
            font-weight: 500;
            line-height: 1.4;
            width: 100%;
            height: 13px;
            overflow: auto;
            transition: all 0.1s;
        }
    </style>

    <div id="search_word_area">검색어를 포함한 문장</div>
    <!-- 검색어 문장 여기까지  -->

    <br>

    <!-- 전체미리보기 출력부 -->
    <iframe id="whole_preview_frame" src="" height="13px" width=100% padding="1em"
            frameBorder="0" sandbox="allow-scripts allow-pointer-lock">
        전체 미리보기
    </iframe>
    <!-- 전체 미리보기 여기까지-->
    <script>

        var myiframe=document.getElementById("whole_preview_frame");
        var url1;           // url
        var search_word;    //search_word
        var stopwords=['i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', "you're", "you've", "you'll", "you'd", 'your', 'yours', 'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', "she's", 'her', 'hers', 'herself', 'it', "it's", 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that', "that'll", 'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', "don't", 'should', "should've", 'now', 'd', 'll', 'm', 'o', 're', 've', 'y', 'ain', 'aren', "aren't", 'couldn', "couldn't", 'didn', "didn't", 'doesn', "doesn't", 'hadn', "hadn't", 'hasn', "hasn't", 'haven', "haven't", 'isn', "isn't", 'ma', 'mightn', "mightn't", 'mustn', "mustn't", 'needn', "needn't", 'shan', "shan't", 'shouldn', "shouldn't", 'wasn', "wasn't", 'weren', "weren't", 'won', "won't", 'wouldn', "wouldn't"]

        $("#btn_data").click(function(){
        // if button click get url11 and search_word
        url1 = $('#url11').val();
        search_word=$('#search').val();

        // load_ajax: input url & search word ==> output html
        // 사용법 >> arg1 = search_word paragraph ( 0 => X, 1 => combine word, 2 => split word)
        // >> arg2 = entire webpage preview( 0 => X, 1 => show preview)
        try{
        load_ajax(2, 1);
        }
        catch{
        // 에러 발생
        console.log('Cannot Load :: DDongMang')
        logMyError(e);
        $("#search_word_area").innerText("Page Not Loaded")
        $("#whole_preview_frame").attr('src', url1);
        }
        });
        // 가장 중요한 함수!!
        function load_ajax(cmd1, cmd2) {

        try{
        $.ajax({
        type: 'get',
        url:"https://proxyformiribo.herokuapp.com/"+url1,
        async: true,
        //data: 'JSONP',
        success: function(result){

        console.log("[requestPostBodyJson] : [result] : Success");
        output=result;

        if(cmd1==1 || cmd1==2){
        //output 1: show keyword paragraph =====================================
        if (!!search_word){
        var search_sen=find_search_word(cmd1, output);
        try{
        // <<<<<<<<<<<<<<< 검색어 출력부 >>>>>>>>>>>>>>>>>>
        $('#search_word_area').css('height', '100')
        $("#search_word_area").html(search_sen);
        }catch{
        console.log('search word display error catch')
        }
        search_word='';
        }
        }

        if(cmd2==1){
        // output 2 : show entire webpage preview================================
        var display_html;

        //case 1 - stackoverflow
        if(url1.includes('stackoverflow.com/questions/')){
        display_html=stackoverflow_filtering(output);
        }
        //case 3 - all case
        else{
        display_html=show_page()
        }
        // Display 하는 부분
        try{
        //$("#whole_preview_frame").attr('srcdoc', display_html.outerHTML);
        display_preview_on_screen(1, display_html, url1)
        }catch{
        console.log('all display error catch')
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
        function display_preview_on_screen(option, display_html, url){


        $("#whole_preview_frame").css('height', '400')
        if(url.includes("stackoverflow")){
        try{
        $("#whole_preview_frame").css('sandbox' , 'allow-same-origin')
        $("#whole_preview_frame").attr('srcdoc', display_html.outerHTML);
        return
        }catch{
        console.log('cannot display with 1.')
        }
        }
        else if (url.includes("velog.io") || url.includes('quora.com')){
        try{
        //$("#whole_preview_frame").css('sandbox' , 'allow-same-origin')
        $("#whole_preview_frame").attr('src', url);
        return
        }catch{
        console.log('cannot display with 2.')
        }
        }
        else{
        try{    // 일단 1번 --> 거의 얘로 돌아가
        $("#whole_preview_frame").attr('srcdoc', display_html.outerHTML);
        } catch {
        console.log("cannot display with 1")
        }
        try{    // 2번
        $("#whole_preview_frame").attr('src', url);
        return
        }catch{
        console.log('cannot display with 2')
        }
        }
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
        var bcolor="#FDC2B0"

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

    </script>


    <!-- 여기까지 복붗 -->
</body>
</html>
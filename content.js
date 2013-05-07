// pocketのスクリプト要素を生成
var pocket_script = document.createElement("script");
pocket_script.setAttribute('type', 'text/javascript');
pocket_script.innerHTML = '!function(d,i){if(!d.getElementById(i)){var j=d.createElement("script");j.id=i;j.src="https://widgets.getpocket.com/v1/j/btn.js?v=1";var w=d.getElementById(i);d.body.appendChild(j);}}(document,"pocket-btn-js");';

// // Gunosyの記事をすべて取得
var content = {};
content = document.getElementsByTagName('article');

// 記事の数だけループ
for (var i = 0; i < content.length; i++) {
	// 記事を取得
	var art = content[i];
	// 記事のURLを取得
	var url = getRedirectUrl(art);
	// console.log(url);

	// ボタンを挿入
	var div = document.createElement('div');
	div.setAttribute('style', 'right: 20px; float: right; position: relative; bottom: 33px;');
	div.innerHTML = '<a href="https://getpocket.com/save" class="pocket-btn" data-lang="en" data-save-url="'+ url +'" data-pocket-count="vertical" data-pocket-align="left" ></a>';
	art.appendChild(div);
};

// リダイレクト先のURLを取得する
function getRedirectUrl(art){
	var redirect_url;
	// リダイレクト先のURLが定義されているであろうaタグのついた要素を取得
	as = art.getElementsByClassName('art_text_wrap').item(0).getElementsByTagName('a');

	// URLを調べていき、リダイレクトするものならループを抜ける
	for(var i = 0; i < as.length; i++){
		redirect_url = as[i].getAttribute('href');
		if(redirect_url.indexOf('/redirect') != -1) break;
	}

	// パラメータ部分（通常のURL）を切り取る
	var urls = redirect_url.split('&url=');

	// '/',':'にすべて置換
	var url = urls[1].replace(/%2F/g, '/');
	url = url.replace(/%3A/g, ':');

	return url;
}

// pocket用のスクリプトを追加
document.body.appendChild(pocket_script);
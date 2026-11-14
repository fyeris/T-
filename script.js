// --- お問い合わせフォームの処理（index.html用） ---
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const successBox = document.getElementById('successMessage');
    if (successBox) {
      successBox.classList.remove('hidden');
      contactForm.reset();
      setTimeout(() => {
        successBox.classList.add('hidden');
      }, 5000);
    }
  });
}

// --- チャット機能の処理（chat.html用） ---
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const messageList = document.getElementById('message-list');

if (chatForm && chatInput && messageList) {
  chatForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const userText = chatInput.value.trim();
    if (userText === '') return;

    // 1. ユーザーの吹き出しを画面に追加
    addMessage(userText, 'user-message');
    chatInput.value = '';

    // 2. 少し遅らせて（0.6秒後）フェリスからの返信を追加
    setTimeout(function() {
      const replyText = createReply(userText);
      addMessage(replyText, 'ai-message');
    }, 600);
  });
}

// 画面に吹き出しを追加する関数
function addMessage(text, className) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('chat-message', className);

  const messageP = document.createElement('p');
  messageP.textContent = text;

  messageDiv.appendChild(messageP);
  messageList.appendChild(messageDiv);

  messageList.scrollTop = messageList.scrollHeight;
}

// 入力された文字に合わせて返信を考える関数
function createReply(input) {
  if (input.includes('こんにちは') || input.includes('やあ') || input.includes('おはよう')) {
    return 'こんにちは！今日も元気に（寝不足だけど）コード書いてるよ！';
  } else if (input.includes('年齢') || input.includes('何歳')) {
    return '僕は18歳だよ！';
  } else if (input.includes('出身') || input.includes('どこ')) {
    return '出身は愛知県だよ！いいところでしょ？';
  } else if (input.includes('趣味') || input.includes('好き') || input.includes('ゲーム')) {
    return 'コードの手打ちやスマホをいじること、あとゲーム制作もやってるよ！';
  } else if (input.includes('寝不足') || input.includes('徹夜') || input.includes('眠い')) {
    return '実は昼夜逆転状態で、たまに徹夜もしちゃうんだよね…気をつけないと！';
  } else {
    const randomReplies = [
      'なるほど〜！もっと詳しく教えて！',
      'へぇ〜！コード手打ちの合間に聞けてよかったよ！',
      'わかるわかる！ゲーム制作の参考になりそう！',
      'ちょっと眠くて頭が回らないけど、応援してるよ！'
    ];
    const randomIndex = Math.floor(Math.random() * randomReplies.length);
    return randomReplies[randomIndex];
  }
}
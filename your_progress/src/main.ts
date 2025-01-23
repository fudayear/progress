import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { supabase } from './supabase';

const main_texts = {
  //supabase内のmain_textsの中身を入れる
}

//アクセス時に自動的に呼び出される
const testGet = async () => {
  const { data, error } = await supabase.from('main_texts').select('*');
  if (error) {
    console.error('Error:', error.message);
  } else {
    console.log('Data:', data);
  }
};
//テキストを送る
//TODO:postでlogをreturn→log.innerHTMLで表示の流れはまだ未検証
const post = async (message: string, author: string) => {
  if (author.length >= 50) {
    console.error("author length has exceeded the limit:50.");
    return "名前の長さが50文字を越えたため、送信できませんでした";
  }
  if (message.length >= 200) {
    console.error("message length has exceeded the limit:200")
    return "本文の長さが200文字を越えたため、送信できませんでした"
  }
  const { data, error } = await supabase.from('main_texts').insert([{
    content: message,
    author: author,
  }]);
  if (error) {
    console.error('Error:', error.message);
    return "システム側の問題で送信できませんでした" as string;
  } else {
    console.log("Data posted message: ", message, " author:", author);
    return "送信されました" as string;
  }
}
//表示テキストを取得
const progresGet = async () => {
  const { data, error } = await supabase
    .from('main_texts')
    .select('*')
    .order('id', { ascending: false })
    .limit(10);

  if (error) {
    console.error(error);
  } else {
    console.log(data);
  }
}

//ここから上は関数
//TODO:https://chatgpt.com/share/67921d1d-14e8-800e-9f9c-ef53e3e23caa これをやる

const main = async () => {
  try {
    progresGet();

    const form = document.querySelector('form') as HTMLFormElement;
    const content = document.querySelector('[id = "progress"]') as HTMLDivElement;
    const log = document.querySelector('[id = "progress"]') as HTMLDivElement;

    form.addEventListener('submit', async (e) => {
      e.preventDefault()

      const formData = new FormData(form);
      const author = formData.get('author') as string;
      const message = formData.get('progress') as string;

      const logMessage = await post(message, author);
      log.innerHTML = logMessage;
    })
  } catch (error) {
    console.error(error);
  }

}

main();



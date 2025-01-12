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
const post = async (massage: string, author: string) => {
  const error = await supabase.from('main_texts').insert([{
    content: massage,
    author: author,
  }]);
  if (error) {
    console.error('Error:', error);
  } else {
    console.log("Data posted: ", massage, author);
  }
}
//表示テキストを取得
//なぜか動かない
const progresGet = async () => {
  const { data: mainTexts, error } = await supabase
    .from('main_texts')
    .select('*')
    .order('id', { ascending: false })
    .limit(10);

  if (error) {
    console.error(error);
  } else {
    console.log(mainTexts);
  }
}

//ここから上は関数
//ここから下はページが読み込まれた時に呼び出される、main関数のようなもの
progresGet();

const form = document.querySelector('form') as HTMLFormElement;
const content = document.querySelector('[id = "progress"]') as HTMLDivElement;

form.addEventListener('submit', async (e) => {
  e.preventDefault()

  const formData = new FormData(form);

})

import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import { supabase } from './supabase';

const main_texts = {

}

const testGet = async () => {
  const { data, error } = await supabase.from('main_texts').select('*');
  if (error) {
    console.error('Error:', error.message);
  } else {
    console.log('Data:', data);
  }
};

const post = async (massage: string, author: string) => {
  const error = await supabase.from('main_texts').insert([{
    content: massage,
    author: author,
  }]);
}
testGet();

const form = document.querySelector('form') as HTMLFormElement;
const content = document.querySelector('[id = "progress"]') as HTMLDivElement;

form.addEventListener('submit', async (e) => {

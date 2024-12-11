import './style.css';
import { supabase } from './supabase';

(async () => {
  const { data, error } = await supabase.from('main_texts').select('*');
  if (error) {
    console.error('Error:', error.message);
  } else {
    console.log('Data:', data);
  }
})();

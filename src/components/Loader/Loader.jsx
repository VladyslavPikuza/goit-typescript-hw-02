import { Circles } from 'react-loader-spinner';
import s from './Loader.module.css';

const Loader = () => (
  <div className={s.Loader}>
    <Circles color="#00BFFF" height={80} width={80} />
  </div>
);

export default Loader;
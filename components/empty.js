import utilStyles from '../styles/utils.module.css';

export function Empty({letter}) {
  return <div className={utilStyles.empty_box}><p>{letter}</p></div>
}
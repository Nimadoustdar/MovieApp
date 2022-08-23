import styles from './Header.module.css'
const Header = () => {
  return (
    <span
      className={styles.header}
      onClick={() => window.scroll(0, 0)}
    >
      Nima Movies
    </span>
  )
}

export default Header
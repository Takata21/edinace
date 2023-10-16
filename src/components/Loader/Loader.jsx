import styles from './Loader.module.css'
export const Loader = () => {
  return (
    <div id="universe">
      <div id="galaxy">
        <div className={styles.circle}></div>
        <div className={styles.circle2}></div>
        <div className={styles.circle3}></div>
        <div id="orbit0">
          <div id="pos0">
            <div id="dot0"></div>
          </div>
        </div>
        <div id="orbit1">
          <div id="pos1">
            <div id="dot1"></div>
          </div>
        </div>
        <div id="orbit2">
          <div id="pos2">
            <div id="dot2"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

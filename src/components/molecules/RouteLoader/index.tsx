import type { FC } from 'react'

import styles from './RouteLoader.module.scss'

const RouteLoader: FC = () => (
  <div className={styles.wrapper}>
    <div className={styles.loader} />
  </div>
)

export default RouteLoader

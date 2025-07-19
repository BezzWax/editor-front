import { FC } from 'react'
import { Helmet } from 'react-helmet'

import { HelmetProps } from './types'
import styles from './Helmet.module.scss'

const HelmetLayout: FC<HelmetProps> = ({ children, title }) => (
  <div className={styles.wrapper}>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    {children}
  </div>
)

export default HelmetLayout

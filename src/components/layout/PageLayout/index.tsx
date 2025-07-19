import { useEffect, useState, type FC } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { isMobile } from "react-device-detect";

import { getCookie } from "utils";

import type { TPageLayoutProps } from "./types";
import styles from "./PageLayout.module.scss";

const PageLayout: FC<TPageLayoutProps> = ({ children }) => {
  const [isPopupShow, setPopupShow] = useState<boolean>(false);

  useEffect(() => {
    if (isMobile) {
      const cookie = JSON.parse(getCookie("isDeclinedMobileApp") as string);
      if (cookie) return;

      setTimeout(() => {
        setPopupShow(true);
      }, 3000);
    }
  }, []);

  return (
    <main className={styles.wrapper}>
      {children}

      <AnimatePresence>
        {isPopupShow ? (
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          ></motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
};

export default PageLayout;

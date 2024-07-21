import React, { useEffect, useState } from "react";
import { LayoutWithButtonBottom } from "../../layouts/button-bottom-layout/layout-with-button-bottom";
import styles from "./styles/reveal-recovery-phrase.module.scss";
import { ButtonCopy } from "../../components/buttons/button-copy";

import classnames from "classnames";
import Colors from "../../theme/colors";
import { ModalRecoveryPhrase } from "./modals/modal-recovery-phrase";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";

const dataFake = [
  "tomado",
  "kaa",
  "lao",
  "teaske",
  "puma",
  "tomado",
  "tomado",
  "tomado",
];
export const RevealRecoveryPhrasePage = () => {
  const [isShowPhrase, setIsShowPhrase] = useState(false);
  const [keyring, setKeyring] = useState<string[]>();
  const onShowPhrase = () => {
    setIsShowPhrase(true);
  };
  const [isShowRecoveryPhrase, setIsShowRecoveryPhrase] = useState(false);
  useEffect(() => {
    if (keyring?.length > 0) return;
    setIsShowRecoveryPhrase(true);
  }, [keyring]);
  const params: {
    keystoreIndex: string;
  } = useParams();
  const history = useHistory();
  return (
    <LayoutWithButtonBottom
      backgroundColor={Colors["neutral-surface-card"]}
      title={"Reveal Recovery Phrase"}
      onClickButtonBottom={() => history.goBack()}
      titleButton={"Already Backed Up"}
    >
      <div className={styles.container}>
        <span className={styles.title}>
          Write down this recovery phrase in the exact order and keep it in a
          safe place
        </span>
        <div className={styles.wrapBox}>
          <div
            className={classnames([
              styles.boxRecoveryPhrase,
              !isShowPhrase ? styles.hide : styles.show,
            ])}
          >
            {keyring?.length > 0 &&
              keyring.map((item, index) => (
                <div
                  key={index.toString()}
                  className={styles.itemRecoveryPhrase}
                >
                  <span className={styles.number}>{index + 1}</span>
                  <span className={styles.name}>{item}</span>
                </div>
              ))}
          </div>
          {!isShowPhrase && (
            <span onClick={onShowPhrase} className={styles.clickHere}>
              Click here to reveal the phrase
            </span>
          )}
        </div>
        <ButtonCopy
          title={"Copy to clipboard"}
          valueCopy={keyring?.join(" ")}
        />
      </div>
      <ModalRecoveryPhrase
        onKeyring={(keyring) => {
          if (!keyring) return;
          setKeyring(keyring.split(" "));
          setIsShowRecoveryPhrase(false);
        }}
        isOpen={isShowRecoveryPhrase}
        keyStoreIndex={Number(params.keystoreIndex)}
        onRequestClose={() => {
          history.goBack();
          return;
        }}
        isShowPrivKey={false}
      />
    </LayoutWithButtonBottom>
  );
};

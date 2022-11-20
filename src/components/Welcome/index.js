import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SurveyInner from "../SurveyInner";
import styles from "./index.module.css";

import { useAuth } from "../../context/UserContext";

function Welcome() {
  const { user, signWithGoogle } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user.length !== 0) {
      navigate("/survey");
    }
  }, [user, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.innerContent}>
        <SurveyInner
          bgTitle="Anketimize hoş geldin."
          title="Katılım için hızlıca giriş yap."
          nextButtonShow={false}
          prevButtonShow={false}
        />
        <button className={styles.buttonSign} onClick={signWithGoogle}>
          <div>
            <h3>Google ile giriş yap</h3>
          </div>
        </button>
      </div>
    </div>
  );
}

export default Welcome;

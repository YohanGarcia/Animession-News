import firebase, {FirebaseContext} from "../firebase";
import useAutenticacion from "../hooks/useAutenticacion";

import "../styles/globals.css";
import "../styles/colors.css";
import "../styles/responsive.css";
import "../styles/tech.css";
import "../styles/dropdown.css";
import 'bootstrap/dist/css/bootstrap.css'



import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

const Noop = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps }) {
  const usuario = useAutenticacion();
  const Auth = Component.Auth || Noop;
  return (
    <>
      <FirebaseContext.Provider value={{ firebase, usuario }}>
        <Auth>
          <Component {...pageProps} />
        </Auth>
      </FirebaseContext.Provider>
    </>
  );
}

export default MyApp;

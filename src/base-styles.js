import { injectGlobal } from 'styled-components';
import reset from 'styled-reset';
const baseStyles = () => injectGlobal`
  ${reset}
 a{text-decoration:none;}
 body{
     font-family: 'Racing Sans One', cursive;
     background: radial-gradient(circle, #e2d1c3, #fdfcfb);
    }
`
export default baseStyles;

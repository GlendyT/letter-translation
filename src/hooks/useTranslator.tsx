// import { useEffect } from "react";


// export const useTranslator = () => {

//     useEffect(() => {
//         const addScript = document.createElement('script');
//         addScript.setAttribute(
//           'src',
//           '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
//         );
//         document.body.appendChild(addScript);
//         window.googleTranslateElementInit = googleTranslateElementInit;
//       }, []);
    
//       const googleTranslateElementInit = () => {
//         new window.google.translate.TranslateElement(
//           {
//             pageLanguage: 'en',
//             includedLanguages: 'ko', // include this for selected languages
//             layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
//           },
//           'google_translate_element'
//         );
//       };
    
//      // <div className="" id="google_translate_element"></div>
//      // <p>dear hobi</p>
//   return {
//     googleTranslateElementInit
//   }
// }

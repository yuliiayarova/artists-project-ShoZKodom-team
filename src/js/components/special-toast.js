import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import './special-toast.css';

export function examplTost(
  error = { name: 'Error!', message: 'Unknow error' }
) {
  iziToast.show({
    title: error.name,
    titleColor: '#fff',
    titleSize: '24px',
    message: error.message,
    messageColor: '#fff',
    messageSize: '18px',
    backgroundColor: '#764191',
    position: 'bottomRight', //'bottomRight', // bottomRight, bottomLeft, topRight, topLeft, topCenter, bottomCenter, center
    theme: 'dark', // dark light
    icon: 'error-circle.svg',
    iconText: '',
    iconColor: '',
    iconUrl: '../../assets/icons/error-circle.svg',
    balloon: false,
    close: true,
    closeOnEscape: true,
    closeOnClick: true,
    displayMode: 2, // once, replace
    timeout: 5000,
    rtl: false,
    animateInside: true,
    drag: true,
    pauseOnHover: true,
    resetOnHover: false,
    progressBar: true,
    progressBarColor: '#fff',
    progressBarEasing: 'ease',
    overlay: false,
    overlayClose: false,
  });
}

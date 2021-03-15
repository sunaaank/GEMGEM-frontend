import React from 'react';

export const toast = (()=>{
  let instance;
  // public
  function init(f7){
    let textToast = f7.toast.create({
      text: 'text',
      position: 'center',
      closeTimeout: 2000
    });
    let iconToast = f7.toast.create({
      text: 'text', 
      icon: `<i class="f7-icons">exclamationmark_triangle</i>`,
      position: 'center',
      closeTimeout: 2000
    });
    function privateMethod() {
      console.log("private");
    }
    return {
      openToast: ()=> textToast.open(),
      openIconToast: ()=> iconToast.open(),
      setToastIcon: (icon) => {
        iconToast.$el.find(".toast-icon i.f7-icons").text(icon)
        return instance;
      },
      setToastText: (text) => {
        textToast.$el.find(".toast-text").text(text);
        iconToast.$el.find(".toast-text").text(text);
        return instance;
      },
    };
  }
  return {
    get : _ => instance,
    set(f7){
      if(!instance) instance = init(f7)
    }
  };
})();


export const sleep = n => new Promise(resolve => setTimeout(resolve, n));
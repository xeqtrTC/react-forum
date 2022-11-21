
import React, {
  useCallback, useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import  ReactQuill  from  "react-quill";
import { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';




function ReactQuillEditor({ setValueForQuill, valueForQuill }) {

  const ref = useRef();

  const imageHandler = () => {
    console.log(Quill);
    const {tooltip} = <Quill className="theme"></Quill>;
    // const test = Quill.Theme;

    console.log(tooltip);
    const originalSave = tooltip.save;
    const originalHide = tooltip.hide;
  
    tooltip.save = function () {
      const range = this.quill.getSelection(true);
      const value = this.textbox.value;
      if (value) {
        this.quill.insertEmbed(range.index, 'image', value, 'user');
      }
    };
    // Called on hide and save.
    tooltip.hide = function () {
      tooltip.save = originalSave;
      tooltip.hide = originalHide;
      tooltip.hide();
    };
    tooltip.edit('image');
    tooltip.textbox.placeholder = 'Embed URL';
  
  }

  // const imageHandler = () => {
  //   const { tooltip } = Quill.theme;
  //   console.log(tooltip)
  //   const originalSave = tooltip.save;
  //   const originalHide = tooltip.hide;
  
  //   tooltip.save = () => {
  //     const range = Quill.getSelection(true);
  //     const { value } = tooltip.textbox;
  //     if (value) { //isValidURL is a validator
  //       this.quill.insertEmbed(range.index, 'image', value, Quill.sources.USER);
  //     } else {
  //       // error message handler
  //     }
  //   };
  
  //   // Called on hide and save.
  //   tooltip.hide = () => {
  //     tooltip.save = originalSave;
  //     tooltip.hide = originalHide;
  //     tooltip.hide();
  //   };
  
  //   tooltip.edit('image');
  //   tooltip.textbox.placeholder = 'Embed URL';
  // }

  console.log('value', setValueForQuill);
  const  modules  = {
    toolbar: {
      container: [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script:  "sub" }, { script:  "super" }],
        ["blockquote", "code-block"],
        [{ list:  "ordered" }, { list:  "bullet" }],
        [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
        ["link", "image", "video"],
        ["clean"],
      ],
      theme: 'snow',   

      handlers: {
        image: imageHandler
      },
        
    },
  };


  const memoizdedModules= useMemo(() => modules, [])

  return (

    <ReactQuill modules={memoizdedModules} ref={ref}  value={valueForQuill} onChange={setValueForQuill}
    />

  )
}

export default ReactQuillEditor
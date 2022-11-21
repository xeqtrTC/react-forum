import React, { useState, useEffect, useCallback } from 'react'
import { ContentState, EditorState, convertToRaw, convertFromHTML, convertToHTML } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import htmlToDraft from 'html-to-draftjs'
import draftToHtml from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'


const getInitialState = (defaultValue) => {
  if (defaultValue) {
    const blocksFromHtml = htmlToDraft(defaultValue)
    const { contentBlocks, entityMap } = blocksFromHtml
    const contentState = ContentState.createFromBlockArray(
      contentBlocks,
      entityMap
    )
    return EditorState.createWithContent(contentState)
  } else {
    return EditorState.createEmpty()
  }
}
const RichEditor = ({ defaultValue, onChange, replycontent, setdesc }) => {

    // console.log(defaultValue);
    const [editorState, setEditorState] = useState(() => {
      const blocksFromHTML = convertFromHTML(replycontent)
        const contentState = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        )
    
        return EditorState.createWithContent(contentState)
      });

     const [defaultValueState, setdefaultValueState] = useState()
  const onEditorDefaultStateChange = useCallback(
    (editorState) => {
      setdefaultValueState(editorState)
      return onChange(
        draftToHtml(convertToRaw(editorState.getCurrentContent()))
      )
    },
    [onChange]
  )
  useEffect(() => {
    if (defaultValue) {
      const initialState = getInitialState(defaultValue)
      onEditorDefaultStateChange(initialState)
    }
  }, [onEditorDefaultStateChange, defaultValue])

  const onSetEditorState = (newState) => {
    setEditorState(newState)
 }
 console.log(editorState)
 const rawContentState = convertToRaw(editorState.getCurrentContent());

 const markup = draftToHtml(
  rawContentState, 
);
useEffect(() => {
  setdesc(markup)
}, [markup])

  return (
    <div className=''>
      <Editor
        editorState={editorState ? editorState : defaultValueState}
        onEditorStateChange={onSetEditorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="classNameEditor"
      />
      <textarea style={{display:'none'}} disabled  value={draftToHtml(convertToRaw(editorState.getCurrentContent())) } />

    </div>
  )
}

RichEditor.propTypes = {}

RichEditor.defaultProps = {}

export default RichEditor
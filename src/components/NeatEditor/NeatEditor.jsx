import React, { useEffect } from 'react'
import "../../sass/neat-editor.scss";
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import IconButton from '@mui/material/IconButton';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import TextIncreaseIcon from '@mui/icons-material/TextIncrease';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import TextDecreaseIcon from '@mui/icons-material/TextDecrease';
import LinkIcon from '@mui/icons-material/Link';
import HighlightIcon from '@mui/icons-material/Highlight';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import FormatClearIcon from '@mui/icons-material/FormatClear';
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';
import SuperscriptIcon from '@mui/icons-material/Superscript';
import SubscriptIcon from '@mui/icons-material/Subscript';
import ClearIcon from '@mui/icons-material/Clear';
import { Tooltip, Divider } from '@mui/material';

const toolbarFeatures = [
    //Bold
    {
        id: 'boldButton',
        name: 'Bold',
        command: 'bold',
        icon: <FormatBoldIcon />,
        class: 'neat-bold-icon',
        value: null
    },
    //Italic
    {
        id: 'italicButton',
        name: 'Italic',
        command: 'italic',
        icon: <FormatItalicIcon />,
        class: 'neat-bold-icon',
        value: null
    },
    //Underline
    {
        id: 'underlineButton',
        name: 'Underline',
        command: 'underline',
        icon: <FormatUnderlinedIcon />,
        class: 'neat-bold-icon',
        value: null
    },
    //Strike Through
    {
        id: 'strikeThroughButton',
        name: 'Strike Through',
        command: 'strikeThrough',
        icon: <StrikethroughSIcon />,
        class: 'neat-bold-icon',
        value: null
    },
    //Justify Left
    {
        id: 'justifyLeftButton',
        name: 'Justify Left',
        command: 'justifyLeft',
        icon: <FormatAlignLeftIcon />,
        class: 'neat-bold-icon',
        value: null
    },
    //Justify Center
    {
        id: 'justifyCenterButton',
        name: 'Justify Center',
        command: 'justifyCenter',
        icon: <FormatAlignCenterIcon />,
        class: 'neat-bold-icon',
        value: null
    },
    //Justify Right
    {
        id: 'justifyRightButton',
        name: 'Justify Right',
        command: 'justifyRight',
        icon: <FormatAlignRightIcon />,
        class: 'neat-bold-icon',
        value: null
    },
    //Justify Full
    {
        id: 'justifyFullButton',
        name: 'Justify Full',
        command: 'justifyFull',
        icon: <FormatAlignJustifyIcon />,
        class: 'neat-bold-icon',
        value: null
    },
    //Horizontal Rule
    {
        id: 'insertHorizontalRuleButton',
        name: 'Horizontal Rule',
        command: 'insertHorizontalRule',
        icon: <HorizontalRuleIcon />,
        class: 'neat-bold-icon',
        value: null
    },
    //Increase Font Size
    {
        id: 'increaseFontSizeButton',
        name: 'Increase Font Size',
        command: 'ifontSize',
        icon: <TextIncreaseIcon />,
        class: 'neat-bold-icon',
        value: 1
    },
    //Decrease Font Size
    {
        id: 'decreaseFontSizeButton',
        name: 'Decrease Font Size',
        command: 'dfontSize',
        icon: <TextDecreaseIcon />,
        class: 'neat-bold-icon',
        value: 1
    },
    //Blockquote
    {
        id: 'formatBlockButton',
        name: 'Blockquote',
        command: 'formatBlock',
        icon: <FormatQuoteIcon />,
        class: 'neat-bold-icon',
        value: '<PRE>'
    },
    //Create Link
    {
        id: 'createLinkButton',
        name: 'Create Link',
        command: 'createLink',
        icon: <LinkIcon />,
        class: 'neat-bold-icon',
        value: 'https://www.google.com/'
    },
    //Highlight Text
    {
        id: 'backColorButton',
        name: 'Highlight Text',
        command: 'backColor',
        icon: <HighlightIcon />,
        class: 'neat-bold-icon',
        value: 'yellow'
    },
    //Remove Highlight Text
    {
        id: 'backClearColorButton',
        name: 'Remove Highlight Text',
        command: 'backColor',
        icon: <HighlightOffIcon />,
        class: 'neat-bold-icon',
        value: 'transparent'
    },
    //Remove All Formatting
    {
        id: 'removeFormatButton',
        name: 'Remove All Formatting',
        command: 'removeFormat',
        icon: <FormatClearIcon />,
        class: 'neat-bold-icon',
        value: 'transparent'
    },
    //Undo
    {
        id: 'undoButton',
        name: 'Undo',
        command: 'undo',
        icon: <UndoIcon />,
        class: 'neat-bold-icon',
        value: null
    },
    //Redo
    {
        id: 'redoButton',
        name: 'Redo',
        command: 'redo',
        icon: <RedoIcon />,
        class: 'neat-bold-icon',
        value: null
    },
    //Superscript
    {
        id: 'superscriptButton',
        name: 'Superscript',
        command: 'superscript',
        icon: <SuperscriptIcon />,
        class: 'neat-bold-icon',
        value: null
    },
    //Subscript
    {
        id: 'subscriptButton',
        name: 'Subscript',
        command: 'subscript',
        icon: <SubscriptIcon />,
        class: 'neat-bold-icon',
        value: null
    },
    //Clear All Text
    {
        id: 'clearAllButton',
        name: 'Clear All Text',
        command: 'clear',
        icon: <ClearIcon />,
        class: 'neat-clear-icon',
        value: null
    },
];

export const NeatEditor = (
    {
        customId = "neat-editor",
        customOnChange = () => {},
        defaultValue = "You can write your description here...",
        customClassName = "neat-editor",
        customStyle = {},
        editable = true
    }
) => {
  
  useEffect(() => { localStorage.setItem('fontSize', 3) }, [])
  
  const handleOnTextEditorFocus = (event)  => {
    if(event.target.innerText === defaultValue) {
        var element = document.getElementById(event.target.id);
        element.childNodes[0].remove();
    }
  }

  const handleOnTextEditorBlur = (event)  => {
    if(event.target.innerText === defaultValue || event.target.innerText === "") {
        var element = document.getElementById(event.target.id);
        element.append(defaultValue);
    }
  }

  const calculateFontSize = (command, value) => {
    var fontSize = +localStorage.getItem('fontSize');
    if(command === "dfontSize" && (fontSize === 7 || fontSize > 1)) {
        fontSize -= value;
    }
    if(command === "ifontSize" && (fontSize === 1 || fontSize < 7)) {
        fontSize += value;
    }
    command = "fontSize";
    value = fontSize;
    localStorage.setItem('fontSize', value);
    return [ command, value ];
  }

  const handleOnClickEditorChange = (event, command, value) => {
    var editor = document.getElementById(customId);
    if(command === "clear") {
        editor.innerText = defaultValue;
        return;
    }
    if((command === "dfontSize" || command === "ifontSize") && +localStorage.getItem('fontSize') > 0) {
        [ command, value ] = calculateFontSize(command, value);        
    }
    var clickedButton = document.getElementById(event.currentTarget.id);
    setTimeout(() => {
        clickedButton.style.color = '';
        clickedButton.style.backgroundColor = '';
    }, 1000)
    clickedButton.style.color = '#1976d2';
    clickedButton.style.backgroundColor = '#ececec';
    document.execCommand(command, false, value);
    editor.focus();
  }

   return (
        <div 
            className="full-neat-editor"
        >
            <div 
                className='neat-editor-toolbar'
            >
                {
                    toolbarFeatures && toolbarFeatures.map((feat) => {
                        return (
                            <Tooltip title={feat.name} key={feat.id} placement="bottom" arrow>
                                <IconButton 
                                    id={feat.id}
                                    className={feat.class}
                                    style={{ float: (feat.command === "clear" ? 'right' : '' ) }}
                                    onClick={(e) => {handleOnClickEditorChange(e, feat.command, feat.value)}}
                                >
                                    {feat.icon}
                                </IconButton>
                            </Tooltip>
                        )
                    })
                }
                {/* <Tooltip title="Bold" placement="bottom" arrow>
                    <IconButton 
                        id="boldButton"
                        className='text-bold-icon'
                        onClick={(e) => { handleOnClickEditorChange(e, 'bold') }}
                    >
                        <FormatBoldIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Italic" placement="bottom" arrow>
                    <IconButton 
                        id="italicButton"
                        onClick={(e) => { handleOnClickEditorChange(e, 'italic') }}
                    >
                        <FormatItalicIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Underline" placement="bottom" arrow>
                    <IconButton 
                        id="underlineButton"
                        onClick={(e) => { handleOnClickEditorChange(e, 'underline') }}
                    >
                        <FormatUnderlinedIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Strike Through" placement="bottom" arrow>
                    <IconButton 
                        id="strikeThroughButton"
                        onClick={(e) => { handleOnClickEditorChange(e, 'strikeThrough') }}
                    >
                        <StrikethroughSIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Justify Left" placement="bottom" arrow>
                    <IconButton 
                        id="justifyLeftButton"
                        onClick={(e) => { handleOnClickEditorChange(e, 'justifyLeft') }}
                    >
                        <FormatAlignLeftIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Justify Center" placement="bottom" arrow>
                    <IconButton 
                        id="justifyCenterButton"
                        onClick={(e) => { handleOnClickEditorChange(e, 'justifyCenter') }}
                    >
                        <FormatAlignCenterIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Justify Right" placement="bottom" arrow>
                    <IconButton 
                        id="justifyRightButton"
                        onClick={(e) => { handleOnClickEditorChange(e, 'justifyRight') }}
                    >
                        <FormatAlignRightIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Justify Full" placement="bottom" arrow>
                    <IconButton 
                        id="justifyFullButton"
                        onClick={(e) => { handleOnClickEditorChange(e, 'justifyFull') }}
                    >
                        <FormatAlignJustifyIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Horizontal Rule" placement="bottom" arrow>
                    <IconButton 
                        id="insertHorizontalRuleButton"
                        onClick={(e) => { handleOnClickEditorChange(e, 'insertHorizontalRule') }}
                    >
                        <HorizontalRuleIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Increase Font Size" placement="bottom" arrow>
                    <IconButton 
                        id="increaseFontSizeButton"
                        onClick={(e) => { handleOnClickEditorChange(e, 'increaseFontSize') }}
                    >
                        <TextIncreaseIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Decrease Font Size" placement="bottom" arrow>
                    <IconButton 
                        id="decreaseFontSizeButton"
                        onClick={(e) => { handleOnClickEditorChange(e, 'decreaseFontSize') }}
                    >
                        <TextDecreaseIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Blockquote" placement="bottom" arrow>
                    <IconButton 
                        id="formatBlockButton"
                        onClick={(e) => { handleOnClickEditorChange(e, 'formatBlock', '<PRE>') }}
                    >
                        <FormatQuoteIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Create Link" placement="bottom" arrow>
                    <IconButton 
                        id="createLinkButton"
                        onClick={(e) => { handleOnClickEditorChange(e, 'createLink', 'https://www.google.com/') }}
                    >
                        <LinkIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Highlight Text" placement="bottom" arrow>
                    <IconButton 
                        id="backColorButton"
                        onClick={(e) => { handleOnClickEditorChange(e, 'backColor', 'yellow') }}
                    >
                        <HighlightIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Remove Highlight Text" placement="bottom" arrow>
                    <IconButton 
                        id="backClearColorButton"
                        onClick={(e) => { handleOnClickEditorChange(e, 'backColor', 'transparent') }}
                    >
                        <HighlightOffIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Remove All Formatting" placement="bottom" arrow>
                    <IconButton 
                        id="removeFormatButton"
                        onClick={(e) => { handleOnClickEditorChange(e, 'removeFormat') }}
                    >
                        <FormatClearIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Undo" placement="bottom" arrow>
                    <IconButton 
                        id="undoButton"
                        onClick={(e) => { handleOnClickEditorChange(e, 'undo') }}
                    >
                        <UndoIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Redo" placement="bottom" arrow>
                    <IconButton 
                        id="RedoButton"
                        onClick={(e) => { handleOnClickEditorChange(e, 'redo') }}
                    >
                        <RedoIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Superscript" placement="bottom" arrow>
                    <IconButton 
                        id="superscriptButton"
                        onClick={(e) => { handleOnClickEditorChange(e, 'superscript') }}
                    >
                        <SuperscriptIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Subscript" placement="bottom" arrow>
                    <IconButton 
                        id="subscriptButton"
                        onClick={(e) => { handleOnClickEditorChange(e, 'subscript') }}
                    >
                        <SubscriptIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Clear All Text" placement="bottom" arrow>
                    <IconButton 
                        style={{float: 'right'}}
                        id="clearAllButton"
                        onClick={(e) => { handleOnClickEditorChange(e, 'clear') }}
                    >
                        <ClearIcon />
                    </IconButton>
                </Tooltip> */}
            </div>
            <Divider />
            <div 
                id={customId}
                contentEditable={editable}
                role="textbox"
                className={`neat-editor ${customClassName}`}
                onFocus={handleOnTextEditorFocus}
                onBlur={handleOnTextEditorBlur}
                style={{...customStyle}}
                onChange={() => customOnChange}
                suppressContentEditableWarning={true}
            >
                {defaultValue}
            </div>
        </div>
  )
}

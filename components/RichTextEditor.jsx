'use client';
import { useState } from 'react';
import { 
  Bold, 
  Italic, 
  List, 
  Link, 
  Image, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Smile,
  Code
} from 'lucide-react';

const RichTextEditor = ({ value, onChange, placeholder = "Write your content..." }) => {
  const [activeFormats, setActiveFormats] = useState(new Set());

  const handleFormat = (command, value = null) => {
    document.execCommand(command, false, value);
    
    // Update active formats
    const newActiveFormats = new Set(activeFormats);
    if (document.queryCommandState(command)) {
      newActiveFormats.add(command);
    } else {
      newActiveFormats.delete(command);
    }
    setActiveFormats(newActiveFormats);
  };

  const insertLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      handleFormat('createLink', url);
    }
  };

  const insertImage = () => {
    const url = prompt('Enter image URL:');
    if (url) {
      handleFormat('insertImage', url);
    }
  };

  const insertEmoji = () => {
    const emoji = prompt('Enter emoji (e.g., 😀):');
    if (emoji) {
      handleFormat('insertText', emoji);
    }
  };

  const ToolbarButton = ({ command, icon: Icon, title, onClick }) => {
    const isActive = activeFormats.has(command);
    
    return (
      <button
        type="button"
        onClick={onClick || (() => handleFormat(command))}
        title={title}
        className={`p-2 rounded hover:bg-customPrimary-bg transition-colors ${
          isActive ? 'bg-customPrimary-accent text-white' : 'text-text-secondary'
        }`}
      >
        <Icon className="h-4 w-4" />
      </button>
    );
  };

  return (
    <div className="border border-gray-600 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 bg-customPrimary-card border-b border-gray-600 flex-wrap">
        <ToolbarButton command="bold" icon={Bold} title="Bold" />
        <ToolbarButton command="italic" icon={Italic} title="Italic" />
        <div className="w-px h-6 bg-gray-600 mx-1" />
        <ToolbarButton command="insertUnorderedList" icon={List} title="Bullet List" />
        <ToolbarButton command="insertOrderedList" icon={List} title="Numbered List" />
        <div className="w-px h-6 bg-gray-600 mx-1" />
        <ToolbarButton command="justifyLeft" icon={AlignLeft} title="Align Left" />
        <ToolbarButton command="justifyCenter" icon={AlignCenter} title="Align Center" />
        <ToolbarButton command="justifyRight" icon={AlignRight} title="Align Right" />
        <div className="w-px h-6 bg-gray-600 mx-1" />
        <ToolbarButton command="formatBlock" icon={Code} title="Code Block" onClick={() => handleFormat('formatBlock', 'pre')} />
        <ToolbarButton command="createLink" icon={Link} title="Insert Link" onClick={insertLink} />
        <ToolbarButton command="insertImage" icon={Image} title="Insert Image" onClick={insertImage} />
        <ToolbarButton command="insertText" icon={Smile} title="Insert Emoji" onClick={insertEmoji} />
      </div>

      {/* Editor */}
      <div
        contentEditable
        onInput={(e) => onChange(e.target.innerHTML)}
        onKeyUp={() => {
          // Update active formats on cursor move
          const newActiveFormats = new Set();
          ['bold', 'italic', 'underline'].forEach(cmd => {
            if (document.queryCommandState(cmd)) {
              newActiveFormats.add(cmd);
            }
          });
          setActiveFormats(newActiveFormats);
        }}
        className="min-h-64 p-4 bg-customPrimary-bg text-text-primary focus:outline-none"
        style={{ minHeight: '200px' }}
        suppressContentEditableWarning={true}
        data-placeholder={placeholder}
      />
      
      <style jsx>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #8e8e8e;
          pointer-events: none;
        }
        [contenteditable] code {
          background-color: #2a2a2a;
          padding: 2px 4px;
          border-radius: 4px;
          font-family: 'JetBrains Mono', monospace;
        }
        [contenteditable] pre {
          background-color: #2a2a2a;
          padding: 12px;
          border-radius: 8px;
          overflow-x: auto;
          font-family: 'JetBrains Mono', monospace;
        }
        [contenteditable] a {
          color: #00c2ff;
          text-decoration: underline;
        }
        [contenteditable] img {
          max-width: 100%;
          height: auto;
          border-radius: 8px;
        }
      `}</style>
    </div>
  );
};

export default RichTextEditor;
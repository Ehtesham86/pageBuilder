'use client'

import { useRef, useState } from 'react'
import JoditEditor from 'jodit-react'
import { X, AlignCenter, AlignLeft, AlignRight, Plus, Trash2 } from 'lucide-react'
import { Block } from './types/block';

interface StylePanelProps {
  block: Block
  updateBlock: (id: number, content: string, styles: any, videoUrl?: string, videoType?: 'url' | 'youtube' | 'vimeo') => void
  closePanel: () => void
}

export default function StylePanel({ block, updateBlock, closePanel }: StylePanelProps) {
  const editorRef = useRef(null)
  const [htmlContent, setHtmlContent] = useState(block.content)
  const [styles, setStyles] = useState(block.styles || { default: {}, mediaQueries: {} })
  const [videoUrl, setVideoUrl] = useState(block.videoUrl || '')
  const [videoType, setVideoType] = useState<'url' | 'youtube' | 'vimeo'>(block.videoType || 'url')
  const [formConfig, setFormConfig] = useState({
    userId: 'your_user_ID',
    campaign: 'vlogger',
    redirectUrl: 'your_redirectURL',
    fields: [
      { type: 'text', name: 'name', label: 'Name:' },
      { type: 'email', name: 'email', label: 'Email:' },
      { type: 'textarea', name: 'message', label: 'Message:' },
    ],
  })
  const [userId, setUserId] = useState('your_user_ID')
  const [campaignName, setCampaignName] = useState('vlogger')
  const [redirectUrl, setRedirectUrl] = useState('your_redirectURL')

  const config = {
    readonly: false,
    height: 300,
    buttons: [
      'bold', 'italic', 'underline', 'strikethrough',
      '|',
      'align', 'outdent', 'indent',
      '|',
      'ul', 'ol',
      '|',
      'font', 'fontsize', 'brush', 'paragraph',
      '|',
      'image', 'table', 'link',
      '|',
      'hr', 'eraser', 'copyformat',
      '|',
      'symbol', 'fullsize', 'print'
    ],
    uploader: { insertImageAsBase64URI: true },
    showXPathInStatusbar: false,
    showCharsCounter: false,
    showWordsCounter: false,
    toolbarAdaptive: false,
  }

  const handleContentUpdate = (newContent: string) => {
    if (block.type === 'button') {
      const buttonText = newContent.match(/>([^<]+)</)?.[1] || '';
      const updatedContent = `<button>${buttonText}</button>`;
      updateBlock(block.id, updatedContent, styles);
    } else {
      updateBlock(block.id, newContent, styles);
    }
  }

  const handleHtmlUpdate = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setHtmlContent(e.target.value)
  }

  const applyHtmlChanges = () => {
    updateBlock(block.id, htmlContent, styles)
  }

  const handleStyleChange = (property: string, value: string, mediaQuery: string = 'default') => {
    const newStyles = {
      ...styles,
      [mediaQuery]: {
        ...styles[mediaQuery],
        [property]: value
      }
    };
    setStyles(newStyles);
    updateBlock(block.id, block.content, newStyles);
  }

  const renderStyleInputs = (mediaQuery: string = 'default') => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Border Radius</label>
        <input
          type="range"
          min="0"
          max="50"
          step="1"
          value={parseInt(styles[mediaQuery]?.borderRadius) || 0}
          onChange={(e) => handleStyleChange('borderRadius', `${e.target.value}px`, mediaQuery)}
          className="w-full accent-purple-600"
        />
        <span>{styles[mediaQuery]?.borderRadius || '0px'}</span>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Background Color</label>
        <input
          type="color"
          value={styles[mediaQuery]?.backgroundColor || '#ffffff'}
          onChange={(e) => handleStyleChange('backgroundColor', e.target.value, mediaQuery)}
          className="w-full h-8"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Background Gradient</label>
        <div className="flex space-x-2">
          <input
            type="color"
            value={styles[mediaQuery]?.backgroundGradientStart || '#ffffff'}
            onChange={(e) => {
              const start = e.target.value;
              const end = styles[mediaQuery]?.backgroundGradientEnd || '#ffffff';
              handleStyleChange('backgroundImage', `linear-gradient(to right, ${start}, ${end})`, mediaQuery);
              handleStyleChange('backgroundGradientStart', start, mediaQuery);
            }}
            className="w-1/2 h-8"
          />
          <input
            type="color"
            value={styles[mediaQuery]?.backgroundGradientEnd || '#ffffff'}
            onChange={(e) => {
              const start = styles[mediaQuery]?.backgroundGradientStart || '#ffffff';
              const end = e.target.value;
              handleStyleChange('backgroundImage', `linear-gradient(to right, ${start}, ${end})`, mediaQuery);
              handleStyleChange('backgroundGradientEnd', end, mediaQuery);
            }}
            className="w-1/2 h-8"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Text Color</label>
        <input
          type="color"
          value={styles[mediaQuery]?.color || '#000000'}
          onChange={(e) => handleStyleChange('color', e.target.value, mediaQuery)}
          className="w-full h-8"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Width</label>
        <input
          type="range"
          min="10"
          max="100"
          step="1"
          value={parseInt(styles[mediaQuery]?.width) || 100}
          onChange={(e) => handleStyleChange('width', `${e.target.value}%`, mediaQuery)}
          className="w-full accent-purple-600"
        />
        <span>{styles[mediaQuery]?.width || '100%'}</span>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Padding</label>
        <div className="grid grid-cols-2 gap-2">
          {['Top', 'Right', 'Bottom', 'Left'].map((direction) => (
            <div key={direction}>
              <label className="block text-xs">{direction}</label>
              <input
                type="range"
                min="0"
                max="50"
                step="1"
                value={parseInt(styles[mediaQuery]?.[`padding${direction}`]) || 0}
                onChange={(e) => handleStyleChange(`padding${direction}`, `${e.target.value}px`, mediaQuery)}
                className="w-full accent-purple-600"
              />
              <span>{styles[mediaQuery]?.[`padding${direction}`] || '0px'}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Margin</label>
        <div className="grid grid-cols-2 gap-2">
          {['Top', 'Right', 'Bottom', 'Left'].map((direction) => (
            <div key={direction}>
              <label className="block text-xs">{direction}</label>
              <input
                type="range"
                min="0"
                max="50"
                step="1"
                value={parseInt(styles[mediaQuery]?.[`margin${direction}`]) || 0}
                onChange={(e) => handleStyleChange(`margin${direction}`, `${e.target.value}px`, mediaQuery)}
                className="w-full accent-purple-600"
              />
              <span>{styles[mediaQuery]?.[`margin${direction}`] || '0px'}</span>
            </div>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Position</label>
        <select
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          value={styles[mediaQuery]?.position || ''}
          onChange={(e) => handleStyleChange('position', e.target.value, mediaQuery)}
        >
          <option value="">Default</option>
          <option value="relative">Relative</option>
          <option value="absolute">Absolute</option>
          <option value="fixed">Fixed</option>
          <option value="sticky">Sticky</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Text Align</label>
        <div className="flex space-x-2 mt-1">
          <button
            className={`p-2 rounded ${styles[mediaQuery]?.textAlign === 'left' ? 'bg-purple-200' : 'bg-gray-100'}`}
            onClick={() => handleStyleChange('textAlign', 'left', mediaQuery)}
          >
            <AlignLeft size={16} />
          </button>
          <button
            className={`p-2 rounded ${styles[mediaQuery]?.textAlign === 'center' ? 'bg-purple-200' : 'bg-gray-100'}`}
            onClick={() => handleStyleChange('textAlign', 'center', mediaQuery)}
          >
            <AlignCenter size={16} />
          </button>
          <button
            className={`p-2 rounded ${styles[mediaQuery]?.textAlign === 'right' ? 'bg-purple-200' : 'bg-gray-100'}`}
            onClick={() => handleStyleChange('textAlign', 'right', mediaQuery)}
          >
            <AlignRight size={16} />
          </button>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Text Decoration</label>
        <select
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          value={styles[mediaQuery]?.textDecoration || ''}
          onChange={(e) => handleStyleChange('textDecoration', e.target.value, mediaQuery)}
        >
          <option value="">None</option>
          <option value="underline">Underline</option>
          <option value="overline">Overline</option>
          <option value="line-through">Line-through</option>
        </select>
      </div>
      {(block.type === 'header' || block.type === 'paragraph' || block.type === 'button' || block.type === 'card' || block.type === 'footer') && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700">Font Weight</label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              value={styles[mediaQuery]?.fontWeight || ''}
              onChange={(e) => handleStyleChange('fontWeight', e.target.value, mediaQuery)}
            >
              <option value="">Default</option>
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
              <option value="lighter">Lighter</option>
              <option value="bolder">Bolder</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Text Decoration</label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              value={styles[mediaQuery]?.textDecoration || ''}
              onChange={(e) => handleStyleChange('textDecoration', e.target.value, mediaQuery)}
            >
              <option value="">None</option>
              <option value="underline">Underline</option>
              <option value="overline">Overline</option>
              <option value="line-through">Line-through</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Text Transform</label>
            <select
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              value={styles[mediaQuery]?.textTransform || ''}
              onChange={(e) => handleStyleChange('textTransform', e.target.value, mediaQuery)}
            >
              <option value="">None</option>
              <option value="uppercase">Uppercase</option>
              <option value="lowercase">Lowercase</option>
              <option value="capitalize">Capitalize</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Letter Spacing</label>
            <input
              type="text"
              value={styles[mediaQuery]?.letterSpacing || ''}
              onChange={(e) => handleStyleChange('letterSpacing', e.target.value, mediaQuery)}
              placeholder="e.g., 2px"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </>
      )}
    </div>
  )

  const handleVideoUpdate = () => {
    updateBlock(block.id, block.content, styles, videoUrl, videoType)
  }

  const renderVideoInputs = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Video URL</label>
        <input
          type="text"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          placeholder="Enter video URL"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Video Type</label>
        <select
          value={videoType}
          onChange={(e) => setVideoType(e.target.value as 'url' | 'youtube' | 'vimeo')}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        >
          <option value="url">Direct URL</option>
          <option value="youtube">YouTube</option>
          <option value="vimeo">Vimeo</option>
        </select>
      </div>
      <button
        className="mt-2 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        onClick={handleVideoUpdate}
      >
        Update Video
      </button>
    </div>
  )

  const renderImageInputs = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Image URL</label>
        <input
          type="text"
          value={htmlContent}
          onChange={(e) => setHtmlContent(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          placeholder="Enter image URL"
        />
      </div>
      <button
        className="mt-2 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        onClick={() => updateBlock(block.id, htmlContent, styles)}
      >
        Update Image
      </button>
    </div>
  )

  const renderImageStyles = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Alignment</label>
        <select
          value={styles.default.margin || 'auto'}
          onChange={(e) => handleStyleChange('margin', e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        >
          <option value="0">Left</option>
          <option value="auto">Center</option>
          <option value="0 0 0 auto">Right</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Max Width</label>
        <input
          type="range"
          min="10"
          max="100"
          step="1"
          value={parseInt(styles.default.maxWidth) || 100}
          onChange={(e) => handleStyleChange('maxWidth', `${e.target.value}%`)}
          className="w-full accent-purple-600"
        />
        <span>{styles.default.maxWidth || '100%'}</span>
      </div>
    </div>
  )

  const renderButtonStyles = (mediaQuery: string = 'default') => {
    // Extract button text from HTML content
    const buttonText = htmlContent.match(/>([^<]+)</)?.[1] || '';

    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Button URL</label>
          <input
            type="text"
            value={styles[mediaQuery]?.href || ''}
            onChange={(e) => handleStyleChange('href', e.target.value, mediaQuery)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            placeholder="Enter URL (e.g., https://example.com)"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Button Text</label>
          <textarea
            value={buttonText}
            onChange={(e) => {
              const newButtonText = e.target.value;
              setHtmlContent(`<button>${newButtonText}</button>`);
            }}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            rows={3}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Background Color</label>
          <input
            type="color"
            value={styles[mediaQuery]?.backgroundColor || '#000000'}
            onChange={(e) => handleStyleChange('backgroundColor', e.target.value, mediaQuery)}
            className="w-full h-8"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Text Color</label>
          <input
            type="color"
            value={styles[mediaQuery]?.color || '#ffffff'}
            onChange={(e) => handleStyleChange('color', e.target.value, mediaQuery)}
            className="w-full h-8"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Border Radius</label>
          <input
            type="range"
            min="0"
            max="50"
            step="1"
            value={parseInt(styles[mediaQuery]?.borderRadius) || 0}
            onChange={(e) => handleStyleChange('borderRadius', `${e.target.value}px`, mediaQuery)}
            className="w-full accent-purple-600"
          />
          <span>{styles[mediaQuery]?.borderRadius || '0px'}</span>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Margin</label>
          <div className="grid grid-cols-2 gap-2">
            {['Top', 'Right', 'Bottom', 'Left'].map((direction) => (
              <div key={direction}>
                <label className="block text-xs">{direction}</label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="1"
                  value={parseInt(styles[mediaQuery]?.[`margin${direction}`]) || 0}
                  onChange={(e) => handleStyleChange(`margin${direction}`, `${e.target.value}px`, mediaQuery)}
                  className="w-full accent-purple-600"
                />
                <span>{styles[mediaQuery]?.[`margin${direction}`] || '0px'}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Padding</label>
          <div className="grid grid-cols-2 gap-2">
            {['Top', 'Right', 'Bottom', 'Left'].map((direction) => (
              <div key={direction}>
                <label className="block text-xs">{direction}</label>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="1"
                  value={parseInt(styles[mediaQuery]?.[`padding${direction}`]) || 0}
                  onChange={(e) => handleStyleChange(`padding${direction}`, `${e.target.value}px`, mediaQuery)}
                  className="w-full accent-purple-600"
                />
                <span>{styles[mediaQuery]?.[`padding${direction}`] || '0px'}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Width</label>
          <input
            type="range"
            min="10"
            max="100"
            step="1"
            value={parseInt(styles[mediaQuery]?.width) || 100}
            onChange={(e) => handleStyleChange('width', `${e.target.value}%`, mediaQuery)}
            className="w-full accent-purple-600"
          />
          <span>{styles[mediaQuery]?.width || '100%'}</span>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Alignment</label>
          <select
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            value={styles[mediaQuery]?.margin || ''}
            onChange={(e) => handleStyleChange('margin', e.target.value, mediaQuery)}
          >
            <option value="">Default</option>
            <option value="0 auto">Center</option>
            <option value="0">Left</option>
            <option value="0 0 0 auto">Right</option>
          </select>
        </div>
        <button
          className="mt-2 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
          onClick={() => {
            const buttonText = htmlContent.match(/>([^<]+)</)?.[1] || '';
            const buttonUrl = styles[mediaQuery]?.href || '#';
            const updatedContent = `<a href="${buttonUrl}" style="display: inline-block; text-decoration: none;"><button>${buttonText}</button></a>`;
            updateBlock(block.id, updatedContent, styles);
          }}
        >
          Update Button
        </button>
      </div>
    )
  }

  const renderCardStyles = (mediaQuery: string = 'default') => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Card Background Color</label>
        <input
          type="color"
          value={styles[mediaQuery]?.backgroundColor || '#ffffff'}
          onChange={(e) => handleStyleChange('backgroundColor', e.target.value, mediaQuery)}
          className="w-full h-8"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Card Border Color</label>
        <input
          type="color"
          value={styles[mediaQuery]?.borderColor || '#000000'}
          onChange={(e) => handleStyleChange('borderColor', e.target.value, mediaQuery)}
          className="w-full h-8"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Card Border Width</label>
        <input
          type="range"
          min="0"
          max="10"
          step="1"
          value={parseInt(styles[mediaQuery]?.borderWidth) || 0}
          onChange={(e) => handleStyleChange('borderWidth', `${e.target.value}px`, mediaQuery)}
          className="w-full accent-purple-600"
        />
        <span>{styles[mediaQuery]?.borderWidth || '0px'}</span>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Card Border Radius</label>
        <input
          type="range"
          min="0"
          max="50"
          step="1"
          value={parseInt(styles[mediaQuery]?.borderRadius) || 0}
          onChange={(e) => handleStyleChange('borderRadius', `${e.target.value}px`, mediaQuery)}
          className="w-full accent-purple-600"
        />
        <span>{styles[mediaQuery]?.borderRadius || '0px'}</span>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Card Box Shadow</label>
        <input
          type="text"
          value={styles[mediaQuery]?.boxShadow || ''}
          onChange={(e) => handleStyleChange('boxShadow', e.target.value, mediaQuery)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          placeholder="e.g., 0 4px 6px rgba(0, 0, 0, 0.1)"
        />
      </div>
      <JoditEditor
        ref={editorRef}
        value={htmlContent}
        config={{
          ...config,
          buttons: ['bold', 'italic', 'underline', '|', 'ul', 'ol', '|', 'link', 'image'],
        }}
        onBlur={(newContent) => {
          setHtmlContent(newContent);
          updateBlock(block.id, newContent, styles);
        }}
      />
    </div>
  )

  const renderFooterStyles = (mediaQuery: string = 'default') => (
    <div className="space-y-4">
      {renderStyleInputs(mediaQuery)}
      <div>
        <label className="block text-sm font-medium text-gray-700">Footer Background Color</label>
        <input
          type="color"
          value={styles[mediaQuery]?.backgroundColor || '#000000'}
          onChange={(e) => handleStyleChange('backgroundColor', e.target.value, mediaQuery)}
          className="w-full h-8"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Footer Height</label>
        <input
          type="text"
          value={styles[mediaQuery]?.height || ''}
          onChange={(e) => handleStyleChange('height', e.target.value, mediaQuery)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          placeholder="e.g., 100px"
        />
      </div>
    </div>
  )

  const renderLinkStyles = (mediaQuery: string = 'default') => (
    <div className="space-y-4">
      {renderStyleInputs(mediaQuery)}
      <div>
        <label className="block text-sm font-medium text-gray-700">Link URL</label>
        <input
          type="text"
          value={styles[mediaQuery]?.href || ''}
          onChange={(e) => handleStyleChange('href', e.target.value, mediaQuery)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          placeholder="Enter URL (e.g., https://example.com)"
        />
      </div>
      <JoditEditor
        ref={editorRef}
        value={htmlContent}
        config={{
          ...config,
          buttons: ['link', 'unlink', '|', 'bold', 'italic', 'underline', '|', 'fontsize', 'brush'],
        }}
        onBlur={(newContent) => {
          setHtmlContent(newContent);
          updateBlock(block.id, newContent, styles);
        }}
      />
    </div>
  )

  const renderTableStyles = (mediaQuery: string = 'default') => (
    <div className="space-y-4">
      {renderStyleInputs(mediaQuery)}
      <div>
        <label className="block text-sm font-medium text-gray-700">Border Collapse</label>
        <select
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          value={styles[mediaQuery]?.borderCollapse || ''}
          onChange={(e) => handleStyleChange('borderCollapse', e.target.value, mediaQuery)}
        >
          <option value="separate">Separate</option>
          <option value="collapse">Collapse</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Border Spacing</label>
        <input
          type="number"
          value={parseInt(styles[mediaQuery]?.borderSpacing) || 0}
          onChange={(e) => handleStyleChange('borderSpacing', `${e.target.value}px`, mediaQuery)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
    </div>
  )

  const renderSocialStyles = (mediaQuery: string = 'default') => (
    <div className="space-y-4">
      {renderStyleInputs(mediaQuery)}
      <div>
        <label className="block text-sm font-medium text-gray-700">Icon Size</label>
        <input
          type="number"
          value={parseInt(styles[mediaQuery]?.fontSize) || 16}
          onChange={(e) => handleStyleChange('fontSize', `${e.target.value}px`, mediaQuery)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Alignment</label>
        <select
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          value={styles[mediaQuery]?.textAlign || ''}
          onChange={(e) => handleStyleChange('textAlign', e.target.value, mediaQuery)}
        >
          <option value="">Default</option>
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
        </select>
      </div>
      <JoditEditor
        ref={editorRef}
        value={htmlContent}
        config={{
          ...config,
          buttons: ['link', 'unlink', '|', 'bold', 'italic', 'underline'],
        }}
        onBlur={(newContent) => {
          setHtmlContent(newContent);
          updateBlock(block.id, newContent, styles);
        }}
      />
    </div>
  )

  const updateFormSettings = () => {
    const updatedContent = htmlContent.replace(
      /action="https:\/\/munkpin\.onrender\.com\/api\/submit\/[^"]*"/,
      `action="https://munkpin.onrender.com/api/submit/${userId}"`
    ).replace(
      /name="campaign" value="[^"]*"/,
      `name="campaign" value="${campaignName}"`
    ).replace(
      /name="redirectUrl" value="[^"]*"/,
      `name="redirectUrl" value="${redirectUrl}"`
    );
    updateBlock(block.id, updatedContent, styles);
  }

  const renderFormStyles = (mediaQuery: string = 'default') => (
    <div className="space-y-4">
      {renderStyleInputs(mediaQuery)}
      <div>
        <label className="block text-sm font-medium text-gray-700">User ID</label>
        <input
          type="text"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="mt-1 block w-full borderborder-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Campaign Name</label>
        <input
          type="text"
          value={campaignName}
          onChange={(e) => setCampaignName(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Redirect URL</label>
        <input
          type="text"
          value={redirectUrl}
          onChange={(e) => setRedirectUrl(e.target.value)}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <button
        className="mt-2 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
        onClick={updateFormSettings}
      >
        Update Form Settings
      </button>
      <JoditEditor
        ref={editorRef}
        value={htmlContent}
        config={{
          ...config,
          buttons: ['bold', 'italic', 'underline', '|', 'ul', 'ol', '|', 'link', 'unlink'],
        }}
        onBlur={(newContent) => {
          setHtmlContent(newContent);
          updateBlock(block.id, newContent, styles);
        }}
      />
    </div>
  )

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Style Editor</h2>
        <button onClick={closePanel} className="text-gray-500 hover:text-gray-700">
          <X size={20} />
        </button>
      </div>
      <div className="mb-4">
        <h3 className="text-md font-medium mb-2">Content</h3>
        {block.type === 'video' && renderVideoInputs()}
        {block.type === 'image' && renderImageInputs()}
        {block.type === 'button' && renderButtonStyles()}
        {block.type === 'link' && renderLinkStyles()}
        {block.type === 'table' && renderTableStyles()}
        {block.type === 'footer' && renderFooterStyles()}
        {block.type === 'card' && renderCardStyles()}
        {block.type === 'social' && renderSocialStyles()}
        {block.type === 'form' && renderFormStyles()}
        {block.type === 'html' ? (
          <>
            <textarea
              className="w-full h-64 p-2 border border-gray-300 rounded"
              value={htmlContent}
              onChange={(e) => setHtmlContent(e.target.value)}
              placeholder="Enter your HTML, CSS, Tailwind CSS, or Bootstrap code here"
            />
            <button
              className="mt-2 bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600"
              onClick={() => updateBlock(block.id, htmlContent, styles)}
            >
              Apply Changes
            </button>
          </>
        ) : (block.type !== 'video' && block.type !== 'image' && block.type !== 'button' && block.type !== 'link' && block.type !== 'form') && (
          <JoditEditor
            ref={editorRef}
            value={block.content}
            config={{
              ...config,
              buttons: block.type === 'social'
                ? ['link', 'unlink', '|', 'bold', 'italic', 'underline']
                : config.buttons,
            }}
            onBlur={(newContent) => updateBlock(block.id, newContent, styles)}
          />
        )}
      </div>
      {(block.type === 'header' || block.type === 'paragraph' || block.type === 'image' || block.type === 'button' || block.type === 'card' || block.type === 'footer' || block.type === 'link' || block.type === 'table' || block.type === 'social' || block.type === 'form') && (
        <div className="mb-4">
          <h3 className="text-md font-medium mb-2">Default Styles</h3>
          {block.type === 'image' ? renderImageStyles() :
            block.type === 'button' ? renderButtonStyles() :
              block.type === 'card' ? renderCardStyles() :
                block.type === 'footer' ? renderFooterStyles() :
                  block.type === 'link' ? renderLinkStyles() :
                    block.type === 'table' ? renderTableStyles() :
                      block.type === 'social' ? renderSocialStyles() :
                        block.type === 'form' ? renderFormStyles() :
                          renderStyleInputs()}
          <h3 className="text-md font-medium mb-2 mt-4">Media Queries</h3>
          <select
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            value={Object.keys(styles.mediaQueries)[0] || ''}
            onChange={(e) => {
              if (e.target.value) {
                setStyles(prevStyles => ({
                  ...prevStyles,
                  mediaQueries: {
                    [e.target.value]: prevStyles.mediaQueries[e.target.value] || {}
                  }
                }))
              } else {
                setStyles(prevStyles => ({
                  ...prevStyles,
                  mediaQueries: {}
                }))
              }
            }}
          >
            <option value="">None</option>
            <option value="sm">Small (640px)</option>
            <option value="md">Medium (768px)</option>
            <option value="lg">Large (1024px)</option>
            <option value="xl">Extra Large (1280px)</option>
          </select>
          {Object.keys(styles.mediaQueries).length > 0 && (
            <div className="mt-4">
              {block.type === 'button' ? renderButtonStyles(Object.keys(styles.mediaQueries)[0]) :
                block.type === 'card' ? renderCardStyles(Object.keys(styles.mediaQueries)[0]) :
                  block.type === 'footer' ? renderFooterStyles(Object.keys(styles.mediaQueries)[0]) :
                    block.type === 'link' ? renderLinkStyles(Object.keys(styles.mediaQueries)[0]) :
                      block.type === 'table' ? renderTableStyles(Object.keys(styles.mediaQueries)[0]) :
                        block.type === 'social' ? renderSocialStyles(Object.keys(styles.mediaQueries)[0]) :
                          block.type === 'form' ? renderFormStyles(Object.keys(styles.mediaQueries)[0]) :
                            renderStyleInputs(Object.keys(styles.mediaQueries)[0])}
            </div>
          )}
        </div>
      )}
    </div>
  )
}


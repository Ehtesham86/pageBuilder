'use client'

import { useState, useCallback, useEffect } from 'react'
import Sidebar from './sidebar'
import Editor from './editor'
import StylePanel from './style-panel'
import { Navbar } from './navbar'
import { Block } from '../types/block'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function PageBuilder() {
  const [blocks, setBlocks] = useState<Block[]>([])
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null)
  const [history, setHistory] = useState<Block[][]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [previewDevice, setPreviewDevice] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false)
  const [templateName, setTemplateName] = useState('')
  const [globalStyles, setGlobalStyles] = useState({})

  useEffect(() => {
    const savedBlocks = localStorage.getItem('pageBuilderBlocks');
    if (savedBlocks) {
      setBlocks(JSON.parse(savedBlocks));
    }
  }, []);

  const addBlock = (type: string) => {
    let content = '';
    let videoUrl = '';
    let videoType: 'url' | 'youtube' | 'vimeo' = 'url';
    switch (type) {
      case 'header':
        content = '<h2>This is a header</h2>';
        break;
      case 'paragraph':
        content = '<p>This is a paragraph text</p>';
        break;
      case 'html':
        content = '<!-- Enter your HTML, CSS, Tailwind CSS, or Bootstrap code here -->';
        break;
      case 'video':
        content = '';
        videoUrl = 'https://example.com/video.mp4';
        break;
      case 'image':
        content = 'https://example.com/image.jpg';
        break;
      case 'button':
        content = '<button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Click me</button>';
        break;
      case 'table':
        content = `
        <table class="w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th class="border border-gray-300 p-2">Header 1</th>
              <th class="border border-gray-300 p-2">Header 2</th>
              <th class="border border-gray-300 p-2">Header 3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="border border-gray-300 p-2">Row 1, Cell 1</td>
              <td class="border border-gray-300 p-2">Row 1, Cell 2</td>
              <td class="border border-gray-300 p-2">Row 1, Cell 3</td>
            </tr>
            <tr>
              <td class="border border-gray-300 p-2">Row 2, Cell 1</td>
              <td class="border border-gray-300 p-2">Row 2, Cell 2</td>
              <td class="border border-gray-300 p-2">Row 2, Cell 3</td>
            </tr>
          </tbody>
        </table>
      `;
        break;
      case 'form':
        content = `
<form action="https://munkpin.onrender.com/api/submit/your_user_ID" method="POST" enctype="application/x-www-form-urlencoded">
<input type="hidden" name="campaign" value="vlogger" />
<input type="hidden" name="redirectUrl" value="your_redirectURL" />

<label for="name">Name:</label>
<input type="text" id="name" name="name" />

<label for="email">Email:</label>
<input type="email" id="email" name="email" />

<label for="message">Message:</label>
<textarea id="message" name="message"></textarea>

<button type="submit">Submit</button>
</form>
      `;
        break;
    }
    const newBlocks = [...blocks, { id: Date.now(), type, content, styles: { default: {}, mediaQueries: {} }, videoUrl, videoType }];
    setBlocks(newBlocks);
    addToHistory(newBlocks);
  }

  const updateBlock = (id: number, content: string, styles: any, videoUrl?: string, videoType?: 'url' | 'youtube' | 'vimeo') => {
    const newBlocks = blocks.map(block =>
      block.id === id
        ? { ...block, content, styles, videoUrl, videoType }
        : block
    );
    setBlocks(newBlocks);
    if (selectedBlock && selectedBlock.id === id) {
      setSelectedBlock({ ...selectedBlock, content, styles, videoUrl, videoType });
    }
    addToHistory(newBlocks);
  }

  const moveBlock = (id: number, direction: 'up' | 'down') => {
    const index = blocks.findIndex(block => block.id === id)
    if (
      (direction === 'up' && index > 0) ||
      (direction === 'down' && index < blocks.length - 1)
    ) {
      const newBlocks = [...blocks]
      const [movedBlock] = newBlocks.splice(index, 1)
      newBlocks.splice(direction === 'up' ? index - 1 : index + 1, 0, movedBlock)
      setBlocks(newBlocks)
      addToHistory(newBlocks)
    }
  }

  const deleteBlock = (id: number) => {
    const newBlocks = blocks.filter(block => block.id !== id);
    setBlocks(newBlocks);
    if (selectedBlock && selectedBlock.id === id) {
      setSelectedBlock(null);
    }
    addToHistory(newBlocks);
  }

  const duplicateBlock = (id: number) => {
    const blockToDuplicate = blocks.find(block => block.id === id)
    if (blockToDuplicate) {
      const newBlock = { ...blockToDuplicate, id: Date.now() }
      const index = blocks.findIndex(block => block.id === id)
      const newBlocks = [...blocks]
      newBlocks.splice(index + 1, 0, newBlock)
      setBlocks(newBlocks)
      addToHistory(newBlocks)
    }
  }

  const addToHistory = (newBlocks: Block[]) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newBlocks);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
    localStorage.setItem('pageBuilderBlocks', JSON.stringify(newBlocks));
  }

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      const newBlocks = history[historyIndex - 1];
      setBlocks(newBlocks);
      localStorage.setItem('pageBuilderBlocks', JSON.stringify(newBlocks));
    }
  }

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      const newBlocks = history[historyIndex + 1];
      setBlocks(newBlocks);
      localStorage.setItem('pageBuilderBlocks', JSON.stringify(newBlocks));
    }
  }

  const preview = () => {
    const previewWindow = window.open('', '_blank');
    if (previewWindow) {
      const styles = blocks.map(block => `
        #block-${block.id} {
          ${Object.entries(block.styles.default).map(([key, value]) => `${key}: ${value};`).join('')}
        }
        ${Object.entries(block.styles.mediaQueries || {}).map(([query, styles]) => `
          @media (min-width: ${query === 'sm' ? '640px' : query === 'md' ? '768px' : query === 'lg' ? '1024px' : '1280px'}) {
            #block-${block.id} {
              ${Object.entries(styles as any).map(([key, value]) => `${key}: ${value};`).join('')}
            }
          }
        `).join('')}
      `).join('');

      const globalStylesString = Object.entries(globalStyles).map(([key, value]) => `${key}: ${value};`).join('');

      previewWindow.document.write(`
        <html>
          <head>
            <title>Preview</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
              body {
                ${globalStylesString}
              }
              ${styles}
            </style>
          </head>
          <body>
            ${blocks.map(block => `
              <div id="block-${block.id}">
                ${block.type === 'video' ? renderVideo(block) : block.content}
              </div>
            `).join('')}
          </body>
        </html>
      `);
      previewWindow.document.close();
    }
  }

  const renderVideo = (block: Block) => {
    if (!block.videoUrl) return '';

    switch (block.videoType) {
      case 'youtube':
        return `<iframe width="100%" height="315" src="https://www.youtube.com/embed/${getYoutubeId(block.videoUrl)}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      case 'vimeo':
        return `<iframe src="https://player.vimeo.com/video/${getVimeoId(block.videoUrl)}" width="100%" height="315" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
      default:
        return `<video width="100%" height="315" controls><source src="${block.videoUrl}" type="video/mp4">Your browser does not support the video tag.</video>`;
    }
  }

  const getYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  const getVimeoId = (url: string) => {
    const regExp = /vimeo.*\/(\d+)/i;
    const match = url.match(regExp);
    return match ? match[1] : null;
  }

  const handleDeviceSelect = useCallback((device: 'mobile' | 'tablet' | 'desktop') => {
    setPreviewDevice(device);
  }, []);

  const handlePublish = () => {
    // Implement publish functionality here
    console.log('Publishing...');
  };

  const handleChatWithMunkpin = () => {
    // Implement chat functionality here
    console.log('Opening chat with Munkpin...');
  };

  const handleSaveTemplate = () => {
    setIsSaveModalOpen(true);
  };

  const saveTemplate = () => {
    if (templateName) {
      const template = {
        name: templateName,
        blocks: blocks,
        globalStyles: globalStyles
      };
      const savedTemplates = JSON.parse(localStorage.getItem('savedTemplates') || '[]');
      savedTemplates.push(template);
      localStorage.setItem('savedTemplates', JSON.stringify(savedTemplates));
      setIsSaveModalOpen(false);
      setTemplateName('');
    }
  };

  const updateGlobalStyles = (newStyles: any) => {
    setGlobalStyles(prevStyles => ({
      ...prevStyles,
      ...newStyles
    }));
  };

  const handleInsertTemplate = (template: any) => {
    const newBlock: Block = {
      id: Date.now(),
      type: 'html',
      content: template.content,
      styles: { default: {}, mediaQueries: {} },
    };
    const newBlocks = [...blocks, newBlock];
    setBlocks(newBlocks);
    addToHistory(newBlocks);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar
        canUndo={historyIndex > 0}
        canRedo={historyIndex < history.length - 1}
        onUndo={undo}
        onRedo={redo}
        onPreview={preview}
        onPublish={handlePublish}
        onChatWithMunkpin={handleChatWithMunkpin}
        onSaveTemplate={handleSaveTemplate}
        onDeviceSelect={handleDeviceSelect}
        globalStyles={globalStyles}
        updateGlobalStyles={updateGlobalStyles}
        onInsertTemplate={handleInsertTemplate}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar addBlock={addBlock} />
        <Editor
          blocks={blocks}
          updateBlock={updateBlock}
          moveBlock={moveBlock}
          deleteBlock={deleteBlock}
          duplicateBlock={duplicateBlock}
          setSelectedBlock={setSelectedBlock}
          previewDevice={previewDevice}
          globalStyles={globalStyles}
        />
        {selectedBlock && (
          <StylePanel
            block={selectedBlock}
            updateBlock={updateBlock}
            closePanel={() => setSelectedBlock(null)}
          />
        )}
      </div>
      <Dialog open={isSaveModalOpen} onOpenChange={setIsSaveModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Template</DialogTitle>
            <DialogDescription>
              Give your template a name to save it for future use.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            placeholder="Enter template name"
          />
          <DialogFooter>
            <Button onClick={() => setIsSaveModalOpen(false)} variant="outline">Cancel</Button>
            <Button onClick={saveTemplate} className="bg-purple-500 text-white hover:bg-purple-600">Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}


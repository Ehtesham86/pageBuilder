'use client'

import { useState, useCallback, useEffect } from 'react'
import Sidebar from './sidebar'
import Editor from './editor'
import StylePanel from './style-panel'
import { Navbar } from './navbar'
import { Block } from './types/block'
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
      case 'card':
        content = `
        <div class="max-w-sm rounded overflow-hidden shadow-lg">
          <img class="w-full" src="https://via.placeholder.com/400x200" alt="Card image">
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">Card Title</div>
            <p class="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac ante mollis quam tristique convallis.
            </p>
          </div>
          <div class="px-6 pt-4 pb-2">
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#tag1</span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#tag2</span>
          </div>
        </div>
      `;
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
      case 'link':
        content = '<a href="#" class="text-blue-600 hover:text-blue-800 underline">Click here</a>';
        break;
      case 'footer':
        content = `
        <footer class="bg-gray-800 text-white py-8">
          <div class="container mx-auto px-4">
            <div class="flex flex-wrap justify-between">
              <div class="w-full md:w-1/3 mb-6 md:mb-0">
                <h3 class="text-lg font-semibold mb-2">About Us</h3>
                <p class="text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac ante mollis quam tristique convallis.</p>
              </div>
              <div class="w-full md:w-1/3 mb-6 md:mb-0">
                <h3 class="text-lg font-semibold mb-2">Quick Links</h3>
                <ul class="text-sm">
                  <li><a href="#" class="hover:text-gray-300">Home</a></li>
                  <li><a href="#" class="hover:text-gray-300">About</a></li>
                  <li><a href="#" class="hover:text-gray-300">Services</a></li>
                  <li><a href="#" class="hover:text-gray-300">Contact</a></li>
                </ul>
              </div>
              <div class="w-full md:w-1/3">
                <h3 class="text-lg font-semibold mb-2">Contact Us</h3>
                <p class="text-sm">123 Street Name, City, Country</p>
                <p class="text-sm">Email: info@example.com</p>
                <p class="text-sm">Phone: +1 234 567 8901</p>
              </div>
            </div>
            <div class="mt-8 text-center text-sm">
              <p>&copy; 2023 Your Company. All rights reserved.</p>
            </div>
          </div>
        </footer>
      `;
        break;
      case 'social':
        content = `
        <div class="flex space-x-4">
          <a href="#" class="text-blue-600 hover:text-blue-800">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
            </svg>
          </a>
          <a href="#" class="text-blue-400 hover:text-blue-600">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
          <a href="#" class="text-pink-600 hover:text-pink-800">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.772-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd" />
            </svg>
          </a>
        </div>
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


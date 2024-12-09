import { ArrowLeft, ArrowRight, Smartphone, Tablet, Monitor, ExternalLink, Upload, MessageSquare, Save, MoreVertical, Palette, Layout } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import TemplatesModal from './templates-modal'

interface NavbarProps {
  canUndo: boolean
  canRedo: boolean
  onUndo: () => void
  onRedo: () => void
  onPreview: () => void
  onPublish: () => void
  onChatWithMunkpin: () => void
  onSaveTemplate: () => void
  onDeviceSelect: (device: 'mobile' | 'tablet' | 'desktop') => void
  globalStyles: any
  updateGlobalStyles: (styles: any) => void
  onInsertTemplate: (template: any) => void
}

export function Navbar({ 
  canUndo, 
  canRedo, 
  onUndo, 
  onRedo, 
  onPreview, 
  onPublish, 
  onChatWithMunkpin,
  onSaveTemplate,
  onDeviceSelect,
  globalStyles,
  updateGlobalStyles,
  onInsertTemplate
}: NavbarProps) {
  const [isGlobalStylesOpen, setIsGlobalStylesOpen] = useState(false)
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false)

  return (
    <nav className="bg-purple-100 border-b border-purple-200 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon" onClick={onUndo} disabled={!canUndo} className="bg-white hover:bg-purple-50 text-purple-600">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={onRedo} disabled={!canRedo} className="bg-white hover:bg-purple-50 text-purple-600">
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon" onClick={() => onDeviceSelect('mobile')} className="bg-white hover:bg-purple-50 text-purple-600">
          <Smartphone className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => onDeviceSelect('tablet')} className="bg-white hover:bg-purple-50 text-purple-600">
          <Tablet className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={() => onDeviceSelect('desktop')} className="bg-white hover:bg-purple-50 text-purple-600">
          <Monitor className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex items-center space-x-2">
        <Button variant="outline" onClick={onPreview} className="bg-white hover:bg-purple-50 text-purple-600">
          <ExternalLink className="h-4 w-4 mr-2" />
          Preview
        </Button>
        <Button variant="outline" onClick={() => setIsGlobalStylesOpen(true)} className="bg-white hover:bg-purple-50 text-purple-600">
          <Palette className="h-4 w-4 mr-2" />
          Global Styles
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="bg-white hover:bg-purple-50 text-purple-600">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={onPublish}>
              <Upload className="h-4 w-4 mr-2" />
              Publish
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onChatWithMunkpin}>
              <MessageSquare className="h-4 w-4 mr-2" />
              Chat with Munkpin
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onSaveTemplate}>
              <Save className="h-4 w-4 mr-2" />
              Save Template
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setIsTemplatesModalOpen(true)}>
              <Layout className="h-4 w-4 mr-2" />
              Templates
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Dialog open={isGlobalStylesOpen} onOpenChange={setIsGlobalStylesOpen}>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Global Styles</DialogTitle>
            <DialogDescription>
              Set global styles for your page
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Background Color</label>
              <Input
                type="color"
                value={globalStyles.backgroundColor || '#ffffff'}
                onChange={(e) => updateGlobalStyles({ backgroundColor: e.target.value })}
                className="w-full h-10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Background Gradient</label>
              <div className="flex space-x-2">
                <Input
                  type="color"
                  value={globalStyles.backgroundGradientStart || '#ffffff'}
                  onChange={(e) => {
                    const start = e.target.value;
                    const end = globalStyles.backgroundGradientEnd || '#ffffff';
                    updateGlobalStyles({
                      background: `linear-gradient(to right, ${start}, ${end})`,
                      backgroundGradientStart: start,
                    });
                  }}
                  className="w-1/2 h-10"
                />
                <Input
                  type="color"
                  value={globalStyles.backgroundGradientEnd || '#ffffff'}
                  onChange={(e) => {
                    const start = globalStyles.backgroundGradientStart || '#ffffff';
                    const end = e.target.value;
                    updateGlobalStyles({
                      background: `linear-gradient(to right, ${start}, ${end})`,
                      backgroundGradientEnd: end,
                    });
                  }}
                  className="w-1/2 h-10"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Background Image</label>
              <Input
                type="text"
                value={globalStyles.backgroundImage || ''}
                onChange={(e) => updateGlobalStyles({ backgroundImage: `url(${e.target.value})` })}
                placeholder="Enter image URL"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Background Video</label>
              <Input
                type="text"
                value={globalStyles.backgroundVideo || ''}
                onChange={(e) => updateGlobalStyles({ backgroundVideo: e.target.value })}
                placeholder="Enter video URL"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Text Color</label>
              <Input
                type="color"
                value={globalStyles.color || '#000000'}
                onChange={(e) => updateGlobalStyles({ color: e.target.value })}
                className="w-full h-10"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Font Family</label>
              <Input
                type="text"
                value={globalStyles.fontFamily || ''}
                onChange={(e) => updateGlobalStyles({ fontFamily: e.target.value })}
                placeholder="Enter font family"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Font Size</label>
              <Input
                type="text"
                value={globalStyles.fontSize || ''}
                onChange={(e) => updateGlobalStyles({ fontSize: e.target.value })}
                placeholder="Enter font size (e.g., 16px)"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Padding</label>
              <Input
                type="text"
                value={globalStyles.padding || ''}
                onChange={(e) => updateGlobalStyles({ padding: e.target.value })}
                placeholder="Enter padding (e.g., 10px 20px)"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Border</label>
              <Input
                type="text"
                value={globalStyles.border || ''}
                onChange={(e) => updateGlobalStyles({ border: e.target.value })}
                placeholder="Enter border (e.g., 1px solid black)"
                className="w-full"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsGlobalStylesOpen(false)} className="bg-purple-500 text-white hover:bg-purple-600">Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <TemplatesModal
        isOpen={isTemplatesModalOpen}
        onClose={() => setIsTemplatesModalOpen(false)}
        onInsertTemplate={(template) => {
          // We'll implement this function in the PageBuilder component
          onInsertTemplate(template);
          setIsTemplatesModalOpen(false);
        }}
      />
    </nav>
  )
}


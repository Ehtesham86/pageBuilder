import { motion } from 'framer-motion'
import { useState } from 'react'
import BlockComponent from './block-component'
import { Block } from './types/block'

interface EditorProps {
  blocks: Block[]
  updateBlock: (id: number, content: string, styles: any) => void
  moveBlock: (id: number, direction: 'up' | 'down') => void
  deleteBlock: (id: number) => void
  duplicateBlock: (id: number) => void
  setSelectedBlock: (block: Block) => void
  previewDevice: 'mobile' | 'tablet' | 'desktop'
  globalStyles: any;
}

export default function Editor({ blocks, updateBlock, moveBlock, deleteBlock, duplicateBlock, setSelectedBlock, previewDevice, globalStyles }: EditorProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getPreviewWidth = () => {
    switch (previewDevice) {
      case 'mobile':
        return 'max-w-sm';
      case 'tablet':
        return 'max-w-2xl';
      default:
        return 'w-full';
    }
  }

  return (
    <div className="flex-1 p-4 overflow-auto bg-purple-100">
      <motion.div
        className={`relative border-2 border-dashed border-purple-300 min-h-full p-4 mx-auto ${getPreviewWidth()}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={globalStyles}
      >
        {isHovered && (
          <div className="absolute top-0 left-0 bg-purple-200 px-2 py-1 text-xs text-purple-800">
            body section
          </div>
        )}
        {blocks.map((block, index) => (
          <BlockComponent
            key={block.id}
            block={block}
            updateBlock={updateBlock}
            moveBlock={moveBlock}
            deleteBlock={deleteBlock}
            duplicateBlock={duplicateBlock}
            setSelectedBlock={setSelectedBlock}
            isFirst={index === 0}
            isLast={index === blocks.length - 1}
            globalStyles={globalStyles}
          />
        ))}
      </motion.div>
    </div>
  )
}


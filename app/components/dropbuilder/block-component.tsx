'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpDown, Paintbrush, Copy, Trash2, FlagIcon as BorderAll, BetweenHorizontalEndIcon as BorderNone } from 'lucide-react'
import { Block } from '../types/block'

interface BlockComponentProps {
  block: Block
  updateBlock: (id: number, content: string, styles: any, videoUrl?: string, videoType?: 'url' | 'youtube' | 'vimeo') => void
  moveBlock: (id: number, direction: 'up' | 'down') => void
  deleteBlock: (id: number) => void
  duplicateBlock: (id: number) => void
  setSelectedBlock: (block: Block) => void
  isFirst: boolean
  isLast: boolean
  globalStyles: any
}

export default function BlockComponent({
  block,
  updateBlock,
  moveBlock,
  deleteBlock,
  duplicateBlock,
  setSelectedBlock,
  isFirst,
  isLast,
  globalStyles,
}: BlockComponentProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showBorder, setShowBorder] = useState(true)

  const getStyleString = (styles: any) => {
    return Object.entries(styles)
      .map(([key, value]) => `${key.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${value};`)
      .join(' ');
  }

  const getMediaQueryStyle = (styles: any) => {
    const breakpoints = {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    };

    return Object.entries(styles.mediaQueries || {}).map(([query, styles]) => `
      @media (min-width: ${breakpoints[query as keyof typeof breakpoints]}) {
        #block-${block.id} {
          ${getStyleString(styles as any)}
        }
      }
    `).join('\n');
  }

  const renderContent = () => {
    switch (block.type) {
      case 'video':
        return renderVideo();
      case 'image':
        return renderImage();
      default:
        return <div dangerouslySetInnerHTML={{ __html: block.content }} />;
    }
  }

  const renderVideo = () => {
    if (!block.videoUrl) return null;

    switch (block.videoType) {
      case 'youtube':
        return (
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${getYoutubeId(block.videoUrl)}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        );
      case 'vimeo':
        return (
          <iframe
            src={`https://player.vimeo.com/video/${getVimeoId(block.videoUrl)}`}
            width="100%"
            height="315"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
          ></iframe>
        );
      default:
        return (
          <video width="100%" height="315" controls>
            <source src={block.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        );
    }
  }

  const renderImage = () => {
    return (
      <img
        src={block.content}
        alt="Block image"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    );
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

  const combinedStyles = {
    ...globalStyles,
    ...block.styles.default,
  };

  return (
    <motion.div
      id={`block-${block.id}`}
      className={`relative mb-4 ${showBorder ? 'border border-purple-300' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      style={combinedStyles}
    >
      {isHovered && (
        <div className="absolute top-0 left-0 bg-purple-200 px-2 py-1 text-xs text-purple-800">
          {block.type}
        </div>
      )}
      <div className={`p-4 ${showBorder ? '' : 'border-none'}`}>
        {renderContent()}
      </div>
      {isHovered && (
        <div className="absolute top-0 right-0 flex space-x-2 bg-purple-100 p-2">
          <button onClick={() => moveBlock(block.id, isFirst ? 'down' : 'up')}>
            <ArrowUpDown size={16} className="text-purple-600" />
          </button>
          <button onClick={() => setSelectedBlock(block)}>
            <Paintbrush size={16} className="text-purple-600" />
          </button>
          <button onClick={() => duplicateBlock(block.id)}>
            <Copy size={16} className="text-purple-600" />
          </button>
          <button onClick={() => deleteBlock(block.id)}>
            <Trash2 size={16} className="text-purple-600" />
          </button>
          <button onClick={() => setShowBorder(!showBorder)}>
            {showBorder ? (
              <BorderAll size={16} className="text-purple-600" />
            ) : (
              <BorderNone size={16} className="text-purple-600" />
            )}
          </button>
        </div>
      )}
      <style>{getMediaQueryStyle(block.styles)}</style>
    </motion.div>
  )
}


// components/admin/blog-editor/extensions/YouTubeExtension.js
import { Node, mergeAttributes } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { NodeSelection } from '@tiptap/pm/state';

// Helper to extract video ID from URL
const getYouTubeVideoId = (url) => {
  if (!url) return null;
  
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

// Helper to extract Vimeo ID
const getVimeoVideoId = (url) => {
  if (!url) return null;
  
  const patterns = [
    /vimeo\.com\/(\d+)/,
    /player\.vimeo\.com\/video\/(\d+)/,
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

export const YouTubeExtension = Node.create({
  name: 'youtube',
  
  group: 'block',
  atom: true,
  draggable: true,
  selectable: true,

  addAttributes() {
    return {
      src: {
        default: null,
      },
      videoId: {
        default: null,
      },
      videoType: {
        default: 'youtube', // 'youtube' or 'vimeo'
      },
      width: {
        default: 640,
        parseHTML: el => {
          const wrapper = el.closest('.video-wrapper');
          const w = wrapper?.getAttribute('data-width') || el.getAttribute('width');
          return w ? parseInt(w) : 640;
        },
      },
      height: {
        default: 360,
      },
      alignment: {
        default: 'center',
        parseHTML: el => {
          const wrapper = el.closest('.video-wrapper');
          return wrapper?.getAttribute('data-alignment') || 'center';
        },
      },
      caption: {
        default: '',
        parseHTML: el => {
          const wrapper = el.closest('.video-wrapper');
          return wrapper?.querySelector('.video-caption')?.textContent || '';
        },
      },
    };
  },

  addCommands() {
    return {
      setYouTubeVideo: (options) => ({ commands }) => {
        const { url } = options;
        
        // Try YouTube first
        let videoId = getYouTubeVideoId(url);
        let videoType = 'youtube';
        
        // Try Vimeo if not YouTube
        if (!videoId) {
          videoId = getVimeoVideoId(url);
          videoType = 'vimeo';
        }
        
        if (!videoId) {
          return false;
        }
        
        return commands.insertContent({
          type: this.name,
          attrs: {
            src: url,
            videoId,
            videoType,
            width: options.width || 640,
            alignment: options.alignment || 'center',
          },
        });
      },
      
      updateYouTubeVideo: (attrs) => ({ commands }) => {
        return commands.updateAttributes(this.name, attrs);
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      new Plugin({
        key: new PluginKey('youtubeClickHandler'),
        props: {
          handleClick(view, pos, event) {
            const target = event.target;
            
            // Check if clicked on video wrapper or its children
            const wrapper = target.closest('.video-wrapper');
            
            if (wrapper) {
              const { state } = view;
              const { doc } = state;
              
              let foundPos = null;
              
              doc.descendants((node, nodePos) => {
                if (node.type.name === 'youtube' && foundPos === null) {
                  const domNode = view.nodeDOM(nodePos);
                  if (domNode === wrapper || domNode?.contains(wrapper) || wrapper.contains(domNode)) {
                    foundPos = nodePos;
                    return false;
                  }
                }
                return true;
              });
              
              if (foundPos !== null) {
                const tr = state.tr.setSelection(NodeSelection.create(state.doc, foundPos));
                view.dispatch(tr);
                return true;
              }
            }
            
            return false;
          },
        },
      }),
    ];
  },

  parseHTML() {
    return [
      {
        tag: 'div.video-wrapper',
        getAttrs: el => {
          const iframe = el.querySelector('iframe');
          if (!iframe) return false;
          
          const src = iframe.getAttribute('src') || '';
          let videoId = null;
          let videoType = 'youtube';
          
          // Check for YouTube
          const ytMatch = src.match(/youtube(?:-nocookie)?\.com\/embed\/([a-zA-Z0-9_-]{11})/);
          if (ytMatch) {
            videoId = ytMatch[1];
            videoType = 'youtube';
          }
          
          // Check for Vimeo
          const vimeoMatch = src.match(/player\.vimeo\.com\/video\/(\d+)/);
          if (vimeoMatch) {
            videoId = vimeoMatch[1];
            videoType = 'vimeo';
          }
          
          return {
            src,
            videoId,
            videoType,
            width: parseInt(el.getAttribute('data-width')) || 640,
            alignment: el.getAttribute('data-alignment') || 'center',
            caption: el.querySelector('.video-caption')?.textContent || '',
          };
        },
      },
      {
        tag: 'iframe',
        getAttrs: el => {
          const src = el.getAttribute('src') || '';
          let videoId = null;
          let videoType = 'youtube';
          
          const ytMatch = src.match(/youtube(?:-nocookie)?\.com\/embed\/([a-zA-Z0-9_-]{11})/);
          if (ytMatch) {
            videoId = ytMatch[1];
          }
          
          const vimeoMatch = src.match(/player\.vimeo\.com\/video\/(\d+)/);
          if (vimeoMatch) {
            videoId = vimeoMatch[1];
            videoType = 'vimeo';
          }
          
          if (!videoId) return false;
          
          return {
            src,
            videoId,
            videoType,
            width: parseInt(el.getAttribute('width')) || 640,
            alignment: 'center',
          };
        },
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { videoId, videoType, width, alignment, caption } = HTMLAttributes;
    
    if (!videoId) return ['div', { class: 'video-error' }, 'Invalid video'];
    
    const align = alignment || 'center';
    const videoWidth = width || 640;
    const videoHeight = Math.round(videoWidth * 9 / 16); // 16:9 aspect ratio
    
    // Build embed URL
    let embedUrl = '';
    if (videoType === 'vimeo') {
      embedUrl = `https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0`;
    } else {
      embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?controls=1&modestbranding=1`;
    }
    
    // Styles based on alignment
    const styles = [];
    styles.push(`width: ${videoWidth}px`, 'max-width: 100%');
    
    if (align === 'left') {
      styles.push('float: left', 'margin: 0 1.5rem 1rem 0');
    } else if (align === 'right') {
      styles.push('float: right', 'margin: 0 0 1rem 1.5rem');
    } else {
      styles.push('margin: 1rem auto', 'display: block');
    }

    const wrapperAttrs = {
      class: `video-wrapper align-${align}`,
      style: styles.join('; '),
      'data-alignment': align,
      'data-width': videoWidth,
      'data-video-type': videoType,
      'data-video-id': videoId,
    };

    const iframeAttrs = {
      src: embedUrl,
      width: '100%',
      height: videoHeight,
      frameborder: '0',
      allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
      allowfullscreen: 'true',
      style: 'display: block; border-radius: 8px;',
    };

    // Thumbnail for editor display (actual iframe loads on frontend)
    const thumbnailUrl = videoType === 'youtube' 
      ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
      : null;

    if (caption) {
      return [
        'div', 
        wrapperAttrs, 
        ['div', { class: 'video-container', style: 'position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 8px;' },
          ['iframe', { ...iframeAttrs, style: 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 8px;' }]
        ],
        ['p', { class: 'video-caption', style: 'text-align: center; font-size: 0.875rem; color: #64748b; margin-top: 0.5rem;' }, caption]
      ];
    }
    
    return [
      'div', 
      wrapperAttrs, 
      ['div', { class: 'video-container', style: 'position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 8px;' },
        ['iframe', { ...iframeAttrs, style: 'position: absolute; top: 0; left: 0; width: 100%; height: 100%; border-radius: 8px;' }]
      ]
    ];
  },

  addNodeView() {
    return ({ node, HTMLAttributes, getPos, editor }) => {
      const { videoId, videoType, width, alignment, caption } = node.attrs;
      
      // Create wrapper
      const wrapper = document.createElement('div');
      wrapper.className = `video-wrapper align-${alignment || 'center'}`;
      wrapper.setAttribute('data-alignment', alignment || 'center');
      wrapper.setAttribute('data-width', width || 640);
      wrapper.setAttribute('data-video-type', videoType);
      wrapper.setAttribute('data-video-id', videoId);
      
      // Apply styles
      const videoWidth = width || 640;
      wrapper.style.cssText = `
        width: ${videoWidth}px;
        max-width: 100%;
        ${alignment === 'left' ? 'float: left; margin: 0 1.5rem 1rem 0;' : ''}
        ${alignment === 'right' ? 'float: right; margin: 0 0 1rem 1.5rem;' : ''}
        ${alignment === 'center' ? 'margin: 1rem auto; display: block;' : ''}
        cursor: pointer;
      `;
      
      // Create video container with aspect ratio
      const container = document.createElement('div');
      container.className = 'video-container';
      container.style.cssText = `
        position: relative;
        padding-bottom: 56.25%;
        height: 0;
        overflow: hidden;
        border-radius: 8px;
        background: #0f172a;
      `;
      
      // Create thumbnail overlay (shows before iframe loads)
      if (videoType === 'youtube' && videoId) {
        const thumbnail = document.createElement('div');
        thumbnail.className = 'video-thumbnail';
        thumbnail.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: url(https://img.youtube.com/vi/${videoId}/maxresdefault.jpg);
          background-size: cover;
          background-position: center;
          z-index: 1;
        `;
        
        // Fallback thumbnail
        thumbnail.onerror = () => {
          thumbnail.style.backgroundImage = `url(https://img.youtube.com/vi/${videoId}/hqdefault.jpg)`;
        };
        
        // Play button overlay
        const playButton = document.createElement('div');
        playButton.className = 'play-button';
        playButton.style.cssText = `
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 68px;
          height: 48px;
          background: rgba(0, 0, 0, 0.8);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
        `;
        playButton.innerHTML = `
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M8 5v14l11-7z"/>
          </svg>
        `;
        
        // YouTube logo badge
        const badge = document.createElement('div');
        badge.style.cssText = `
          position: absolute;
          bottom: 12px;
          right: 12px;
          background: #FF0000;
          color: white;
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 12px;
          font-weight: bold;
          z-index: 2;
        `;
        badge.textContent = 'YouTube';
        
        thumbnail.appendChild(playButton);
        thumbnail.appendChild(badge);
        container.appendChild(thumbnail);
      } else if (videoType === 'vimeo' && videoId) {
        const placeholder = document.createElement('div');
        placeholder.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #1ab7ea 0%, #0d9ed0 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          z-index: 1;
        `;
        placeholder.innerHTML = `
          <svg width="64" height="64" viewBox="0 0 24 24" fill="white" style="margin-bottom: 8px;">
            <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.493 4.797l-.013.01z"/>
          </svg>
          <span style="color: white; font-size: 14px; font-weight: bold;">Vimeo Video</span>
        `;
        container.appendChild(placeholder);
      }
      
      // Create iframe (hidden initially in editor, shown on click)
      const iframe = document.createElement('iframe');
      let embedUrl = '';
      if (videoType === 'vimeo') {
        embedUrl = `https://player.vimeo.com/video/${videoId}?title=0&byline=0&portrait=0`;
      } else {
        embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?controls=1&modestbranding=1`;
      }
      
      iframe.src = embedUrl;
      iframe.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: none;
        border-radius: 8px;
        z-index: 0;
      `;
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      iframe.allowFullscreen = true;
      
      container.appendChild(iframe);
      wrapper.appendChild(container);
      
      // Add caption if exists
      if (caption) {
        const captionEl = document.createElement('p');
        captionEl.className = 'video-caption';
        captionEl.style.cssText = `
          text-align: center;
          font-size: 0.875rem;
          color: #64748b;
          margin-top: 0.5rem;
        `;
        captionEl.textContent = caption;
        wrapper.appendChild(captionEl);
      }
      
      return {
        dom: wrapper,
        update: (updatedNode) => {
          if (updatedNode.type.name !== 'youtube') return false;
          
          const newAttrs = updatedNode.attrs;
          const newWidth = newAttrs.width || 640;
          const newAlignment = newAttrs.alignment || 'center';
          
          // Update wrapper styles
          wrapper.className = `video-wrapper align-${newAlignment}`;
          wrapper.setAttribute('data-alignment', newAlignment);
          wrapper.setAttribute('data-width', newWidth);
          
          wrapper.style.width = `${newWidth}px`;
          wrapper.style.float = newAlignment === 'left' ? 'left' : newAlignment === 'right' ? 'right' : 'none';
          wrapper.style.margin = newAlignment === 'left' ? '0 1.5rem 1rem 0' : 
                                  newAlignment === 'right' ? '0 0 1rem 1.5rem' : 
                                  '1rem auto';
          wrapper.style.display = newAlignment === 'center' ? 'block' : 'inline-block';
          
          // Update caption
          let captionEl = wrapper.querySelector('.video-caption');
          if (newAttrs.caption) {
            if (!captionEl) {
              captionEl = document.createElement('p');
              captionEl.className = 'video-caption';
              captionEl.style.cssText = `
                text-align: center;
                font-size: 0.875rem;
                color: #64748b;
                margin-top: 0.5rem;
              `;
              wrapper.appendChild(captionEl);
            }
            captionEl.textContent = newAttrs.caption;
          } else if (captionEl) {
            captionEl.remove();
          }
          
          return true;
        },
        destroy: () => {},
      };
    };
  },
});

export default YouTubeExtension;
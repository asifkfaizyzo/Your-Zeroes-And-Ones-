// components/admin/blog-editor/extensions/ImageExtension.js
import Image from '@tiptap/extension-image';
import { mergeAttributes } from '@tiptap/core';
import { Plugin, PluginKey } from '@tiptap/pm/state';
import { NodeSelection } from '@tiptap/pm/state';

export const ImageExtension = Image.extend({
  name: 'image',
  
  inline: false,
  group: 'block',
  draggable: true,
  selectable: true,

  addAttributes() {
    return {
      ...this.parent?.(),
      src: { default: null },
      alt: { default: null },
      title: { default: null },
      width: { 
        default: null,
        parseHTML: el => {
          const fig = el.closest('figure');
          const w = fig?.getAttribute('data-width') || el.getAttribute('width');
          return w ? parseInt(w) : null;
        },
      },
      alignment: { 
        default: 'center',
        parseHTML: el => {
          const fig = el.closest('figure');
          return fig?.getAttribute('data-alignment') || 'center';
        },
      },
      caption: { 
        default: '',
        parseHTML: el => {
          const fig = el.closest('figure');
          return fig?.querySelector('figcaption')?.textContent || '';
        },
      },
    };
  },

  addCommands() {
    return {
      ...this.parent?.(),
      setImage: (attrs) => ({ commands }) => {
        return commands.insertContent({ type: this.name, attrs });
      },
      updateImage: (attrs) => ({ commands }) => {
        return commands.updateAttributes(this.name, attrs);
      },
    };
  },

  addProseMirrorPlugins() {
    const extensionThis = this;
    
    return [
      new Plugin({
        key: new PluginKey('imageClickHandler'),
        props: {
          handleClickOn(view, pos, node, nodePos, event, direct) {
            // Check if we clicked directly on an image node
            if (node.type.name === 'image') {
              // Create a node selection at this position
              const tr = view.state.tr.setSelection(NodeSelection.create(view.state.doc, nodePos));
              view.dispatch(tr);
              return true;
            }
            return false;
          },
          handleClick(view, pos, event) {
            const target = event.target;
            
            // Check if clicked on image or figure
            const isImageClick = target.tagName === 'IMG';
            const isFigureClick = target.tagName === 'FIGURE' || target.closest('figure.image-figure');
            
            if (!isImageClick && !isFigureClick) {
              return false;
            }
            
            const figure = target.tagName === 'FIGURE' 
              ? target 
              : target.closest('figure.image-figure');
            
            if (!figure) {
              return false;
            }
            
            // Find the position of this node by checking all image nodes
            const { state } = view;
            const { doc } = state;
            
            let foundPos = null;
            
            doc.descendants((docNode, docNodePos) => {
              if (docNode.type.name === 'image' && foundPos === null) {
                try {
                  const domNode = view.nodeDOM(docNodePos);
                  if (domNode && (
                    domNode === figure || 
                    domNode.contains(figure) || 
                    figure.contains(domNode) ||
                    domNode === target ||
                    domNode.contains(target)
                  )) {
                    foundPos = docNodePos;
                    return false;
                  }
                } catch (e) {
                  // Ignore DOM lookup errors
                }
              }
              return foundPos === null;
            });
            
            if (foundPos !== null) {
              try {
                const tr = state.tr.setSelection(NodeSelection.create(state.doc, foundPos));
                view.dispatch(tr);
                return true;
              } catch (e) {
                console.error('Error creating NodeSelection:', e);
              }
            }
            
            return false;
          },
        },
      }),
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const { src, alt, title, width, alignment, caption } = HTMLAttributes;
    
    const align = alignment || 'center';
    
    const styles = [];
    if (width) styles.push(`width: ${width}px`, 'max-width: 100%');
    
    if (align === 'left') {
      styles.push('float: left', 'margin: 0 1.5rem 1rem 0');
    } else if (align === 'right') {
      styles.push('float: right', 'margin: 0 0 1rem 1.5rem');
    } else {
      styles.push('margin: 1rem auto', 'display: block');
    }

    const figureAttrs = {
      class: `image-figure align-${align}`,
      style: styles.join('; '),
      'data-alignment': align,
      'data-width': width || '',
    };

    const imgAttrs = mergeAttributes(this.options.HTMLAttributes, {
      src,
      alt: alt || '',
      title: title || '',
      style: 'width: 100%; height: auto; display: block; cursor: pointer;',
    });

    if (caption) {
      return ['figure', figureAttrs, ['img', imgAttrs], ['figcaption', { class: 'image-caption' }, caption]];
    }
    return ['figure', figureAttrs, ['img', imgAttrs]];
  },

  parseHTML() {
    return [
      {
        tag: 'figure.image-figure',
        getAttrs: el => {
          const img = el.querySelector('img');
          if (!img) return false;
          return {
            src: img.getAttribute('src'),
            alt: img.getAttribute('alt'),
            title: img.getAttribute('title'),
            width: parseInt(el.getAttribute('data-width')) || null,
            alignment: el.getAttribute('data-alignment') || 'center',
            caption: el.querySelector('figcaption')?.textContent || '',
          };
        },
      },
      {
        tag: 'img[src]',
        getAttrs: el => ({
          src: el.getAttribute('src'),
          alt: el.getAttribute('alt'),
          title: el.getAttribute('title'),
          width: parseInt(el.getAttribute('width')) || null,
          alignment: 'center',
        }),
      },
    ];
  },
});

export default ImageExtension;
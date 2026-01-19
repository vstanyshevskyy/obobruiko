import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import ImageRenderer from './image-renderer';
import IconShortcode from './IconShortcode';

// Replace value shortcodes with their actual values
const replaceValueShortcodes = text => {
  const currentYear = new Date().getFullYear();
  return text.replace(/:value-currentYear:/g, currentYear);
};

// Parse icon shortcodes and convert them to React components
const parseIconShortcodes = text => {
  const parts = [];
  const regex = /:icon-(\w+):/g;
  let lastIndex = 0;
  let match;
  let key = 0;

  // If no icon shortcodes, return the processed text
  if (!text.includes(':icon-')) {
    return text;
  }

  while ((match = regex.exec(text)) !== null) {
    // Add text before the icon
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    // Add the icon component
    parts.push(<IconShortcode key={`icon-${key++}`} code={match[1]} />);

    lastIndex = match.index + match[0].length;
  }

  // Add remaining text after the last icon
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
};

// Process text to replace both value and icon shortcodes
const processText = text => {
  if (typeof text !== 'string') return text;

  // Replace value shortcodes first
  const replacedText = replaceValueShortcodes(text);

  // Parse and replace icon shortcodes with React components
  return parseIconShortcodes(replacedText);
};

// Custom component renderer that recursively processes text nodes
const TextComponent = ({ children }) => {
  if (typeof children === 'string') {
    return <>{processText(children)}</>;
  }
  if (Array.isArray(children)) {
    return <>{children.map((child, index) => 
      typeof child === 'string' ? 
        <React.Fragment key={index}>{processText(child)}</React.Fragment> : 
        child
    )}</>;
  }
  return children;
};

// Custom URL transform to allow tel: and mailto: protocols
const urlTransform = (url) => {
  // Allow tel: and mailto: protocols along with default allowed protocols
  if (url.startsWith('tel:') || url.startsWith('mailto:')) {
    return url;
  }
  // For all other URLs, use default behavior
  return url;
};

export default props => (
  <ReactMarkdown
    {...props}
    remarkPlugins={[remarkGfm]}
    rehypePlugins={[rehypeRaw]}
    urlTransform={urlTransform}
    components={{
      img: ImageRenderer,
      // Apply shortcode processing to paragraphs and inline elements
      p: ({ children, ...props }) => <p {...props}><TextComponent>{children}</TextComponent></p>,
      li: ({ children, ...props }) => <li {...props}><TextComponent>{children}</TextComponent></li>,
      strong: ({ children, ...props }) => <strong {...props}><TextComponent>{children}</TextComponent></strong>,
      em: ({ children, ...props }) => <em {...props}><TextComponent>{children}</TextComponent></em>,
      h1: ({ children, ...props }) => <h1 {...props}><TextComponent>{children}</TextComponent></h1>,
      h2: ({ children, ...props }) => <h2 {...props}><TextComponent>{children}</TextComponent></h2>,
      h3: ({ children, ...props }) => <h3 {...props}><TextComponent>{children}</TextComponent></h3>,
      h4: ({ children, ...props }) => <h4 {...props}><TextComponent>{children}</TextComponent></h4>,
      h5: ({ children, ...props }) => <h5 {...props}><TextComponent>{children}</TextComponent></h5>,
      h6: ({ children, ...props }) => <h6 {...props}><TextComponent>{children}</TextComponent></h6>,
      td: ({ children, ...props }) => <td {...props}><TextComponent>{children}</TextComponent></td>,
      th: ({ children, ...props }) => <th {...props}><TextComponent>{children}</TextComponent></th>,
      blockquote: ({ children, ...props }) => <blockquote {...props}><TextComponent>{children}</TextComponent></blockquote>
    }}
  />
);

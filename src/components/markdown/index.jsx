import React from 'react';
import ReactMarkdown from 'react-markdown';
import ImageRenderer from './image-renderer';
import IconShortcode from './IconShortcode';

// Process text to replace icon shortcodes with React components
const processText = text => {
  if (typeof text !== 'string') return text;

  // Check if text contains icon shortcodes
  if (!text.includes(':icon-')) {
    return text;
  }

  const parts = [];
  const regex = /:icon-(\w+):/g;
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }

    parts.push(<IconShortcode key={`icon-${key++}`} code={match[1]} />);

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
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

export default props => (
  <ReactMarkdown
    {...props}
    components={{
      img: ImageRenderer,
      p: ({ children }) => <p><TextComponent>{children}</TextComponent></p>,
      li: ({ children }) => <li><TextComponent>{children}</TextComponent></li>,
      strong: ({ children }) => <strong><TextComponent>{children}</TextComponent></strong>,
      em: ({ children }) => <em><TextComponent>{children}</TextComponent></em>,
      h1: ({ children }) => <h1><TextComponent>{children}</TextComponent></h1>,
      h2: ({ children }) => <h2><TextComponent>{children}</TextComponent></h2>,
      h3: ({ children }) => <h3><TextComponent>{children}</TextComponent></h3>,
      h4: ({ children }) => <h4><TextComponent>{children}</TextComponent></h4>,
      h5: ({ children }) => <h5><TextComponent>{children}</TextComponent></h5>,
      h6: ({ children }) => <h6><TextComponent>{children}</TextComponent></h6>,
      td: ({ children }) => <td><TextComponent>{children}</TextComponent></td>,
      th: ({ children }) => <th><TextComponent>{children}</TextComponent></th>,
      blockquote: ({ children }) => <blockquote><TextComponent>{children}</TextComponent></blockquote>,
      code: ({ children }) => <code><TextComponent>{children}</TextComponent></code>
    }}
  />
);

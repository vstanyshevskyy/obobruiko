import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import ImageRenderer from './image-renderer';
import IconShortcode from './IconShortcode';
import replaceValueShortcodes from './shortcodes';

const pushAudioEvent = (eventName, src) => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: eventName, audio_src: src });
  }
};

const AudioRenderer = ({ src, children, ...props }) => {
  const handlePlay = () => pushAudioEvent('audio_play', src);
  const handlePause = () => pushAudioEvent('audio_pause', src);
  const handleEnded = () => pushAudioEvent('audio_ended', src);

  return (
    <audio
      {...props}
      src={src}
      onPlay={handlePlay}
      onPause={handlePause}
      onEnded={handleEnded}
    >
      {children}
    </audio>
  );
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

const withProcessedText = Tag => {
  const MarkdownTag = ({ node, children, ...props }) => (
    <Tag {...props}>
      <TextComponent>{children}</TextComponent>
    </Tag>
  );

  MarkdownTag.displayName = `Markdown${Tag}`;

  return MarkdownTag;
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
      p: withProcessedText('p'),
      li: withProcessedText('li'),
      strong: withProcessedText('strong'),
      em: withProcessedText('em'),
      h1: withProcessedText('h1'),
      h2: withProcessedText('h2'),
      h3: withProcessedText('h3'),
      h4: withProcessedText('h4'),
      h5: withProcessedText('h5'),
      h6: withProcessedText('h6'),
      td: withProcessedText('td'),
      th: withProcessedText('th'),
      blockquote: withProcessedText('blockquote'),
      audio: AudioRenderer
    }}
  />
);

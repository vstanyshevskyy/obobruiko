import React from 'react';
import ReactMarkdown from 'react-markdown';
import ImageRenderer from './image-renderer';

export default props => <ReactMarkdown {...props} components={{ image: ImageRenderer }} />;

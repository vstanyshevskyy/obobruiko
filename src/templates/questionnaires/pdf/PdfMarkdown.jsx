/* eslint-disable jsx-a11y/anchor-is-valid, react/prop-types */
import React from 'react';
import { Text, View, Link } from '@react-pdf/renderer';
import { remark } from 'remark';
import replaceValueShortcodes from '../../../components/markdown/shortcodes';

const renderTextChildren = (node, styles, inheritedStyle = []) => {
  const textStyle = Array.isArray(inheritedStyle) ? inheritedStyle : [inheritedStyle];

  return (node.children || []).map((child, index) => {
    const key = `${child.type}-${index}`;

    if (child.type === 'text') {
      return (
        <Text key={key} style={textStyle}>
          {child.value}
        </Text>
      );
    }

    if (child.type === 'strong') {
      return renderTextChildren(child, styles, [...textStyle, styles.strong]);
    }

    if (child.type === 'emphasis') {
      return renderTextChildren(child, styles, [...textStyle, styles.emphasis]);
    }

    if (child.type === 'inlineCode') {
      return (
        <Text key={key} style={[...textStyle, styles.inlineCode]}>
          {child.value}
        </Text>
      );
    }

    if (child.type === 'link') {
      return (
        <Link
          key={key}
          href={child.url}
          src={child.url}
          style={[...textStyle, styles.link]}
        >
          {renderTextChildren(child, styles, textStyle)}
        </Link>
      );
    }

    if (child.type === 'break') {
      return (
        <Text key={key} style={textStyle}>
          {'\n'}
        </Text>
      );
    }

    return null;
  });
};

const renderBlock = (node, styles, keyPrefix = 'block', paragraphStyle = styles.paragraph) => {
  if (node.type === 'paragraph') {
    return (
      <Text key={keyPrefix} style={paragraphStyle}>
        {renderTextChildren(node, styles)}
      </Text>
    );
  }

  if (node.type === 'heading') {
    return (
      <Text key={keyPrefix} style={node.depth <= 2 ? styles.headingLarge : styles.headingSmall}>
        {renderTextChildren(node, styles)}
      </Text>
    );
  }

  if (node.type === 'list') {
    return (
      <View key={keyPrefix} style={styles.list}>
        {(node.children || []).map((item, index) => (
          <View key={`${keyPrefix}-item-${item.position?.start?.offset || index}`} style={styles.listItem}>
            <Text style={styles.listBullet}>{node.ordered ? `${index + 1}.` : '•'}</Text>
            <View style={styles.listContent}>
              {(item.children || []).map((child, childIndex) => renderBlock(
                child,
                styles,
                `${keyPrefix}-item-${index}-child-${childIndex}`,
                paragraphStyle
              ))}
            </View>
          </View>
        ))}
      </View>
    );
  }

  if (node.type === 'blockquote') {
    return (
      <View key={keyPrefix} style={styles.blockquote}>
        {(node.children || []).map((child, index) => renderBlock(
          child,
          styles,
          `${keyPrefix}-${index}`,
          paragraphStyle
        ))}
      </View>
    );
  }

  if (node.type === 'thematicBreak') {
    return <View key={keyPrefix} style={styles.rule} />;
  }

  return null;
};

function PdfMarkdown({ children, styles, paragraphStyle }) {
  if (!children) {
    return null;
  }

  const tree = remark().parse(replaceValueShortcodes(children));

  return (
    <View>
      {tree.children.map((node, index) => renderBlock(
        node,
        styles,
        `markdown-${index}`,
        paragraphStyle || styles.paragraph
      ))}
    </View>
  );
}

export default PdfMarkdown;

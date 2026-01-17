
import DOMPurify from 'dompurify';

export const sanitizeHtmlContent = (content) => {
  if (!content) return '';

  return DOMPurify.sanitize(content, {
    ALLOWED_TAGS: [
      'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
      'strong', 'b', 'em', 'i', 'u', 's', 'strike',
      'ul', 'ol', 'li', 'dl', 'dt', 'dd',
      'blockquote', 'code', 'pre',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'img', 'a', 'br', 'hr', 'span', 'div',
      'del', 'ins', 'sub', 'sup'
    ],
    ALLOWED_ATTR: [
      'href', 'target', 'rel', 
      'src', 'alt', 'width', 'height', 'title',
      'class', 'style', 'align', 'colspan', 'rowspan',
      'start', 'type'
    ],
    // Force target="_blank" for links
    ADD_ATTR: ['target'],
    FORBID_TAGS: ['script', 'style', 'iframe', 'object', 'embed', 'form', 'input', 'textarea', 'button'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover', 'style'], // Being strict with inline styles unless specifically needed
  });
};

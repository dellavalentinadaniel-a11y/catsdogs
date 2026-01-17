
import DOMPurify from 'dompurify';

export const sanitizeHtmlContent = (htmlContent) => {
  if (!htmlContent) return '';

  return DOMPurify.sanitize(htmlContent, {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
      'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's', 'strike',
      'ul', 'ol', 'li', 
      'blockquote', 'code', 'pre',
      'a', 'img', 
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'span', 'div'
    ],
    ALLOWED_ATTR: [
      'href', 'target', 'rel', 
      'src', 'alt', 'width', 'height', 'title',
      'class', 'style', 'align'
    ],
    FORBID_TAGS: ['script', 'iframe', 'object', 'embed', 'form', 'input'],
    FORBID_ATTR: ['onerror', 'onload', 'onclick', 'onmouseover'],
  });
};

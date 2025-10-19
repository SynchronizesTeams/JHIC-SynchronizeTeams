// Social Media and Common Icons
export const SOCIAL_ICONS = [
  { id: 'link', label: 'Link', icon: '🔗' },
  { id: 'instagram', label: 'Instagram', icon: '📷' },
  { id: 'facebook', label: 'Facebook', icon: '👥' },
  { id: 'whatsapp', label: 'WhatsApp', icon: '💬' },
  { id: 'youtube', label: 'YouTube', icon: '▶️' },
  { id: 'twitter', label: 'Twitter/X', icon: '🐦' },
  { id: 'threads', label: 'Threads', icon: '🧵' },
  { id: 'linkedin', label: 'LinkedIn', icon: '💼' },
  { id: 'tiktok', label: 'TikTok', icon: '🎵' },
  { id: 'email', label: 'Email', icon: '📧' },
  { id: 'phone', label: 'Phone', icon: '📱' },
  { id: 'website', label: 'Website', icon: '🌐' },
  { id: 'github', label: 'GitHub', icon: '💻' },
  { id: 'portfolio', label: 'Portfolio', icon: '🎨' },
  { id: 'blog', label: 'Blog', icon: '📝' },
  { id: 'shop', label: 'Shop', icon: '🛒' },
];

export const getIconByIdentifier = (identifier: string): string => {
  const icon = SOCIAL_ICONS.find(i => i.id === identifier);
  return icon ? icon.icon : '🔗';
};

/**
 * Convert icon identifier/emoji to File object for backend upload
 * Backend expects file upload, so we create a minimal text file
 */
export const iconToFile = (iconIdentifier: string): File => {
  // If already a URL/path, keep the identifier for filename
  const fileName = `icon_${iconIdentifier.replace(/[^a-z0-9]/gi, '_')}.txt`;
  
  // Create a minimal text blob with the icon identifier
  const blob = new Blob([iconIdentifier], { type: 'text/plain' });
  
  // Convert to File object
  const file = new File([blob], fileName, { type: 'text/plain' });
  
  return file;
};

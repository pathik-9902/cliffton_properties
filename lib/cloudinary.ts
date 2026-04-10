const CLOUD_NAME = 'dwsta5igd';

/**
 * Convert a Cloudinary public_id to a full delivery URL.
 * If the value is already an absolute URL it is returned unchanged.
 */
export function cloudinaryUrl(publicId: string, opts?: { width?: number; quality?: number }): string {
  if (!publicId) return '/placeholder.png';
  if (publicId.startsWith('http://') || publicId.startsWith('https://')) return publicId;

  const transforms = [
    'f_auto',
    'c_fill',
    opts?.width ? `w_${opts.width}` : '',
    opts?.quality ? `q_${opts.quality}` : 'q_auto',
  ]
    .filter(Boolean)
    .join(',');

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${publicId}`;
}

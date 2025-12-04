'use client';

import { Attachment } from '../lib/markdown';

interface ResourcesSectionProps {
  attachments: Attachment[];
  pageTitle?: string;
}

export function ResourcesSection({ attachments, pageTitle }: ResourcesSectionProps) {
  if (attachments.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-6">Resources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {attachments.map((attachment, index) => (
          <AttachmentCard key={index} attachment={attachment} pageTitle={pageTitle} />
        ))}
      </div>
    </section>
  );
}

// Format filename to a clean display name
function formatDisplayName(filename: string): string {
  // Remove file extension
  const nameWithoutExt = filename.replace(/\.[^.]+$/, '');

  // Remove leading numbers and dashes (e.g., "2 - SBMC" -> "SBMC")
  let cleaned = nameWithoutExt.replace(/^\d+\s*[-–]\s*/, '');

  // Handle "Pasted image" timestamps - convert to "Image"
  if (cleaned.startsWith('Pasted image')) {
    return 'Image';
  }

  // Replace hyphens, underscores, and multiple spaces with single space
  cleaned = cleaned.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ');

  // Capitalize first letter of each word
  cleaned = cleaned
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  return cleaned.trim() || 'Document';
}

function AttachmentCard({ attachment, pageTitle }: { attachment: Attachment; pageTitle?: string }) {
  const { filename, type, url } = attachment;
  // Use page title if provided, otherwise format the filename
  const displayName = pageTitle || formatDisplayName(filename);

  // Files are available in public/attachments
  const isAvailable = true;

  return (
    <a
      href={isAvailable ? url : '#'}
      target={isAvailable ? '_blank' : undefined}
      rel={isAvailable ? 'noopener noreferrer' : undefined}
      className={`
        block p-4 rounded-lg border-2
        ${
          isAvailable
            ? 'border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 bg-white dark:bg-gray-800'
            : 'border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900 cursor-not-allowed'
        }
        transition-colors
      `}
      onClick={(e) => !isAvailable && e.preventDefault()}
    >
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          {type === 'pdf' ? (
            <svg
              className={`w-10 h-10 ${isAvailable ? 'text-red-500' : 'text-gray-400'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                clipRule="evenodd"
              />
            </svg>
          ) : type === 'image' ? (
            <svg
              className={`w-10 h-10 ${isAvailable ? 'text-blue-500' : 'text-gray-400'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className={`w-10 h-10 ${isAvailable ? 'text-gray-500' : 'text-gray-400'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p
            className={`text-sm font-medium truncate ${
              isAvailable
                ? 'text-gray-900 dark:text-gray-100'
                : 'text-gray-500 dark:text-gray-500'
            }`}
          >
            {displayName}
          </p>
          {!isAvailable && (
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              File not yet available
            </p>
          )}
        </div>
        {isAvailable && (
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        )}
      </div>
    </a>
  );
}

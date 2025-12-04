'use client';

import { useState } from 'react';
import { Attachment } from '../lib/markdown';
import { FilePreviewModal } from './FilePreviewModal';

interface ResourcesSectionProps {
  attachments: Attachment[];
  pageTitle?: string;
}

export function ResourcesSection({ attachments, pageTitle }: ResourcesSectionProps) {
  const [previewFile, setPreviewFile] = useState<Attachment | null>(null);

  if (attachments.length === 0) {
    return null;
  }

  return (
    <>
      <section className="mt-16 pt-12 border-t border-[var(--border)]">
        <h2 className="text-xl font-semibold mb-8 tracking-tight">Resources</h2>
        <div className="grid grid-cols-1 gap-3">
          {attachments.map((attachment, index) => (
            <AttachmentCard
              key={index}
              attachment={attachment}
              pageTitle={pageTitle}
              onPreview={() => setPreviewFile(attachment)}
            />
          ))}
        </div>
      </section>

      {previewFile && (
        <FilePreviewModal
          isOpen={!!previewFile}
          onClose={() => setPreviewFile(null)}
          filename={pageTitle || formatDisplayName(previewFile.filename)}
          url={previewFile.url}
          type={previewFile.type}
        />
      )}
    </>
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

function AttachmentCard({
  attachment,
  pageTitle,
  onPreview,
}: {
  attachment: Attachment;
  pageTitle?: string;
  onPreview: () => void;
}) {
  const { filename, type } = attachment;
  // Use page title if provided, otherwise format the filename
  const displayName = pageTitle || formatDisplayName(filename);

  // Files are available in public/attachments
  const isAvailable = true;

  return (
    <button
      onClick={isAvailable ? onPreview : undefined}
      className={`
        w-full text-left px-4 py-3 rounded-lg border
        ${
          isAvailable
            ? 'border-[var(--border)] hover:border-[var(--text-muted)] bg-[var(--bg-secondary)] hover:bg-[var(--border-subtle)] cursor-pointer'
            : 'border-dashed border-[var(--border)] bg-[var(--bg-secondary)] cursor-not-allowed opacity-60'
        }
        transition-all duration-200
      `}
      disabled={!isAvailable}
    >
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          {type === 'pdf' ? (
            <svg
              className={`w-8 h-8 ${isAvailable ? 'text-[var(--text-muted)]' : 'text-[var(--text-muted)]'}`}
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
              className={`w-8 h-8 ${isAvailable ? 'text-[var(--text-muted)]' : 'text-[var(--text-muted)]'}`}
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
              className={`w-8 h-8 ${isAvailable ? 'text-[var(--text-muted)]' : 'text-[var(--text-muted)]'}`}
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
                ? 'text-[var(--text-primary)]'
                : 'text-[var(--text-muted)]'
            }`}
          >
            {displayName}
          </p>
          {!isAvailable && (
            <p className="text-xs text-[var(--text-muted)] mt-1">
              File not yet available
            </p>
          )}
        </div>
        {isAvailable && (
          <svg
            className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        )}
      </div>
    </button>
  );
}

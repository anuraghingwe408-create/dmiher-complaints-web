# Design Document

## Overview

This design implements file attachment functionality for the complaint system, enabling students to upload images or PDFs with their complaints and allowing faculty to view and download these files. The solution uses Base64 encoding to store files directly in MongoDB, avoiding the need for separate file storage infrastructure.

## Architecture

### High-Level Flow

1. **Student Upload**: Student selects file → Client validates → File converted to Base64 → Sent with complaint data
2. **Server Processing**: Server receives complaint → Validates file data → Stores in MongoDB with Base64 encoding
3. **Faculty View**: Faculty loads complaints → Client decodes Base64 → Displays preview/download option
4. **Download**: Faculty clicks download → Client converts Base64 to Blob → Triggers browser download

### Technology Stack

- **Frontend**: Vanilla JavaScript with FileReader API for Base64 encoding
- **Backend**: Express.js with JSON body parsing (no multipart/form-data needed)
- **Database**: MongoDB with extended Complaint schema
- **File Storage**: Base64 strings stored directly in MongoDB documents

## Components and Interfaces

### 1. Student Portal (public/student.html)

#### File Input Handler
```javascript
// Handles file selection and preview
document.getElementById('attachment').addEventListener('change', function(e) {
    const file = e.target.files[0];
    // Validate file type and size
    // Generate preview
    // Store file reference for submission
});
```

#### File Validation
- **Allowed types**: PNG, JPG, JPEG, PDF
- **Max size**: 5MB
- **Validation timing**: On file selection (client-side) and submission (server-side)

#### Form Submission Enhancement
```javascript
// Modified submission to include file data
const formData = {
    // ... existing fields
    attachment: {
        filename: string,
        mimetype: string,
        data: string (Base64),
        size: number
    }
};
```

### 2. Faculty Dashboard (public/faculty.html)

#### Complaint Display Enhancement
- Add attachment indicator icon to complaint list items
- Display file preview in complaint details modal
- Add download button for each attachment

#### File Preview Component
```javascript
function renderFilePreview(attachment) {
    if (attachment.mimetype.startsWith('image/')) {
        // Render image inline
        return `<img src="data:${mimetype};base64,${data}" />`;
    } else if (attachment.mimetype === 'application/pdf') {
        // Show PDF icon with filename
        return `<div class="pdf-preview">📄 ${filename}</div>`;
    }
}
```

#### Download Handler
```javascript
function downloadAttachment(attachment) {
    // Convert Base64 to Blob
    const blob = base64ToBlob(attachment.data, attachment.mimetype);
    // Trigger download
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = attachment.filename;
    a.click();
}
```

### 3. Backend API (server.js)

#### Enhanced POST /api/complaints
```javascript
app.post('/api/complaints', async (req, res) => {
    // Extract complaint data including attachment
    const { attachment, ...complaintData } = req.body;
    
    // Validate attachment if present
    if (attachment) {
        validateAttachment(attachment);
    }
    
    // Create complaint with attachment
    const complaint = await Complaint.create({
        ...complaintData,
        attachment: attachment || null
    });
});
```

#### File Validation Function
```javascript
function validateAttachment(attachment) {
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    if (!allowedTypes.includes(attachment.mimetype)) {
        throw new Error('Invalid file type');
    }
    
    if (attachment.size > maxSize) {
        throw new Error('File size exceeds 5MB limit');
    }
    
    // Validate Base64 format
    if (!isValidBase64(attachment.data)) {
        throw new Error('Invalid file data');
    }
}
```

## Data Models

### Updated Complaint Schema

```javascript
const complaintSchema = new mongoose.Schema({
    // ... existing fields
    attachment: {
        filename: { type: String },
        mimetype: { type: String },
        data: { type: String }, // Base64 encoded file
        size: { type: Number },
        uploadedAt: { type: Date, default: Date.now }
    }
});
```

### Attachment Object Structure

```javascript
{
    filename: "screenshot.png",
    mimetype: "image/png",
    data: "iVBORw0KGgoAAAANSUhEUgAA...", // Base64 string
    size: 245678, // bytes
    uploadedAt: "2025-11-28T10:30:00.000Z"
}
```

## Error Handling

### Client-Side Errors

1. **File Too Large**
   - Display: "File size must be under 5MB"
   - Action: Clear file input, show error message

2. **Invalid File Type**
   - Display: "Only PNG, JPG, JPEG, and PDF files are allowed"
   - Action: Clear file input, show error message

3. **File Read Error**
   - Display: "Failed to read file. Please try again"
   - Action: Clear file input, allow retry

### Server-Side Errors

1. **Validation Failure**
   - Status: 400 Bad Request
   - Response: `{ success: false, error: "Validation message" }`

2. **Database Error**
   - Status: 500 Internal Server Error
   - Response: `{ success: false, error: "Failed to save complaint" }`
   - Action: Log error details, return generic message to client

3. **Missing File Data**
   - Status: 400 Bad Request
   - Response: `{ success: false, error: "Invalid attachment data" }`

## Testing Strategy

### Unit Tests (Optional)

1. **File Validation**
   - Test valid file types (PNG, JPG, JPEG, PDF)
   - Test invalid file types
   - Test file size limits
   - Test Base64 validation

2. **Base64 Conversion**
   - Test encoding accuracy
   - Test decoding accuracy
   - Test blob creation from Base64

### Integration Tests (Optional)

1. **End-to-End Upload Flow**
   - Student uploads file → Server stores → Faculty views
   - Verify file integrity throughout process

2. **Download Flow**
   - Faculty downloads file → Verify correct file type and content

### Manual Testing

1. **Student Portal**
   - Upload each supported file type
   - Test file size validation (under/over 5MB)
   - Test preview display
   - Submit complaint with attachment
   - Submit complaint without attachment

2. **Faculty Dashboard**
   - View complaints with attachments
   - View complaints without attachments
   - Download each file type
   - Verify downloaded files open correctly

3. **Edge Cases**
   - Very small files (< 1KB)
   - Files at size limit (exactly 5MB)
   - Special characters in filenames
   - Multiple rapid submissions

## Performance Considerations

### Base64 Overhead
- Base64 encoding increases file size by ~33%
- 5MB file limit becomes ~6.65MB in database
- Acceptable for complaint system with moderate volume

### Database Impact
- MongoDB document size limit: 16MB (sufficient for our 5MB file limit)
- Index on `attachment.uploadedAt` for potential cleanup queries
- Consider TTL index if old attachments should be purged

### Client Performance
- File preview generation is synchronous but fast for small files
- Download conversion happens in memory (acceptable for 5MB files)
- No impact on page load (files loaded on-demand)

## Security Considerations

1. **File Type Validation**
   - Validate MIME type on client and server
   - Check file extension matches MIME type
   - Prevent executable file uploads

2. **File Size Limits**
   - Enforce 5MB limit to prevent DoS attacks
   - Validate on both client and server

3. **Base64 Validation**
   - Verify Base64 format before storage
   - Prevent injection attacks through malformed data

4. **Access Control**
   - Faculty can view all attachments (existing behavior)
   - Students can only view their own attachments in responses
   - No public access to attachment data

## Implementation Notes

### Why Base64 Storage?

**Advantages:**
- No separate file storage infrastructure needed
- Simplified deployment (no file system permissions)
- Atomic operations (file and complaint data together)
- Works seamlessly with MongoDB Atlas

**Disadvantages:**
- 33% storage overhead
- Not suitable for very large files (mitigated by 5MB limit)
- Slightly slower queries (mitigated by infrequent access)

### Alternative Approaches Considered

1. **GridFS**: Overkill for small files, adds complexity
2. **File System Storage**: Requires file system access, complicates deployment
3. **Cloud Storage (S3, etc.)**: Adds external dependency and cost
4. **Separate File Service**: Over-engineering for current scale

Base64 storage is the optimal choice for this use case given the file size limits and system requirements.

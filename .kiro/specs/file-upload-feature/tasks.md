# Implementation Plan

- [x] 1. Update MongoDB schema to support file attachments


  - Add attachment field to Complaint schema with filename, mimetype, data (Base64), size, and uploadedAt properties
  - Ensure the schema allows null values for complaints without attachments
  - _Requirements: 1.5_




- [ ] 2. Implement client-side file handling in Student Portal
  - [ ] 2.1 Add file selection handler with preview generation
    - Listen for file input change events
    - Validate file type (PNG, JPG, JPEG, PDF) and size (max 5MB) on selection
    - Generate and display preview for images or show PDF icon for PDFs


    - Display error messages for invalid files
    - _Requirements: 1.1, 1.3, 1.4_
  
  - [x] 2.2 Implement Base64 encoding for file upload

    - Use FileReader API to read selected file as Data URL

    - Extract Base64 data from Data URL
    - Prepare attachment object with filename, mimetype, data, and size

    - _Requirements: 1.2_


  
  - [ ] 2.3 Modify complaint submission to include file data
    - Update form submission handler to include attachment object in request body
    - Handle cases where no file is attached (send null)
    - Maintain existing complaint submission functionality

    - _Requirements: 1.2, 1.5_


- [ ] 3. Implement server-side file validation and storage
  - [x] 3.1 Create file validation function

    - Validate MIME type against allowed types (image/png, image/jpeg, image/jpg, application/pdf)


    - Validate file size does not exceed 5MB
    - Validate Base64 format integrity
    - Return appropriate error messages for validation failures

    - _Requirements: 1.3, 1.4_

  
  - [ ] 3.2 Update POST /api/complaints endpoint
    - Extract attachment data from request body

    - Call validation function if attachment is present
    - Store complaint with attachment in MongoDB

    - Handle validation errors with 400 status code

    - _Requirements: 1.5_

- [ ] 4. Implement file display in Faculty Dashboard
  - [ ] 4.1 Add attachment indicators to complaint list
    - Display file icon next to complaints that have attachments


    - Show attachment count or type indicator
    - _Requirements: 2.1_
  
  - [x] 4.2 Create file preview component

    - Render inline image preview for image attachments using Base64 data





    - Display PDF icon with filename for PDF attachments
    - Add styling for preview container

    - _Requirements: 2.2, 2.3, 2.4_

  
  - [x] 4.3 Integrate preview into complaint details modal

    - Add attachment section to complaint details display
    - Show "No attachment" message when attachment is null

    - Position preview appropriately within modal layout
    - _Requirements: 2.2_

- [ ] 5. Implement file download functionality in Faculty Dashboard
  - [ ] 5.1 Create Base64 to Blob conversion utility
    - Decode Base64 string to binary data
    - Create Blob object with correct MIME type
    - Handle conversion errors gracefully
    - _Requirements: 3.2, 3.3_
  
  - [ ] 5.2 Add download button and handler
    - Display download button next to file preview
    - Create object URL from Blob on button click
    - Trigger browser download with original filename
    - Clean up object URL after download
    - _Requirements: 3.1, 3.2_

- [ ] 6. Add attachment display to Student Portal responses
  - [ ] 6.1 Show attachment indicators in faculty response section
    - Display file icon for complaints with attachments in response list
    - _Requirements: 4.1_
  
  - [ ] 6.2 Display file preview in response details
    - Render file preview alongside faculty response text
    - Use same preview logic as Faculty Dashboard
    - _Requirements: 4.2_
  
  - [ ] 6.3 Update PDF receipt generation to include attachment info
    - Add "Attachment: [filename]" line to receipt when file is present
    - Include attachment indicator in receipt metadata
    - _Requirements: 4.3_

- [ ] 7. Add error handling and user feedback
  - Create toast notification system for file upload errors
  - Display loading indicator during file upload
  - Show success message after successful upload with attachment
  - Handle network errors during file submission
  - _Requirements: 1.1, 1.3, 1.4_

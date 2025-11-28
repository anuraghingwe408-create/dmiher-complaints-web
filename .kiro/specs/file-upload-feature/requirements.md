# Requirements Document

## Introduction

This feature enables students to attach files (images or PDFs) to their complaints and allows faculty to view and download these attachments. Currently, the student form has a file input field, but the file data is not being captured, transmitted to the server, stored in the database, or displayed to faculty members.

## Glossary

- **Student Portal**: The web interface where students submit complaints
- **Faculty Dashboard**: The web interface where faculty view and respond to complaints
- **Complaint System**: The backend server that processes and stores complaint data
- **File Attachment**: An image (PNG, JPG, JPEG) or PDF document uploaded by a student
- **MongoDB**: The database system storing complaint and file data
- **Base64**: An encoding scheme used to store binary file data as text in MongoDB

## Requirements

### Requirement 1

**User Story:** As a student, I want to attach files to my complaints, so that I can provide visual evidence or documentation to support my issue

#### Acceptance Criteria

1. WHEN a student selects a file using the file input field, THE Student Portal SHALL display a preview of the selected file
2. WHEN a student submits a complaint with an attached file, THE Student Portal SHALL encode the file as Base64 and include it in the submission data
3. WHEN a student submits a complaint with an attached file, THE Complaint System SHALL validate that the file type is PNG, JPG, JPEG, or PDF
4. WHEN a student submits a complaint with an attached file, THE Complaint System SHALL validate that the file size does not exceed 5 megabytes
5. WHEN a student submits a complaint with an attached file, THE Complaint System SHALL store the file data in the MongoDB database along with the complaint

### Requirement 2

**User Story:** As a faculty member, I want to view attached files in the complaint list, so that I can review supporting documentation when addressing complaints

#### Acceptance Criteria

1. WHEN a faculty member views the complaint list, THE Faculty Dashboard SHALL display a file attachment indicator for complaints that have attached files
2. WHEN a faculty member clicks on a complaint with an attached file, THE Faculty Dashboard SHALL display the file preview within the complaint details
3. WHERE a complaint has an image attachment, THE Faculty Dashboard SHALL render the image inline
4. WHERE a complaint has a PDF attachment, THE Faculty Dashboard SHALL display a PDF icon with the filename

### Requirement 3

**User Story:** As a faculty member, I want to download attached files, so that I can save them locally for detailed review or record-keeping

#### Acceptance Criteria

1. WHEN a faculty member views a complaint with an attached file, THE Faculty Dashboard SHALL display a download button next to the file preview
2. WHEN a faculty member clicks the download button, THE Faculty Dashboard SHALL trigger a browser download of the original file with its original filename
3. THE Faculty Dashboard SHALL preserve the original file format during download (PNG, JPG, JPEG, or PDF)

### Requirement 4

**User Story:** As a student, I want to see my attached files in faculty responses, so that I can verify which complaint the response refers to

#### Acceptance Criteria

1. WHEN a student checks faculty responses, THE Student Portal SHALL display file attachment indicators for complaints that have attached files
2. WHEN a student views a faculty response for a complaint with an attached file, THE Student Portal SHALL display the file preview alongside the response
3. WHEN a student downloads a complaint receipt, THE Receipt PDF SHALL include a note indicating that a file was attached to the complaint

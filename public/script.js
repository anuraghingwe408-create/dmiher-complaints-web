// DMIHER Complaint Portal - College Email Authentication System
(function(){
  const { jsPDF } = window.jspdf || {};
  const STORAGE_KEY = 'dmiher_complaints_final_v6';
  const STUDENTS_KEY = 'dmiher_students_v6';
  const SESSION_KEY = 'dmiher_student_session_v6';
  const ALLOWED_DOMAIN = 'dmiher.edu.in';

  // Course-specific complaint categories
  const COURSE_CATEGORIES = {
    bca: [
      'Programming Lab Issues',
      'Software Installation',
      'Computer Hardware',
      'Internet Connectivity',
      'Library Resources',
      'Project Guidance',
      'Examination Related',
      'Other'
    ],
    bba: [
      'Case Study Materials',
      'Business Lab Equipment',
      'Industry Visit Coordination',
      'Presentation Facilities',
      'Internship Guidance',
      'Examination Related',
      'Other'
    ],
    mca: [
      'Advanced Lab Facilities',
      'Research Guidance',
      'Project Infrastructure',
      'Thesis Supervision',
      'Software Licensing',
      'Examination Related',
      'Other'
    ],
    bsc_aids: [
      'AI Lab Equipment',
      'Data Science Tools',
      'Machine Learning Resources',
      'Research Datasets',
      'Computing Resources',
      'Examination Related',
      'Other'
    ]
  };

  function uid(){ 
    return 'C' + Date.now().toString(36) + Math.random().toString(36).slice(2,5).toUpperCase(); 
  }
  
  function now(){ 
    return new Date().toISOString(); 
  }
  
  function readAllComplaints(){ 
    try{ 
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : []; 
    }catch(e){ 
      console.error('Error reading complaints:', e);
      return []; 
    } 
  }
  
  function writeAllComplaints(data){ 
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); 
    } catch(e) {
      console.error('Error writing complaints:', e);
    }
  }

  // Student management functions
  function getAllStudents() {
    try {
      return JSON.parse(localStorage.getItem(STUDENTS_KEY) || []);
    } catch(e) {
      console.error('Error reading students:', e);
      return [];
    }
  }

  function saveStudent(student) {
    const students = getAllStudents();
    // Check if student already exists
    const existingIndex = students.findIndex(s => s.email === student.email);
    if (existingIndex !== -1) {
      students[existingIndex] = student;
    } else {
      students.push(student);
    }
    localStorage.setItem(STUDENTS_KEY, JSON.stringify(students));
  }

  function findStudentByEmail(email) {
    const students = getAllStudents();
    return students.find(s => s.email === email);
  }

  function validateEmailDomain(email) {
    const domain = email.split('@')[1];
    return domain === ALLOWED_DOMAIN;
  }

  // Check if student is logged in
  function isStudentLoggedIn() {
    return localStorage.getItem(SESSION_KEY) !== null;
  }

  function getCurrentStudent() {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  }

  function studentLogin(email, password) {
    const student = findStudentByEmail(email);
    if (student && student.password === password) {
      // Create session (without password)
      const { password, ...sessionStudent } = student;
      localStorage.setItem(SESSION_KEY, JSON.stringify(sessionStudent));
      return true;
    }
    return false;
  }

  function studentLogout() {
    localStorage.removeItem(SESSION_KEY);
  }

  function registerStudent(studentData) {
    if (!validateEmailDomain(studentData.email)) {
      throw new Error(`Only ${ALLOWED_DOMAIN} email addresses are allowed`);
    }

    if (findStudentByEmail(studentData.email)) {
      throw new Error('Student with this email already exists');
    }

    const student = {
      id: 'STU' + Date.now().toString(36).toUpperCase(),
      name: studentData.name,
      email: studentData.email,
      password: studentData.password,
      course: studentData.course,
      registeredAt: new Date().toISOString()
    };

    saveStudent(student);
    return student;
  }

  // Convert file to dataURL (Promise)
  function fileToDataURL(file){ 
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve({ 
        name: file.name, 
        type: file.type, 
        data: reader.result 
      });
      reader.onerror = () => reject(new Error('File read error'));
      reader.readAsDataURL(file);
    }); 
  }

  // Show login section
  function showLoginSection() {
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('registrationSection').style.display = 'none';
    document.getElementById('mainContent').style.display = 'none';
  }

  // Show registration section
  function showRegistrationSection() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('registrationSection').style.display = 'block';
    document.getElementById('mainContent').style.display = 'none';
  }

  // Show student main content after login
  function showStudentMainContent() {
    document.getElementById('loginSection').style.display = 'none';
    document.getElementById('registrationSection').style.display = 'none';
    document.getElementById('mainContent').style.display = 'block';
    
    const student = getCurrentStudent();
    
    // Update form with student info
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const courseInput = document.getElementById('course');
    const studentIdInput = document.getElementById('studentId');
    
    if (nameInput) nameInput.value = student.name || '';
    if (emailInput) emailInput.value = student.email || '';
    if (courseInput) courseInput.value = student.course ? student.course.toUpperCase() : '';
    if (studentIdInput) studentIdInput.value = student.id || '';
    
    // Check for faculty responses
    checkFacultyResponse();
    
    initStudent();
  }

  // Check faculty response for current student
  function checkFacultyResponse() {
    const student = getCurrentStudent();
    if (!student) return;
    
    const allComplaints = readAllComplaints();
    const studentComplaints = allComplaints.filter(c => c.email === student.email);
    
    const responseReceipt = document.getElementById('facultyResponseReceipt');
    const responseContent = document.getElementById('responseContent');
    
    if (!responseReceipt || !responseContent) return;
    
    const repliedComplaints = studentComplaints.filter(c => c.facultyResponse);
    
    if (repliedComplaints.length > 0) {
      responseReceipt.style.display = 'block';
      
      let responseHTML = '';
      repliedComplaints.forEach(complaint => {
        responseHTML += `
          <div style="margin-bottom: 16px; padding: 12px; background: white; border-radius: 6px; border: 1px solid #dcfce7;">
            <div style="display: flex; justify-content: between; align-items: start; margin-bottom: 8px;">
              <strong style="color: #059669;">Complaint ID: ${complaint.id}</strong>
              <span style="font-size: 12px; color: #6b7280;">${new Date(complaint.createdAt).toLocaleDateString()}</span>
            </div>
            <div style="margin-bottom: 8px;">
              <strong>Your Complaint:</strong> ${complaint.message}
            </div>
            <div style="background: #f0fdf4; padding: 8px; border-radius: 4px; border-left: 3px solid #10b981;">
              <strong>Faculty Response:</strong> ${complaint.facultyResponse}
            </div>
            <div style="margin-top: 8px; display: flex; gap: 8px;">
              <button class="btn" onclick="downloadComplaintReceipt('${complaint.id}')" style="padding: 4px 8px; font-size: 12px;">
                Download Receipt
              </button>
            </div>
          </div>
        `;
      });
      
      responseContent.innerHTML = responseHTML;
    } else {
      responseReceipt.style.display = 'none';
    }
  }

  // Initialize student functionality
  function initStudent(){
    const form = document.getElementById('complaintForm');
    const attachment = document.getElementById('attachment');
    const previewArea = document.getElementById('previewArea');
    const checkResponseBtn = document.getElementById('checkResponse');

    // Logout button
    const logoutBtn = document.getElementById('logoutStudentBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function() {
        studentLogout();
        showLoginSection();
      });
    }

    // Check response button
    if (checkResponseBtn) {
      checkResponseBtn.addEventListener('click', function() {
        checkFacultyResponse();
        if (document.getElementById('facultyResponseReceipt').style.display === 'none') {
          toast('No faculty responses available yet');
        } else {
          toast('Faculty responses loaded');
        }
      });
    }

    // Attachment preview
    if (attachment && previewArea) {
      attachment.addEventListener('change', function(e){
        previewArea.innerHTML = '';
        const file = e.target.files[0];
        if(!file) return;
        
        if(file.type.startsWith('image/')){
          const url = URL.createObjectURL(file);
          const img = document.createElement('img'); 
          img.src = url; 
          img.className = 'preview-thumb';
          previewArea.appendChild(img);
        } else {
          const p = document.createElement('div'); 
          p.className = 'meta'; 
          p.textContent = 'Attached: ' + file.name; 
          previewArea.appendChild(p);
        }
      });
    }

    // Form submission
    if (form) {
      form.addEventListener('submit', async function(e){
        e.preventDefault();
        
        const fileInput = document.getElementById('attachment');
        const file = fileInput ? fileInput.files[0] : null;
        let attachmentData = null;
        
        if (file) { 
          try { 
            attachmentData = await fileToDataURL(file); 
          } catch(err) { 
            alert('File upload failed. Please try again.'); 
            return; 
          } 
        }
        
        const student = getCurrentStudent();
        const categorySelect = document.getElementById('complaintCategory');
        const category = categorySelect ? categorySelect.value : '';
        
        const complaint = {
          id: uid(), 
          name: form.name.value.trim(), 
          email: form.email.value.trim(),
          course: student.course,
          studentId: student.id,
          message: form.message.value.trim(),
          category: category,
          attachment: attachmentData, 
          facultyResponse: null, 
          createdAt: now(), 
          status: 'Pending',
          respondedAt: null
        };
        
        const data = readAllComplaints(); 
        data.push(complaint); 
        writeAllComplaints(data);
        
        toast('Complaint submitted successfully! Faculty will review it soon.');
        
        form.message.value = '';
        form.complaintCategory.value = '';
        if (fileInput) fileInput.value = '';
        if (previewArea) previewArea.innerHTML = '';
      });
    }
  }

  // Toast notification
  function toast(message){ 
    const toastEl = document.createElement('div'); 
    toastEl.textContent = message; 
    toastEl.style.position = 'fixed'; 
    toastEl.style.right = '18px'; 
    toastEl.style.bottom = '18px'; 
    toastEl.style.background = 'rgba(3, 105, 161, 0.95)'; 
    toastEl.style.color = 'white'; 
    toastEl.style.padding = '10px 14px'; 
    toastEl.style.borderRadius = '8px'; 
    toastEl.style.boxShadow = '0 8px 24px rgba(2, 6, 23, 0.12)'; 
    toastEl.style.zIndex = '10000';
    toastEl.style.fontSize = '14px';
    document.body.appendChild(toastEl); 
    
    setTimeout(() => { 
      toastEl.style.opacity = '0';
      toastEl.style.transition = 'opacity 0.4s ease';
      setTimeout(() => {
        if (toastEl.parentNode) {
          toastEl.parentNode.removeChild(toastEl);
        }
      }, 400);
    }, 3000); 
  }

  // Download complaint receipt
  function downloadComplaintReceipt(complaintId) {
    const allComplaints = readAllComplaints();
    const complaint = allComplaints.find(c => c.id === complaintId);
    
    if (!complaint) {
      toast('Complaint not found');
      return;
    }
    
    try{
      const doc = new jsPDF({unit:'pt', format:'a4'});
      
      // Header
      doc.setFillColor(59, 130, 246); 
      doc.rect(0, 0, 595, 80, 'F');
      doc.setFontSize(18); 
      doc.setTextColor(255, 255, 255); 
      doc.text('DMIHER - Complaint Receipt', 40, 44);
      doc.setFontSize(10); 
      doc.text('Official Response Receipt', 420, 44);
      
      // Receipt details
      doc.setTextColor(20); 
      doc.setFontSize(11);
      doc.text('Receipt Date: ' + new Date().toLocaleDateString(), 40, 110);
      doc.text('Complaint ID: ' + complaint.id, 40, 132);
      doc.text('Student ID: ' + (complaint.studentId || 'N/A'), 300, 132);
      doc.text('Name: ' + (complaint.name || 'N/A'), 40, 154);
      doc.text('Email: ' + (complaint.email || 'N/A'), 300, 154);
      doc.text('Course: ' + (complaint.course ? complaint.course.toUpperCase() : 'N/A'), 40, 176);
      doc.text('Submitted: ' + new Date(complaint.createdAt).toLocaleString(), 300, 176);
      
      // Complaint details
      doc.setFontSize(13); 
      doc.text('Complaint Details:', 40, 210);
      const splitMessage = doc.splitTextToSize(complaint.message || 'No details provided', 515);
      doc.setFontSize(11); 
      doc.text(splitMessage, 40, 228);
      
      let currentY = 228 + (splitMessage.length * 14) + 30;
      
      // Faculty response section
      if(complaint.facultyResponse){ 
        doc.setFillColor(16, 185, 129, 0.1); 
        doc.rect(40, currentY, 515, 80, 'F');
        doc.setFontSize(14); 
        doc.setTextColor(16, 185, 129);
        doc.text('✅ Faculty Response:', 50, currentY + 20); 
        const splitReply = doc.splitTextToSize(complaint.facultyResponse, 495); 
        doc.setFontSize(11); 
        doc.setTextColor(0, 0, 0);
        doc.text(splitReply, 50, currentY + 40); 
        currentY += 100;
      }
      
      // Footer
      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text('This is an official receipt from DMIHER Complaint System', 40, currentY + 30);
      doc.text('Generated on: ' + new Date().toLocaleString(), 40, currentY + 45);
      
      doc.save('complaint_receipt_' + complaint.id + '.pdf');
      toast('Receipt downloaded successfully');
    } catch(e) { 
      console.error('Receipt generation failed:', e);
      alert('Receipt generation failed: ' + e.message); 
    }
  }

  // Make download function global
  window.downloadComplaintReceipt = downloadComplaintReceipt;

  // Main initialization function
  window.initPage = function(mode) {
    console.log('Initializing DMIHER Complaint Portal for:', mode);
    
    if(mode === 'student') {
      // Setup login form
      const loginForm = document.getElementById('loginForm');
      if (loginForm) {
        loginForm.onsubmit = function(e) {
          e.preventDefault();
          const email = document.getElementById('studentEmail').value.trim();
          const password = document.getElementById('studentPassword').value;
          
          if (!validateEmailDomain(email)) {
            const message = document.getElementById('loginMessage');
            if (message) {
              message.textContent = `Only @${ALLOWED_DOMAIN} email addresses are allowed`;
              message.style.display = 'block';
            }
            return;
          }
          
          if (studentLogin(email, password)) {
            showStudentMainContent();
          } else {
            const message = document.getElementById('loginMessage');
            if (message) {
              message.textContent = 'Invalid email or password';
              message.style.display = 'block';
            }
          }
        };
      }
      
      // Setup registration form
      const registrationForm = document.getElementById('registrationForm');
      if (registrationForm) {
        registrationForm.onsubmit = function(e) {
          e.preventDefault();
          
          const name = document.getElementById('regName').value.trim();
          const email = document.getElementById('regEmail').value.trim();
          const password = document.getElementById('regPassword').value;
          const confirmPassword = document.getElementById('regConfirmPassword').value;
          const course = document.getElementById('regCourse').value;
          
          if (password !== confirmPassword) {
            showRegistrationMessage('Passwords do not match', 'error');
            return;
          }
          
          if (password.length < 6) {
            showRegistrationMessage('Password must be at least 6 characters long', 'error');
            return;
          }
          
          try {
            const newStudent = registerStudent({
              name: name,
              email: email,
              password: password,
              course: course
            });
            
            showRegistrationMessage(
              `✅ <strong>Registration Successful!</strong><br><br>
              <div style="background: #f0fdf4; padding: 16px; border-radius: 8px; border: 2px solid #bbf7d0; margin: 12px 0;">
                <strong style="color: #059669;">Student ID:</strong> ${newStudent.id}<br>
                <strong style="color: #059669;">Name:</strong> ${newStudent.name}<br>
                <strong style="color: #059669;">Email:</strong> ${newStudent.email}<br>
                <strong style="color: #059669;">Course:</strong> ${newStudent.course.toUpperCase()}
              </div>
              You can now login with your college email and password.`,
              'success'
            );
            
            registrationForm.reset();
            
          } catch (error) {
            showRegistrationMessage(`❌ Registration failed: ${error.message}`, 'error');
          }
        };
      }
      
      // Check if student is already logged in
      if (isStudentLoggedIn()) {
        showStudentMainContent();
      } else {
        showLoginSection();
      }
    }
  };

  // Show registration messages
  function showRegistrationMessage(message, type) {
    const messageDiv = document.getElementById('registrationMessage');
    if (messageDiv) {
      messageDiv.innerHTML = message;
      messageDiv.style.display = 'block';
      messageDiv.style.color = type === 'error' ? '#ef4444' : '#059669';
      messageDiv.style.padding = '16px';
      messageDiv.style.borderRadius = '8px';
      messageDiv.style.background = type === 'error' ? '#fef2f2' : '#f0fdf4';
      messageDiv.style.border = type === 'error' ? '1px solid #fecaca' : '1px solid #bbf7d0';
    }
  }

})();
# Email Validation for DMIHER Students

## 📧 Email Format Requirement

Only students with official DMIHER email addresses can register and login.

### Valid Email Format:
```
scXXXXsaXXXX@dmiher.edu.in
```

Where:
- `sc` - Fixed prefix
- `XXXX` - 4 digits (year or student number)
- `sa` - Fixed middle part
- `XXXX` - 4 digits (student serial number)
- `@dmiher.edu.in` - Official DMIHER domain

### Examples of Valid Emails:
✅ `sc2023sa0001@dmiher.edu.in`
✅ `sc2024sa1234@dmiher.edu.in`
✅ `sc2022sa5678@dmiher.edu.in`
✅ `sc2025sa9999@dmiher.edu.in`

### Examples of Invalid Emails:
❌ `student@dmiher.edu.in` (doesn't match pattern)
❌ `sc23sa01@dmiher.edu.in` (not enough digits)
❌ `sc2023sa001@dmiher.edu.in` (only 3 digits after 'sa')
❌ `aarav.sharma@dmiher.edu.in` (doesn't match pattern)
❌ `sc2023sa0001@gmail.com` (wrong domain)
❌ `sc2023sa0001@dmiher.com` (wrong domain)

## 🔒 Security Features

### Registration Validation
When a student tries to register:
1. System checks if email ends with `@dmiher.edu.in`
2. System validates the pattern: `scXXXXsaXXXX`
3. If invalid, registration is rejected with error message
4. Only valid DMIHER emails are accepted

### Login Validation
When a student tries to login:
1. System verifies credentials (ID and password)
2. System checks if email matches DMIHER format
3. If email is invalid, login is rejected
4. Only students with valid emails can access the portal

## 📋 Default Test Accounts

All default student accounts have been updated with valid email format:

| Course | Student ID | Password | Email |
|--------|-----------|----------|-------|
| BCA | BCA2023001 | bca123 | sc2023sa0001@dmiher.edu.in |
| BCA | BCA2023002 | bca123 | sc2023sa0002@dmiher.edu.in |
| BCA | BCA2023003 | bca123 | sc2023sa0003@dmiher.edu.in |
| BBA | BBA2023001 | bba123 | sc2023sa0004@dmiher.edu.in |
| BBA | BBA2023002 | bba123 | sc2023sa0005@dmiher.edu.in |
| BBA | BBA2023003 | bba123 | sc2023sa0006@dmiher.edu.in |
| MCA | MCA2023001 | mca123 | sc2023sa0007@dmiher.edu.in |
| MCA | MCA2023002 | mca123 | sc2023sa0008@dmiher.edu.in |
| MCA | MCA2023003 | mca123 | sc2023sa0009@dmiher.edu.in |
| BSc AIDS | BSCAIDS2023001 | aids123 | sc2023sa0010@dmiher.edu.in |
| BSc AIDS | BSCAIDS2023002 | aids123 | sc2023sa0011@dmiher.edu.in |
| BSc AIDS | BSCAIDS2023003 | aids123 | sc2023sa0012@dmiher.edu.in |

## 🛠️ Technical Implementation

### Email Validation Function
```javascript
function isValidDMIHEREmail(email) {
    // Check if email ends with @dmiher.edu.in
    if (!email.endsWith('@dmiher.edu.in')) {
        return false;
    }
    
    // Extract the local part (before @)
    const localPart = email.split('@')[0];
    
    // Check if it matches the pattern: scXXXXsaXXXX
    const pattern = /^sc\d{4}sa\d{4}$/;
    
    return pattern.test(localPart);
}
```

### Pattern Breakdown
- `^` - Start of string
- `sc` - Literal characters "sc"
- `\d{4}` - Exactly 4 digits
- `sa` - Literal characters "sa"
- `\d{4}` - Exactly 4 digits
- `$` - End of string

## 🔄 Updating Existing Students

If you have existing students with old email format, you need to update them:

### Option 1: Update via MySQL
```sql
-- Update specific student
UPDATE students 
SET email = 'sc2023sa0001@dmiher.edu.in' 
WHERE id = 'BCA2023001';

-- Update multiple students
UPDATE students 
SET email = CONCAT('sc2023sa', LPAD(SUBSTRING(id, -3), 4, '0'), '@dmiher.edu.in')
WHERE email NOT LIKE 'sc%sa%@dmiher.edu.in';
```

### Option 2: Manual Update
1. Login to MySQL
2. Use the database: `USE dmiher_complaints;`
3. Update each student's email manually
4. Verify: `SELECT id, email FROM students;`

## 📝 Error Messages

### Registration Error
```
Invalid email format. Please use your official DMIHER email 
(format: scXXXXsaXXXX@dmiher.edu.in)
```

### Login Error
```
Invalid email format. Please contact administrator to update your email.
```

## 🎯 Benefits

1. **Security**: Only official DMIHER students can access
2. **Verification**: Email format confirms student identity
3. **Consistency**: Standardized email format across system
4. **Tracking**: Easy to identify students by email pattern
5. **Integration**: Can integrate with DMIHER email system

## 🔧 Customization

If you need to change the email pattern:

### Edit the validation function in `server.js`:

```javascript
function isValidDMIHEREmail(email) {
    // Change domain if needed
    if (!email.endsWith('@dmiher.edu.in')) {
        return false;
    }
    
    const localPart = email.split('@')[0];
    
    // Change pattern as needed
    // Current: scXXXXsaXXXX
    // Example alternatives:
    // - /^student\d{6}$/ for student123456
    // - /^[a-z]+\.\d{4}$/ for name.2023
    const pattern = /^sc\d{4}sa\d{4}$/;
    
    return pattern.test(localPart);
}
```

## 🧪 Testing

### Test Valid Emails:
```javascript
isValidDMIHEREmail('sc2023sa0001@dmiher.edu.in') // true
isValidDMIHEREmail('sc2024sa1234@dmiher.edu.in') // true
```

### Test Invalid Emails:
```javascript
isValidDMIHEREmail('student@dmiher.edu.in')      // false
isValidDMIHEREmail('sc23sa01@dmiher.edu.in')     // false
isValidDMIHEREmail('sc2023sa0001@gmail.com')     // false
```

## 📞 Support

If students have issues with email validation:

1. **Verify Email Format**: Check if email matches `scXXXXsaXXXX@dmiher.edu.in`
2. **Check Domain**: Must be `@dmiher.edu.in`
3. **Count Digits**: Must have exactly 4 digits before and after 'sa'
4. **Contact Admin**: If email is correct but still rejected

## 🔐 Admin Override

If you need to add a student with a different email format temporarily:

1. Add them directly to the database
2. Or modify the validation function temporarily
3. Remember to update their email to proper format later

## ✅ Checklist

- [x] Email validation function implemented
- [x] Registration validates email format
- [x] Login validates email format
- [x] Default students updated with valid emails
- [x] Database schema updated
- [x] Error messages added
- [x] Documentation created

---

**Note**: This validation ensures only legitimate DMIHER students with official email addresses can use the complaint portal.

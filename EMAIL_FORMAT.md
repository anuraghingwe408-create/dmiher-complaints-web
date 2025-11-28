# Email Format Requirements

## Valid Email Format

The system **ONLY** accepts emails in this specific format:

```
scXXXXsaXXXXX@dmiher.edu.in
```

Where:
- `sc` - Fixed prefix (lowercase)
- `XXXX` - 4 digits (year, e.g., 2024)
- `sa` - Fixed middle part (lowercase)
- `XXXXX` - 5 digits (student number, e.g., 00087)
- `@dmiher.edu.in` - Fixed domain

## Valid Examples

✅ `sc2024sa00087@dmiher.edu.in`
✅ `sc2023sa00001@dmiher.edu.in`
✅ `sc2025sa12345@dmiher.edu.in`
✅ `sc2024sa99999@dmiher.edu.in`

## Invalid Examples

❌ `student@dmiher.edu.in` - Missing format
❌ `sc2024@dmiher.edu.in` - Missing 'sa' and number
❌ `sc24sa087@dmiher.edu.in` - Wrong number of digits
❌ `SC2024SA00087@dmiher.edu.in` - Uppercase (must be lowercase)
❌ `sc2024sa87@dmiher.edu.in` - Not enough digits (needs 5)
❌ `faculty@dmiher.edu.in` - Wrong format
❌ `admin@dmiher.edu.in` - Wrong format

## Format Breakdown

```
sc  2024  sa  00087  @dmiher.edu.in
│   │     │   │      │
│   │     │   │      └─ Domain (fixed)
│   │     │   └─ 5-digit student number
│   │     └─ Fixed separator
│   └─ 4-digit year
└─ Fixed prefix
```

## Validation Rules

1. **Must start with** `sc` (lowercase)
2. **Followed by** exactly 4 digits (year)
3. **Then** `sa` (lowercase)
4. **Then** exactly 5 digits (student ID)
5. **Must end with** `@dmiher.edu.in`
6. **Total format**: `sc####sa#####@dmiher.edu.in`

## Regular Expression

The system uses this pattern:
```javascript
/^sc\d{4}sa\d{5}@dmiher\.edu\.in$/
```

## For Registration

When registering, use your official DMIHER student email in the format:
```
scYYYYsaNNNNN@dmiher.edu.in
```

Example for testing:
```
Name: testing bot
Email: sc2024sa00087@dmiher.edu.in
Password: test123
Phone: 7855858745
Course: BCA
```

## For Login

Use the same email format you registered with:
```
Email: sc2024sa00087@dmiher.edu.in
Password: your_password
```

## Default Accounts

All default accounts follow this format:

### Faculty
- Email: `sc2024sa99999@dmiher.edu.in`
- Password: `admin123`

### Students
- BCA: `sc2023sa00001@dmiher.edu.in` / `bca123`
- BBA: `sc2023sa00004@dmiher.edu.in` / `bba123`
- MCA: `sc2023sa00007@dmiher.edu.in` / `mca123`
- BSc AIDS: `sc2023sa00010@dmiher.edu.in` / `aids123`

## Error Messages

If you enter an invalid email format, you'll see:
```
Invalid email format. Use: scXXXXsaXXXXX@dmiher.edu.in 
(e.g., sc2024sa00087@dmiher.edu.in)
```

## Why This Format?

This specific format ensures:
1. **Uniqueness** - Each student has a unique ID
2. **Consistency** - All emails follow the same pattern
3. **Validation** - Easy to verify official DMIHER emails
4. **Organization** - Year and ID embedded in email
5. **Security** - Prevents unauthorized registrations

## Need Help?

If your email doesn't match this format:
1. Check with your institution for your official email
2. Ensure you're using lowercase letters
3. Verify the year (4 digits) and ID (5 digits)
4. Make sure there are no spaces or extra characters

## Technical Implementation

The validation is implemented in `server.js`:

```javascript
function isValidDMIHEREmail(email) {
    const emailPattern = /^sc\d{4}sa\d{5}@dmiher\.edu\.in$/;
    return emailPattern.test(email);
}
```

This function is called during:
- Student registration
- Student login
- Faculty login
- Email verification

---

**Remember**: Only emails matching `scXXXXsaXXXXX@dmiher.edu.in` format are accepted!
